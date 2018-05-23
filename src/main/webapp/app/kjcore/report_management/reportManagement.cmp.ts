import { Component, OnInit, ViewEncapsulation, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { Message, SelectItem } from 'primeng/primeng';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ng2-bootstrap';

import { DataTable } from 'primeng/primeng';

import { ReportManagementService } from './reportManagement.service';
import { ValidationService } from '../shared/services/validation.service';

import { AppService } from '../shared/services/app.service';
import { AppDataService } from '../shared/services/appData.service';
import { UtilityService } from '../shared/services/utility.service';

import { ReportFilterPipe } from './pipes/reportFilter.pipe';

import { ReportType, Report } from './models';
import { Alert, RestResponse } from '../shared/models';
import { CalendarModule } from '../shared/modules/calendar.module';

import { Constants } from '../constants';

declare let saveAs: any;

@Component({
    moduleId: module.id,
    templateUrl: 'reportManagement.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class ReportManagementCmp implements OnInit {
    reports: Report[];
    allReports: Report[];

    selectedReport: any;
    formLoaded: boolean;
    bookedDate: Date;
    messages: Message[];
    form: FormGroup;
    types: ReportType[];
    selectedReportParams: any[];
    componentAlert: Alert;

    formErrors: RestResponse<any>;

    subscriptions: Object;

    deletingReport: Report;

    tableReports: any;

    typeaheadNoResults: boolean;
    options: any[] = [];

    unavailableDates: Array<Date>;

    today: Date;
    minDate: Date;
    maxDate: Date;
    dateFormat: string;

    @ViewChild('dataTable')
    dataTable: DataTable;

    @ViewChild('globalFilter')
    globalFilter: any;

    /*--------- Constructor --------*/
    constructor(
        private _utilityService: UtilityService,
        private _reportManagementService: ReportManagementService,
        private _translateService: TranslateService,
        private _router: Router,
        private _appService: AppService,
        private _appDataService: AppDataService,
        private _constants: Constants) { }

    /*--------- App logic --------*/
    /**
     * Loads all the reports.
     * @author Mario Petrovic
     */
    loadReportsRest(deleteAction: boolean): void {

        this.reports = [];
        this.selectedReport = null;
        this.subscriptions['loadReportsRest'] = this._reportManagementService.getReports().subscribe(
            (res: RestResponse<any>) => {
                this.allReports = res.data;
                this.modifyReports(this.allReports);
                this.reports = this.allReports;
                this.sortPossibleSQL(this.reports);
                this.sortReportParameters(this.reports);
                this.dataTable.selection = this.tableReports[0];
                this.selectReport(this.allReports[0]);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        );
    }

    /**
     * Modify reports object
     * @author Stefan Svrkota
     */
    modifyReports(reports: any[]) {
        this.tableReports = [];

        let hostParameters = [];
        let iterator = 0;
        for (let report of reports) {
            // Connect dependent parameters
            let iteratorTemp = 0;
            hostParameters[iterator] = {};
            for (let param of report.kjcReportParameterses) {
                if (param.dbColumn && param.dbTable) {
                    param.eventEmitter = new EventEmitter();
                    let tempName = param.key;
                    hostParameters[iterator][tempName] = iteratorTemp;
                }

                iteratorTemp++;
            }

            // Fill table array with report
            let roles = "";

            for (let j = 0; j < report.kjcApplicationRoleses.length; j++) {
                roles += (report.kjcApplicationRoleses[j].name + (((report.kjcApplicationRoleses.length - 1) != j) ? ", " : ""));
            }
            this.tableReports.push({
                id: report.id,
                name: report.name,
                kjcApplicationRoleses: report.kjcApplicationRoleses,
                flEnabled: report.flEnabled,
                roles: roles,
                description: report.description,
                type: report.type,
                tsInsert: report.tsInsert,
                utInsert: report.utInsert
            });

            iterator++;
        }

        // Subscribe to event emitters of dependency parameters
        let iteratorParams = 0;
        for (let report of reports) {
            for (let param of report.kjcReportParameterses) {
                if (param.dbColumn && param.dbTable && param.dependencyParameter) {
                    let tempIndex = hostParameters[iteratorParams][param.dependencyParameter.key];
                    report.kjcReportParameterses[tempIndex].eventEmitter.subscribe((value) => {
                        if (value) {
                            this._reportManagementService.getDependencyFilteredList(value, param.id).subscribe(
                                (res: RestResponse<any>) => {
                                    let obj: SelectItem[] = [];
                                    obj.push({ label: "Select", value: null });
                                    let newArr = this.sortParametersByValue(res.data);
                                    for (let key of newArr) {
                                        obj.push({ label: key[1], value: key[0] });
                                    }
                                    this.options[report.id][param.key] = obj;
                                }
                            );
                        } else {
                            this.options[report.id][param.key] = [];
                        }
                    });
                }
            }
            iteratorParams++;
        }
    }

    dependencyEventEmitter(field: any, value: any): void {
        field.eventEmitter.emit(value);
    }

    /**
     * Creates a report form on click on one of reports.
     * @author Mario Petrovic
     */
    selectReport(event: any): void {
        // this._utilityService.setAlert(this.componentAlert);
        if (event) {
            if (event.data) {
                this.selectedReport = this.reports.filter(this.filterArrayOfObjects.bind(null, { name: 'id', value: event.data.id }))[0];
            } else {
                this.selectedReport = this.reports.filter(this.filterArrayOfObjects.bind(null, { name: 'id', value: event.id }))[0];
            }

            this.selectedReportParams = this.parametersArrayToMatrix(this.selectedReport.kjcReportParameterses);

            this.formLoaded = false;

            let tempFormGroup: any = {};

            if (this.selectedReport.type == "async") {
                tempFormGroup["bookedDate"] = new FormControl(new Date(), [Validators.required]);
                this.unavailableDates = [];
            }
            for (let parameter of this.selectedReport.kjcReportParameterses) {

                let tempValidations = [];

                let tempCondition = parameter.type != 'Timestamp' && parameter.type != 'Date' && !parameter.dbTable && !parameter.dbColumn && Object.keys(parameter.dropdownList).length == 0 && parameter.type != 'HashMap';

                if (tempCondition) {
                    for (let key of Object.keys(parameter)) {
                        if (key == 'minValue' && parameter['minValue'] != null) {
                            if (parameter.type == 'String') {
                                tempValidations.push(Validators.minLength(parameter['minValue']));
                            } else {
                                tempValidations.push(ValidationService.validateMin(parameter['minValue']));
                            }
                        } else if (key == 'maxValue' && parameter['minValue'] != null) {
                            if (parameter.type == 'String') {
                                tempValidations.push(Validators.maxLength(parameter['maxValue']));
                            } else {
                                tempValidations.push(ValidationService.validateMax(parameter['maxValue']));
                            }
                        } else if (key == 'isMandatory' && parameter['isMandatory']) {
                            tempValidations.push(Validators.required);
                        }
                    }
                    tempFormGroup[parameter.key] = new FormControl(parameter.defaultValue, tempValidations);
                } else if (parameter.dbTable && parameter.dbColumn && (parameter.type == 'String' || parameter.type == "Integer")) {
                    if (parameter.isMandatory) {
                        tempValidations.push(Validators.required);
                    }
                    tempFormGroup[parameter.key] = new FormControl(this.options[parameter.key], tempValidations);
                } else if (parameter.type == 'Date') {
                    tempValidations.push(Validators.required);
                    tempFormGroup[parameter.key] = new FormControl(new Date(), tempValidations);
                }

            }
            tempFormGroup["format"] = new FormControl('pdf', [Validators.required]);
            this.form = new FormGroup(tempFormGroup);

            setTimeout(() => {
                this.formLoaded = true;
            });
        }
    }

    /**
     * Retrieve unavailable dates for a report
     * @author Ciprian Dorofte
     */
    public getUnavailableDates(event) {
        //Check if is a valid date, if is clicked on calendar icon and retrieve unavailabled dates list
        if (event.target.value || event.target.tagName == 'SPAN') {
            this.subscriptions['getUnavailableDates'] = this._reportManagementService.getUnavailableDatesRest(this.selectedReport.id).subscribe(
                (res: RestResponse<any>) => {
                    let tempList = [];
                    res.data.forEach((dateInLong) => {
                        tempList.push(new Date(dateInLong));
                    });
                    this.unavailableDates = tempList;

                },
                (err: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                },
                () => {
                    this.clearValidationMessages();
                }
            );
        }
    }

    /**
     * Formats the date object into YYYY-MM-DD HH:MM:SS format.
     * @author Nikola Gavric
     */
    public currentDateWithFormat(date: Date): string {
        let curr_date = date.getDate();
        let curr_month = date.getMonth();
        let curr_year = date.getFullYear();
        let curr_hours = date.getHours();
        let curr_mins = date.getMinutes();
        let curr_secs = date.getSeconds();
        let new_month: string = curr_month.toString();
        let new_secs: string = curr_secs.toString();
        let new_mins: string = curr_mins.toString();
        let new_hours: string = curr_hours.toString();
        if (curr_month < 10)
            new_month = "0" + curr_month;
        if (curr_hours < 10)
            new_hours = "0" + curr_hours;
        if (curr_mins < 10)
            new_mins = "0" + curr_mins;
        if (curr_secs < 10)
            new_secs = "0" + curr_secs;
        return curr_year + "-" + new_month + "-" + curr_date + " " + new_hours + ":" + new_mins + ":" + new_secs;
    }

    /**
     * Scheduling a report.
     * @author Nikola Gavric
     */
    public addBooking(): void {
        // this._utilityService.setAlert(this.componentAlert);

        //Current Date and Time
        this.today = new Date();
        let date = new Date(this.form.value.bookedDate);

        //Set current time to available date
        date.setHours(this.today.getHours(), this.today.getMinutes(), this.today.getSeconds());

        let params = [];
        let obj = {
            format: this.form.value.format,
            bookedDate: date.getTime(),
            kjcReports: null,
            kjcReportBookingParameterses: null
        }
        let newObj = this._utilityService.copy(obj);
        //Setting newSelectedReport so selectedReport doesnt break HTML, it is binded
        let newSelectedReport = this._utilityService.copy(this.selectedReport);
        newSelectedReport.parameters = null;
        //Setting report
        obj.kjcReports = newSelectedReport;
        for (let key in this.form.value) {
            for (let parameter of this.selectedReport.kjcReportParameterses) {
                if (parameter['key'] == key) {
                    let param = {};
                    param['value'] = this.form.value[key];
                    param['kjcReportParameters'] = parameter;
                    param['kjcReportBookings'] = newObj;
                    params.push(param);
                    break;
                }
            }
        }
        //Setting params
        obj.kjcReportBookingParameterses = params;
        this.subscriptions['addBooking'] = this._reportManagementService.addBooking(obj).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
            },
            () => {
                this.clearValidationMessages();
            }
        );
    }

    public isDisabledToBook() {
        let formDate = new Date(this.form.value.bookedDate);
        formDate.setHours(0, 0, 0, 0);
        this.today.setHours(0, 0, 0, 0);

        if (formDate.getTime() == this.today.getTime()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Printing a report.
     * @author Nikola Gavric
     */
    public printReport(newWindow: boolean, reportName: string): void {
        this._utilityService.setAlert(this.componentAlert);
        let params = {};
        //setting sql value
        for (let parameter of this.selectedReport.kjcReportParameterses) {

            INNERLOOP: for (let formParam in this.form.controls) {
                if (parameter.key == formParam) {
                    if (parameter.type == 'Timestamp' || parameter.type == 'Date') {
                        parameter.value = new Date(this.form.controls[formParam].value).getTime();
                    } else {
                        parameter.value = this.form.controls[formParam].value;
                    }
                    break INNERLOOP;
                }
            }
        }

        let frontEndFormat;
        if (this.form.value.format == "pdf") {
            frontEndFormat = 'application/pdf';
        } else {
            frontEndFormat = 'application/vnd.ms-excel';
        }

        // Clear report object from EventEmmiters beacuse Circular error appears when sending data through http
        let clearedReport = this.clearEventEmitters(this.selectedReport);

        let obj = {
            id: null,
            format: this.form.value.format,
            bookedDate: this.form.value.bookedDate,
            report: clearedReport,
            pageId: "reportManagement",
            kjcReportParameterses: params,
            frontEndFormat: frontEndFormat
        }

        this.subscriptions['printReport'] = this._reportManagementService.printReport(obj).subscribe(
            (res: RestResponse<any>) => {
                let blob = this._appService.convertBase64ToBlob(res.data, frontEndFormat);

                if (newWindow) {
                    let fileURL = URL.createObjectURL(blob);

                    // If site settings has popups blocked, this variable will be null, thus try/catch is required
                    let newWindowState = window.open(fileURL);

                    setTimeout(() => {
                        try {
                            if (newWindowState.closed) {
                                this._utilityService.setAlert(this.componentAlert, 'fe.reportManagement.popupBlockerPresent', 400);
                            } else {
                                this._utilityService.setAlert(this.componentAlert, 'fe.reportManagement.reportPrinted', res.statusCode);
                            }
                        } catch (e) {
                            this._utilityService.setAlert(this.componentAlert, 'fe.reportManagement.popupBlockerPresent', 400);
                        }
                    }, 700);
                } else {
                    saveAs(blob, reportName + (frontEndFormat == 'application/pdf' ? '.pdf' : '.xlsx'));
                    this._utilityService.setAlert(this.componentAlert, 'fe.reportManagement.reportPrinted', res.statusCode);
                }

                this.formErrors = null;

            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.formErrors = err;
            }
        );
    }

    /**
     * Rest - delete choosen report
     * @author Mario Petrovic
     */
    deleteReport(reportId: number, modal: any): void {
        this._reportManagementService.deleteReport(reportId).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.loadReportsRest(true);
                this.hideModal(modal);
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            });
    }

    /**
     * Update report status
     * @author Stefan Svrkota
     */
    updateReportStatus(report: any): void {
        let status;
        if (report.flEnabled == true) {
            status = 0;
        } else {
            status = 1;
        }

        this.subscriptions['updateReportStatus'] = this._reportManagementService.updateReportStatus(status, report.id).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.loadReportsRest(false);
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            });
    }

    /**
     * Opet modal for editing report
     * @author Mario Petrovic
     */
    editReport(reportId: number): void {
        this._router.navigate(['admin/create_report', reportId]);
    }

    /*---------- Utilities ----------*/
    /**
     * Addition to filtering by param name
     * @author Mario Petrovic
     */
    private filterArrayOfObjects(customArgument, value): any {
        return value[customArgument.name] == customArgument.value;
    }

    /**
     * Transforms report parameter type into form-readable type.
     * @author Mario Petrovic
     */
    private transformFieldType(type: string): string {
        if (type == "Integer" || type == "Double" || type == "Long" || type == "Float") {
            return "number";
        } else if (type == "String") {
            return "text";
        }
    }

    /**
     * Transform parameters array into matrix
     * @author Mario Petrovic
     */
    private parametersArrayToMatrix(parametersArrayRef: any): any {
        // let tempParameters = this._utilityService.copy(parametersArrayRef);
        let tempMatrix = [[]];

        let tempRow = 0;
        for (let parameter of parametersArrayRef) {
            if (parameter.key != "translationMap") {
                let tempPosition = parameter.position.split(',');
                if (tempRow != tempPosition[0]) {
                    tempMatrix.push([]);
                }

                tempMatrix[parseInt(tempPosition[0])].push(parameter);
                tempRow = tempPosition[0];
            }
        }


        return tempMatrix;
    }

    /**
     * Sort incoming parameters from report by position
     * @author Mario Petrovic
     */
    private sortReportParameters(reportsRef: any) {
        for (let report of reportsRef) {
            report.kjcReportParameterses = report.kjcReportParameterses.sort((a, b) => {
                return a.position > b.position;
            });
        }
    }

    /**
     * Sort possible sql
     * @author Nikola Gavric
     */
    private sortPossibleSQL(reports: any) {
        for (let report of reports) {
            this.options[report.id] = [];
            for (let param of report.kjcReportParameterses) {
                OUTERIF: if (param.type == "String" || param.type == "Integer") {
                    if (param.dbTable && param.dbColumn && !param.dependencyParameter) {
                        if (Object.keys(param.dropdownList).length > 0) {
                            let obj: SelectItem[] = [];
                            obj.push({ label: "Select", value: null });
                            let newArr = this.sortParametersByValue(param);
                            for (let key of newArr) {
                                obj.push({ label: key[1], value: key[0] });
                            }
                            this.options[report.id][param.key] = obj;
                        } else {
                            break OUTERIF;
                        }
                    } else if (param.dependencyParameter) {
                        this.options[report.id][param.key] = [];
                    }
                }
            }
        }
    }

    /**
     * Sorting parameter dropdownList by
     * each value represented in key:value pair
     * @author Nikola
     */
    public sortParametersByValue(param: any) {
        let toArr = [];

        for (let key in param.dropdownList) {
            toArr.push([key, param.dropdownList[key]]);
        }

        toArr.sort(function (a, b) {
            return a[1].toLowerCase() > b[1].toLowerCase() ? 1 : -1;
        });

        return toArr;
    }

    /**
     * This method clear validation messages
     * @author Ciprian Dorofte
     */
    clearValidationMessages(): void {
        this.formErrors = null;
    }

    refreshTable(): void {
        this.loadReportsRest(false);
        this.dataTable.reset();
        this.dataTable.selection = null;
        this.globalFilter.nativeElement.value = "";
    }

    /**
    *  Repack report object, because report cannot be sent to http handler with EventEmitters inside
    *  @author Mario Petrovic
    */
    clearEventEmitters(report: any): any {
        let reportTemp: any = {};

        reportTemp = {
            avgExecTime: report.avgExecTime,
            description: report.description,
            flEnabled: report.flEnabled,
            id: report.id,
            kjcApplicationRoleses: report.kjcApplicationRoleses,
            kjcClasses: report.kjcClasses,
            kjcCompanieses: report.kjcCompanieses,
            kjcReportBlobses: report.kjcReportBlobses,
            kjcReportParameterses: [],
            name: report.name,
            numExecution: report.numExecution,
            tsInsert: report.tsInsert,
            tsUpdate: report.tsUpdate,
            type: report.type,
            utInsert: report.utInsert,
            utUpdate: report.utUpdate
        }

        for (let parameter of report.kjcReportParameterses) {
            reportTemp.kjcReportParameterses.push({
                dbColumn: parameter.dbColumn,
                dbTable: parameter.dbTable,
                defaultValue: parameter.defaultValue,
                dependencyParamName: parameter.dependencyParamName,
                dependencyParameter: parameter.dependencyParameter,
                description: parameter.description,
                dropdownList: parameter.dropdownList,
                id: parameter.id,
                isMandatory: parameter.isMandatory,
                key: parameter.key,
                kjcReportBookingParameterses: parameter.kjcReportBookingParameterses,
                kjcReportParameterses: parameter.kjcReportParameterses,
                maxValue: parameter.maxValue,
                minValue: parameter.minValue,
                name: parameter.name,
                parameterDependencyFkColumn: parameter.parameterDependencyFkColumn,
                position: parameter.position,
                tsInsert: parameter.tsInsert,
                tsUpdate: parameter.tsUpdate,
                type: parameter.type,
                utInsert: parameter.utInsert,
                utUpdate: parameter.utUpdate,
                value: parameter.value,
            });

        }

        return reportTemp;
    }

    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Mario Petrovic
     */
    showModal(modal: ModalDirective, modalName: string, data: any): void {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new RestResponse();
        switch (modalName) {
            case 'deleteReport':
                this.deletingReport = data;
                break;
        }
        modal.show();
    }

    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    hideModal(modal: ModalDirective) {
        modal.hide();
    }

    /*--------- NG On Init ---------*/
    public ngOnInit(): void {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        // Variable initialization
        this.messages = [];
        this.reports = [];

        this.form = new FormGroup({});
        this.formLoaded = false;

        this.subscriptions = {};

        this.selectedReportParams = [];

        this.deletingReport = new Report();

        this.formErrors = new RestResponse();

        this.today = new Date();
        this.minDate = new Date();
        this.maxDate = new Date();
        this.dateFormat = "dd/mm/yy";

        this.minDate.setDate(this.today.getDate() + 1);
        // The availability interval is from tommorw + 31 days
        this.maxDate.setDate(this.today.getDate() + 31);

        this.types = [
            new ReportType('Asynchronous', 'async'),
            new ReportType('All', 'all'),
            new ReportType('Synchronous', 'sync')
        ];

        this.componentAlert = new Alert(null, true);
        let reportStatusAlert = this._appDataService.getReportMessage();
        if (reportStatusAlert != null) {
            this._utilityService.setAlert(this.componentAlert, reportStatusAlert.message);
        }


        // Initial methods
        this.loadReportsRest(false);

        this._appService.languageChangeForComponent(this, () => {
            this.loadReportsRest(false);
        })

    }

    ngOnDestroy(): void {
        this._appDataService.destroyData();
        this._appService.refreshEmitters(this.subscriptions);
    }
}
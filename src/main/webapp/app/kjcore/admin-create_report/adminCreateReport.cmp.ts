import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { TranslateService } from 'ng2-translate';
import { SelectItem } from 'primeng/primeng';

import { AdminCreateReportService } from './adminCreateReport.service';
import { AppService } from '../shared/services/app.service';
import { AppDataService } from '../shared/services/appData.service';
import { UtilityService } from '../shared/services/utility.service';

import { Alert, RestResponse, PDropdownItem } from '../shared/models';
import { ChangingParameter, JasperParameter, ReportFiles } from './models';

import { FileExtensionTrimmer } from '../shared/pipes/fileExtensionTrimmer.pipe';

import { Constants } from '../constants';

/**
 * Component for Ceating reports page
 * @author Mario Petrovic
 */
@Component({
    moduleId: module.id,
    templateUrl: 'adminCreateReport.cmp.html',

    encapsulation: ViewEncapsulation.None
})
export class AdminCreateReportCmp implements OnInit {
    reportProfile: any; // Report's full data
    hasKjcClassesInitially: boolean;
    bMoveMode: boolean; // State of dragging
    currentChangingParameter: ChangingParameter; // Info about current changing parameters 
    reportFiles: ReportFiles; // 
    componentAlert: Alert;

    subscriptions: Object;

    isTranslated: boolean;

    emptyField: Object;

    editPage: boolean;

    reportProfileCopy: any;

    roles: any;
    selectedRoles: any[];

    companies: any;
    selectedCompanies: any[];

    status: boolean;
    editFix: boolean;

    createReportErrors: RestResponse<any>;

    dependencyParameters: PDropdownItem[];

    tables: SelectItem[] = [];
    columns: SelectItem[] = [];
    classes: SelectItem[] = [];

    override: boolean;

    /*--------- Constructor --------*/
    constructor(
        private _utilityService: UtilityService,
        private _dragulaService: DragulaService,
        private _adminCreateReportService: AdminCreateReportService,
        private _translateService: TranslateService,
        private _appService: AppService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _changeDetectionRef: ChangeDetectorRef,
        private _appDataService: AppDataService,
        private _constants: Constants) {
        let vm = this;
        // Dragula config 
        this._dragulaService.setOptions('bag-main', {
            direction: 'horizontal',

            accepts: (el, target, source, sibling) => {
                let tempHasClass = $(el).hasClass('create_report-row-controls');
                let tempHasClassPlusBetween = $(el).hasClass('create_report-between-add_row');

                if (tempHasClass || tempHasClassPlusBetween) {
                    return false;
                } else {
                    return true;
                }
            },
            moves: (el, source, handle, sibling) => {
                let tempHasClass = $(el).hasClass('create_report-row-controls');
                let tempHasClassPlusBetween = $(el).hasClass('create_report-between-add_row');
                let tempHasClassPlus = $(el).hasClass('create_report-add_icon-box');


                return !vm.currentChangingParameter.bEditMode && !tempHasClass && !tempHasClassPlusBetween && !tempHasClassPlus;
            }
        });

        this._dragulaService.drop.subscribe((value) => {
            let tempHasBetweenPlus = $(value[3]).find('.create_report-between-add_row')[0];
            let tempChildCount = value[3].childElementCount;

            if (tempChildCount == 0) {
                let tempPrevContainerIndex = $(value[3]).index() - 1;

                vm.reportProfile.kjcReportParameterses.splice(tempPrevContainerIndex, 1);

            }

            vm.bMoveMode = false;
        });

        this._dragulaService.drag.subscribe((value) => {
            vm.bMoveMode = true;
            let tempPosition = $(value[1]).attr('position').split('-');
        });

        this._dragulaService.over.subscribe((value) => {
            vm.bMoveMode = true;
        });

        this._dragulaService.out.subscribe((value) => {
            vm.bMoveMode = false;
        });

        this._dragulaService.dragend.subscribe((value) => {
            vm.bMoveMode = false;
        });

    }

    /*--------- App logic --------*/
    /**
     * Submit method for creating report
     * @author Mario Petrovic
     */
    createReportSubmit(reportProfileRef: any): void {
        this._utilityService.setAlert(this.componentAlert);
        this.createReportErrors = null;
        reportProfileRef.kjcApplicationRoleses = [];

        let hashMapObject;

        for (let i = 0; i < this.selectedRoles.length; i++) {
            for (let j = 0; j < this.roles.length; j++) {
                if (this.selectedRoles[i] == this.roles[j].name) {
                    reportProfileRef.kjcApplicationRoleses.push(this.roles[j]);
                    break;
                }
            }
        }

        reportProfileRef.kjcCompanieses = [];
        for (let i = 0; i < this.selectedCompanies.length; i++) {
            for (let j = 0; j < this.companies.length; j++) {
                if (this.selectedCompanies[i] == this.companies[j].id) {
                    reportProfileRef.kjcCompanieses.push(this.companies[j]);
                    break;
                }
            }
        }

        for (let i = 0; i < this.reportProfileCopy.kjcReportParameterses[0].length; i++) {
            if (this.reportProfileCopy.kjcReportParameterses[0][i].type == 'HashMap') {
                hashMapObject = this.reportProfileCopy.kjcReportParameterses[0][i];
            }
        }

        if (hashMapObject) {
            hashMapObject.name = hashMapObject.key;
        }

        let formData = new FormData();

        let tempReportProfile = this._utilityService.copy(reportProfileRef);
        tempReportProfile.kjcReportParameterses = this.parameterMatrixToArray(reportProfileRef.kjcReportParameterses);
        if (tempReportProfile.kjcClasses) {
            tempReportProfile.kjcClasses.description = tempReportProfile.kjcClassesDescription;
        } else {
            if (tempReportProfile.kjcClassesDescription) {
                tempReportProfile.kjcClasses = {
                    description: tempReportProfile.kjcClassesDescription
                }
            }
        }

        if (hashMapObject) {
            tempReportProfile.kjcReportParameterses.push(hashMapObject);
        }

        formData.append('masterFile', this.reportFiles.jasper.files[0]);

        if (this.reportFiles.java && this.reportFiles.class && this.reportFiles.java.files && this.reportFiles.class.files) {
            formData.append('javaFile', this.reportFiles.java.files[0]);
            formData.append('compiledJavaFile', this.reportFiles.class.files[0]);
        }

        formData.append('propertyFile', this.reportFiles.properties ? this.reportFiles.properties.files[0] : '');

        formData.append('report', new Blob([JSON.stringify(tempReportProfile)], {
            type: 'application/json'
        }));

        //Making params array variable
        let obj = {};
        for (let key in this.reportFiles.subreport) {
            obj[this.reportFiles.subreport[key].fileName] = this.reportFiles.subreport[key].name;
            formData.append('subreportFiles', this.reportFiles.subreport[key].file);
        }

        formData.append('subreportFilesParams', new Blob([JSON.stringify(obj)], {
            type: 'application/json'
        }));

        let override: number;
        if (this.override == true) {
            override = 1;
        } else {
            override = 0;
        }

        this.subscriptions['createReportSubmit'] = this._adminCreateReportService.createReport(formData, override).subscribe(
            (res: RestResponse<any>) => {
                this.getValidationClasses();
                this.afterSubmitCleanup();
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            }, (err: RestResponse<any>) => {
                // this.afterSubmitCleanup();
                this.createReportErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            });
    }

    /**
     * Loads all tables
     * @author Mario Petrovic
     */
    loadAllTables(field: any, activateEdit?: boolean): void {
        this.subscriptions['loadAllTables'] = this._adminCreateReportService.getAllTables().subscribe(
            (res: RestResponse<any>) => {
                this.tables = [];
                for (let key in res.data) {
                    this.tables.push({ label: res.data[key], value: res.data[key] });
                }
                if (!activateEdit) {
                    field.dbTable = res.data[0];
                }
                this.onTableChange(field, activateEdit);
            }
        );

    }

    /**
     * Appends all companies and treats
     * them as selected.
     * @author Nikola Gavric
     */
    selectAllCompanies(): void {
        this.editFix = false;
        for (let company of this.companies) {
            this.selectedCompanies.push(company.id);
        }
        setTimeout(() => {
            this.editFix = true;
        });
    }

    /**
     * Clears all selected companies
     * @author Nikola Gavric
     */
    clearAllCompanies(): void {
        this.selectedCompanies = [];
    }

    /**
     * Update selected report and navigate to Report Management page
     * @author Mario Petrovic
     */
    updateReport(reportProfileRef: any) {
        this._utilityService.setAlert(this.componentAlert);
        this.createReportErrors = null;
        reportProfileRef.kjcApplicationRoleses = [];
        for (let i = 0; i < this.selectedRoles.length; i++) {
            for (let j = 0; j < this.roles.length; j++) {
                if (this.selectedRoles[i] == this.roles[j].name) {
                    reportProfileRef.kjcApplicationRoleses.push(this.roles[j]);
                    break;
                }
            }
        }

        reportProfileRef.kjcCompanieses = [];
        for (let i = 0; i < this.selectedCompanies.length; i++) {
            for (let j = 0; j < this.companies.length; j++) {
                if (this.selectedCompanies[i] == this.companies[j].id) {
                    reportProfileRef.kjcCompanieses.push(this.companies[j]);
                    break;
                }
            }
        }

        let formData = new FormData();

        let tempReportProfile = this._utilityService.copy(reportProfileRef);
        tempReportProfile.kjcReportParameterses = this.parameterMatrixToArray(reportProfileRef.kjcReportParameterses);
        if (tempReportProfile.kjcClasses) {
            tempReportProfile.kjcClasses.description = tempReportProfile.kjcClassesDescription;
        } else {
            if (tempReportProfile.kjcClassesDescription) {
                tempReportProfile.kjcClasses = {
                    description: tempReportProfile.kjcClassesDescription
                }
            }
        }

        if (this.reportFiles.java && this.reportFiles.class && this.reportFiles.java.files && this.reportFiles.class.files) {
            formData.append('javaFile', this.reportFiles.java.files[0]);
            formData.append('compiledJavaFile', this.reportFiles.class.files[0]);
        }

        formData.append('report', new Blob([JSON.stringify(tempReportProfile)], {
            type: 'application/json'
        }));

        this.subscriptions['updateReport'] = this._adminCreateReportService.updateReport(formData).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                let alert = new Alert(null, true);
                alert.message = res.message;
                this._appDataService.setReportMessage(alert);
                this._router.navigate(['admin/report_management']);
            }, (err: RestResponse<any>) => {
                this.createReportErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            });
    }

    /**
     * Load roles
     * @author Kirey
     */
    getRoles() {
        this.subscriptions['getRoles'] = this._adminCreateReportService.getRolesRest().subscribe(
            (res: RestResponse<any>) => {
                this.roles = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Deleting validation class for report
     * @author Nikola Gavric
     */
    deleteValidationClass(reportProfile: any) {
        this.subscriptions['deleteValidationClass'] = this._adminCreateReportService.deleteValidationClassByReportId(reportProfile.id).finally(
            () => {
                this.afterValidationDeleteCleanup();
            }).subscribe(
            (res: RestResponse<any>) => {
                this.getValidationClasses();
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            });
    }

    /**
     * Fires after deleting of validation
     * class and it cleans up the data
     * @author Nikola Gavric
     */
    private afterValidationDeleteCleanup() {
        this.hasKjcClassesInitially = false;
        this.reportProfile.kjcClasses = null;
        $('#file-input-java').val("");
        $("#file-input-class").val("");
        this.reportFiles.java = null;
        this.reportFiles.class = null;
        this.reportProfile.kjcClassesDescription = null;
    }

    /**
     * Method that executes every time when file is changed
     * @author Mario Petrovic
     */
    onChangeFile(event: any, fileType: string) {
        if (fileType == "java") {
            this.reportProfile.kjcClassesDescription = null;
            this.reportProfile.kjcClasses = null;
        }
        if (event.target.files[0]) {
            this.reportFiles[fileType] = event.target;
        } else {
            this.reportFiles[fileType] = '';
        }
    }

    /**
     * Update subreport files
     * @author DynTech
     */
    onSubFileChange(event: any, subreport: any) {
        LOOP: for (let key in this.reportFiles.subreport) {
            if (this.reportFiles.subreport[key].name == subreport.name) {
                this.reportFiles.subreport[key].file = event.target.files[0];
                this.reportFiles.subreport[key].fileName = this.reportFiles.subreport[key].file.name;
                break LOOP;
            }
        }
    }

    /**
     * Fires if a field is marked as sql
     * @author Nikola Gavric
     */
    onSqlChange(field: any, type: string) {
        if (type == 'sql') {

            if (field.isDependent) {
                this.removeDependentParamFromList(field);
            }

            field.isDependent = false;

            if (field.isSql) {
                this.loadAllTables(field);
            } else {
                field.dbTable = null;
                field.dbColumn = null;
            }
        } else {

            field.isSql = false;

            if (field.isDependent) {
                if (this.dependencyParameters.length > 0) {
                    field.dependencyParamName = this.dependencyParameters[0].value;
                }

                // Add current dependent parameter to host parameter's list of depenent params
                MAINLOOP: for (let fieldRow of this.reportProfile.kjcReportParameterses) {
                    for (let fieldColumn of fieldRow) {
                        if (fieldColumn.key == field.dependencyParamName) {
                            fieldColumn.dependentParams.push(field.key)
                            break MAINLOOP;
                        }
                    }
                }
                this.loadAllTables(field);
            } else {
                this.removeDependentParamFromList(field);
                field.dbTable = null;
                field.dbColumn = null;
            }
        }
    }

    /**
     * Remove dependent parameter from list of dependency param's dependent param list
     * @author Mario Petrovic
     */
    removeDependentParamFromList(field: any): void {
        for (let fieldRow of this.reportProfile.kjcReportParameterses) {
            for (let fieldColumn of fieldRow) {
                if (fieldColumn.key == field.dependencyParamName) {
                    let indexTemp = fieldColumn.dependentParams.indexOf(field.key);

                    fieldColumn.dependentParams.splice(indexTemp, 1);

                }
            }
        }
    }

    /**
     * When depndency parameter changes for dependent parameter, update list of dependent parameters
     * @author Mario Petrovic
     */
    onDependencyParamChange(field: any): void {
        for (let fieldRow of this.reportProfile.kjcReportParameterses) {
            for (let fieldColumn of fieldRow) {
                let indexTemp = fieldColumn.dependentParams.indexOf(field.key);

                fieldColumn.dependentParams.splice(indexTemp, 1);

            }
        }

        MAINLOOP: for (let fieldRow of this.reportProfile.kjcReportParameterses) {
            for (let fieldColumn of fieldRow) {
                if (fieldColumn.key == field.dependencyParamName) {
                    fieldColumn.dependentParams.push(field.key)
                    break MAINLOOP;
                }
            }
        }
    }

    /**
     * Fires after every table changed
     * (if parameter is marked as sql)
     * @author Nikola Gavric
     */
    public onTableChange(field: any, activateEdit?: boolean) {
        this.columns = [];
        this.subscriptions['getAllColumns'] = this._adminCreateReportService.getAllColumns(field.dbTable).subscribe(
            (res: RestResponse<any>) => {
                let temp = [];
                for (let key in res.data) {
                    temp.push({ label: res.data[key], value: res.data[key] });
                }
                this.columns = temp;
                if (!activateEdit) {
                    field.dbColumn = res.data[0];
                }
            }
        );
    }

    /**
     * Method to be executed when Jrxml file is changed
     * @author Mario Petrovic
     */
    onChangeJrxml(event: any): void {
        if (event.target.files.length > 0) {
            let reader = new FileReader();

            reader.readAsText(event.target.files[0], 'UTF-8');
            reader.onload = (evt: any) => {
                let parser: any = new DOMParser().parseFromString(evt.target.result, 'application/xml');
                parser = parser.getElementsByTagName('jasperReport')[0].getElementsByTagName('parameter')

                this.addJasperParams(this.xmlToJasperParams(parser), this.reportProfile);
                this.reportFiles.jrxml = event.target;
            }
        } else {
            this.reportFiles.jrxml = '';
            this.reportProfile.kjcReportParameterses = [[]];
            this.isTranslated = false;
        }
    }

    /**
     * Loading all companies
     * @author Nikola Gavric
     */
    private loadCompanies() {
        this.subscriptions['loadCompanies'] = this._adminCreateReportService.getAvailableCompanies().subscribe(
            (res: RestResponse<any>) => {
                this.companies = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Parse jasper parameters from xml array to JSON
     * @author Mario Petrovic
     */
    xmlToJasperParams(params: any[]): JasperParameter[] {
        let paramsTemp: JasperParameter[] = [];
        for (let param of params) {
            paramsTemp.push(new JasperParameter(param.attributes.name.value, param.attributes.class.value))
        }
        return paramsTemp;
    }

    /**
     * Fill report params with jasper params
     * @author Mario Petrovic
     */
    addJasperParams(params: JasperParameter[], reportProfile: any): void {
        this.reportProfileCopy = this._utilityService.copy(reportProfile);
        this.reportProfileCopy.kjcReportParameterses = [[]];
        this.reportFiles.subreport = [];

        reportProfile.kjcReportParameterses = [[]];
        this.isTranslated = false;
        let iterator = 0;
        for (let param of params) {
            let parsedJasperDataType = this.parseJasperDataType(param.type);
            if (parsedJasperDataType != 'HashMap' && parsedJasperDataType != 'JasperReport') {
                reportProfile.kjcReportParameterses[0].push({
                    paramId: iterator,
                    name: param.name,
                    key: param.name,
                    type: parsedJasperDataType,
                    description: '',
                    minValue: null,
                    maxValue: null,
                    isMandatory: false,
                    isSql: false,
                    isDependent: false,
                    dependentParams: []
                })
            } else if (parsedJasperDataType == 'JasperReport') {
                if (param.name == 'translationMap') {
                    this.isTranslated = true;
                } else {
                    this.reportFiles.subreport.push({ name: param.name, file: null, fileName: null });
                }
            } else {
                if (param.name == 'translationMap') {
                    this.isTranslated = true;
                }
            }

            this.reportProfileCopy.kjcReportParameterses[0].push({
                name: param.name,
                key: param.name,
                type: parsedJasperDataType,
                description: '',
                minValue: null,
                maxValue: null,
                isMandatory: false
            });

            iterator++;
        }
    }

    /**
     * Parse Jasper data type to report data type
     * @author Mario Petrovic
     */
    parseJasperDataType(type: string): string {
        let split = type.split('.');
        return Constants.JASPER_DATA_TYPES_PAIRS[split[split.length - 1]];
    }

    /*--------- Rows --------*/
    /**
     * Add row at the beggining of the canvas
     * @author Mario Petrovic
     */
    addRowBegining(fieldsMatrixRef: any[]): void {
        fieldsMatrixRef.unshift([]);
    }

    /**
     * Add row into form
     * @author Mario Petrovic
     */
    addRow(fieldsMatrixRef: any[]): void {
        fieldsMatrixRef.push([]);
    }

    /**
     * Add row in between rows
     * @author Mario Petrovic
     */
    addRowBetween(fieldsMatrixRef: any[], row: number): void {
        fieldsMatrixRef.splice(row + 1, 0, []);
    }

    /**
     * Remove row from form
     * @author Mario Petrovic
     */
    removeRow(fieldsMatrixRef: any, rowIndex: number): void {
        fieldsMatrixRef.splice(rowIndex, 1);
    }

    /*--------- Field --------*/
    /**
     * Activate edit mode on parameter
     * @author Mario Petrovic
     */
    activateEditMode(row: number, column: number, field: any): void {
        this.currentChangingParameter.y = row;
        this.currentChangingParameter.x = column;
        this.currentChangingParameter.bEditMode = true;

        if (field.dbTable) {
            this.dependencyParameters = this.removeDependencyParam(this.dependencyParameters, field.key);
            this.loadAllTables(field, true);
        }
    }

    /**
     * Deactivate edit mode on Done button
     * @author Mario Petrovic
     */
    deactivateEditMode(field: any): void {
        if (field.dbTable) {
            this.dependencyParameters.push({ label: field.name, value: field.key });
        } else {
            this.dependencyParameters = this.removeDependencyParam(this.dependencyParameters, field.key);
        }
        this.currentChangingParameter.bEditMode = false;
    }

    /*--------- State check methods --------*/
    /**
     * Check if the last row is populated
     * @author Mario Petrovic
     */
    isBeforeRowPopulated(fieldsMatrixRef: any[]): boolean {
        if (fieldsMatrixRef) {
            let tempLength = fieldsMatrixRef.length;
            return fieldsMatrixRef[tempLength - 1].length > 0;
        } else {
            return false;
        }
    }

    /**
     * Check if given field is in edit mode
     * @author Mario Petrovic
     */
    isFieldInEditMode(currentChangingParameterRef: ChangingParameter, row: number, column: number): boolean {
        return currentChangingParameterRef.y == row && currentChangingParameterRef.x == column && currentChangingParameterRef.bEditMode;
    }

    /**
     * Condition for showing add row between rows icon
     * @author Mario Petrovic
     */
    showAddRowBetween(fieldsMatrixRef: any[], row: number): boolean {
        let bTempNext: boolean = true;
        let bTempPrev: boolean = true;

        let bIsRowEmpty: boolean = fieldsMatrixRef[row].length > 0;

        let bTempIsNotLast = fieldsMatrixRef.length > row + 1;

        if (bTempIsNotLast) {
            switch (row) {
                case 0:
                    bTempNext = fieldsMatrixRef[row + 1].length > 0;
                    break;

                case fieldsMatrixRef.length - 1:
                    bTempPrev = fieldsMatrixRef[row - 1].length > 0;
                    break;

                default:
                    bTempNext = fieldsMatrixRef[row + 1].length > 0;
                    bTempPrev = fieldsMatrixRef[row - 1].length > 0;
                    break;
            }

        }
        return bTempNext && bTempNext && bTempIsNotLast && bIsRowEmpty;
    }

    /**
     * Check what type of filed is selected to display text for max and min properties
     * @author Mario Petrovic
     */
    minMaxValueTypeCheck(type): string {
        if (type == 'String') {
            return 'Length';
        } else {
            return 'Value';
        }

    }

    /**
     * Check if report profile is valid for submit button
     * @author Mario Petrovic
     */
    isReportProfileValid(reportProfileRef: any, reportFiles: any): boolean {
        if (this.bMoveMode || this.currentChangingParameter.bEditMode) {
            return false;
        }

        for (let row of reportProfileRef.kjcReportParameterses) {
            for (let column of row) {
                if (column.name == '') {
                    return false;
                }
            }
        }

        if (reportProfileRef.name == '') {
            return false;
        }

        if (this.reportFiles.java && !this.reportFiles.class) {
            return false;
        }

        if (this.reportFiles.java && this.reportFiles.class) {
            if (!this.javaClassMatching(reportFiles.class, reportFiles.java)) {
                return false;
            }
        }

        return reportFiles;
    }

    /**
     * Check if java cass and class file match by name
     * @author Mario Petrovic
     */
    javaClassMatching(classFile: any, javaFile: any): boolean {
        return new FileExtensionTrimmer().transform(classFile.files[0].name) == new FileExtensionTrimmer().transform(javaFile.files[0].name);
    }

    //Needs review
    javaJasperMatching(subreport: any): boolean {
        for (let key in this.reportFiles.subreport) {
            if (this.reportFiles.subreport.file != undefined) if (new FileExtensionTrimmer().transform(this.reportFiles.subreport[key].file.name) == new FileExtensionTrimmer().transform(subreport.file.name)) return true;
        }
        return false;
    }

    /**
     * Checks if max and min values go in range with eachother
     * @author Mario Petrovic
     */
    validateMinMax(parameter: any): void {
        if (parameter.minValue - parameter.maxValue > 0) {
            parameter.minValue = parameter.maxValue ? parameter.maxValue - 1 : null;
        }
    }

    /*--------- Utility --------*/
    /**
     * Fires after report is submitted.
     * This should clean after form.
     * @author Nikola Gavric
     */
    private afterSubmitCleanup() {
        //Hax for clearing inputs with type file
        $('input[type=file]').each(function (i, el) {
            let elem = $(el);
            elem.val("");
        });
        this.reportFiles = new ReportFiles();
        this.reportProfile = {
            name: '',
            type: 'sync',
            kjcClasses: null,
            flEnabled: true,
            description: '',
            kjcApplicationRoleses: [],
            kjcReportBlobses: [],
            kjcReportParameterses: [[]],
            kjcClassesDescription: null
        }
        this.reportProfileCopy = this.reportProfile;
        this.selectedRoles = [Constants.ROLES.SUPER_ADMIN];
        this.tables = [];
        this.columns = [];
    }

    /**
     * Setting kjcClasses description
     * @author Nikola Gavric
     */
    public onClassesChange(event: any, editJavaFile?: any, editClassFile?: any) {
        if (editJavaFile) {
            this.reportFiles.java = null;
            this.reportFiles.class = null;
            editJavaFile.value = "";
        }
        if (event.value)
            this.reportProfile.kjcClassesDescription = this.reportProfile.kjcClasses.description;
        else
            this.reportProfile.kjcClassesDescription = null;
    }

    /**
     * On Edit of a report
     * sql is being built up for certain field
     * @author Nikola Gavric
     */
    private populateEditReport(report: any) {
        for (let key in report.kjcReportParameterses) {
            for (let param of report.kjcReportParameterses[key]) {
                if (param.dbTable != null && param.dbColumn != "" && (param.type == "String" || param.type == "Integer")) {
                    if (param.dependencyParameter) {
                        param.isDependent = true;
                        param.dependencyParamName = param.dependencyParameter.key;
                    } else {
                        param.isSql = true;
                    }

                    this.dependencyParameters.push({ label: param.name, value: param.key });
                    param.dependentParams = [];

                    //  Update list of dependent params in dependency param
                    for (let keySub in report.kjcReportParameterses) {
                        for (let paramSub of report.kjcReportParameterses[key]) {
                            if (paramSub.dependencyParameter && param.key == paramSub.dependencyParameter.key) {
                                param.dependentParams.push(paramSub.dependencyParameter.key);
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Matrix for parameters converted into one array for Rest call
     * @author Mario Petrovic
     */
    parameterMatrixToArray(matrix: any): any[] {
        let tempResult = [];
        let tempMatrix = this._utilityService.copy(matrix);

        let tempCoordinates = [0, 0]

        for (let row of tempMatrix) {
            for (let column of row) {
                column.position = tempCoordinates[0] + ',' + tempCoordinates[1]
                tempResult.push(column);
                tempCoordinates[1]++;
            }

            tempCoordinates[0]++;
            tempCoordinates[1] = 0;
        }

        tempMatrix = tempResult;

        return tempMatrix;
    }

    /**
     * Transform parameters array into matrix
     * @author Mario Petrovic
     */
    private parametersArrayToMatrix(parametersArrayRef: any): any {
        let tempParameters = this._utilityService.copy(parametersArrayRef);
        let tempMatrix = [[]];

        let tempRow = 0;

        for (let parameter of tempParameters) {
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
        reportsRef.kjcReportParameterses = reportsRef.kjcReportParameterses.sort(function (a, b) {
            return a.position > b.position;
        });
    }

    /**
     * Remove dependency param when param stops being dependent
     * @author Mario Petrovic
     */
    removeDependencyParam(dependencyParameters: PDropdownItem[], paramKey: number): PDropdownItem[] {
        return dependencyParameters.filter((param: PDropdownItem) => {
            return param.value != paramKey;
        })
    }

    /**
     * Update dependency param list from the report
     * @author Mario Petrovic
     */
    updateDependencyParamList(field: any): void {
        for (let param of this.dependencyParameters) {
            if (param.value == field.key) {
                param.label = field.name;
                return;
            }
        }
    }

    /**
     *Check if all of report's subreports exist
     * @author Mario Petrovic
     */
    checkIfSubreportsExist(): boolean {
        let result = false;

        if (this.reportFiles.subreport) {
            for (let i = 0; i < this.reportFiles.subreport.length; i++) {
                if (!this.reportFiles.subreport[i].file) {
                    result = true;
                    break;
                }
            }
            return result;
        }
    }

    /**
     * Check if submit button is disabled
     * @author Mario Petrovic
     */
    disableSubmitButton(): boolean {
        return !this.isReportProfileValid(this.reportProfile, this.reportFiles) || this.checkIfSubreportsExist() || !this.reportFiles.jrxml || !this.reportFiles.jasper || (!this.reportProfile.kjcCompanieses && this.reportProfile.kjcCompanieses.length == 0);
    }

    /**
     * Check if submit button is disabled
     * @author Mario Petrovic
     */
    disableSubmitButtonEdit(): boolean {
        return !this.isReportProfileValid(this.reportProfile, this.reportFiles);
    }

    /**
     * Remove file from file input
     * @author Stefan Svrkota
     */
    clearFileInput(fileInput: any, fileInput1?: any) {
        fileInput.value = "";
        if (fileInput1) {
            fileInput1.value = "";
        }
        if (fileInput.id == "file-input-java") {
            this.reportFiles.java = null;
            this.reportFiles.class = null;
        } else if (fileInput.id == "file-input-class") {
            this.reportFiles.class = null;
        } else if (fileInput.id == "file-input-properties") {
            this.reportFiles.properties = null;
        }
    }

    /**
     * Get all validation classes
     * @author Stefan Svrkota
     */
    getValidationClasses() {
        this.subscriptions['classes'] = this._adminCreateReportService.getValidationClasses().subscribe(
            (res: RestResponse<any>) => {
                this.classes = [];
                this.classes.push({ label: "Select", value: null });
                for (let classes of res.data) {
                    this.classes.push({ label: classes.kjcPackages.name + '.' + classes.name, value: classes });
                }
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        );
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        let paramsTemp: any = this._activatedRoute;
        let title = Object.keys(paramsTemp.params.value).length ? 'mainHeaderEdit' : '';

        this._appService.pageLoaded(title, this);

        // Variables initialization
        this.roles = [];
        this.bMoveMode = false;
        this.componentAlert = new Alert(null, true);
        this.editPage = false;
        this.currentChangingParameter = new ChangingParameter();
        this.selectedRoles = [Constants.ROLES.SUPER_ADMIN];
        this.selectedCompanies = [];
        this.status = false;
        this.editFix = true;
        this.hasKjcClassesInitially = false;

        this.subscriptions = {};

        this.getRoles();
        this.loadCompanies();

        this.emptyField = {
            name: '',
            key: 'jr.',
            type: 'String',
            description: '',
            minValue: null,
            maxValue: null,
        };

        this.reportProfile = {
            name: '',
            type: 'sync',
            kjcClasses: null,
            flEnabled: true,
            description: '',
            kjcApplicationRoleses: [],
            kjcReportBlobses: [],
            kjcCompanieses: [],
            kjcReportParameterses: [[]],
            kjcClassesDescription: null
        }

        this.dependencyParameters = [];

        this.reportFiles = new ReportFiles();
        this.isTranslated = false;

        // Initial methods
        this.getValidationClasses();
        this._appService.languageChangeForComponent(this);

        this.subscriptions['params'] = this._activatedRoute.params.subscribe(params => {
            if (params['id']) {
                this.editFix = false;
                this.editPage = true;
                this.subscriptions['getReportById'] = this._adminCreateReportService.getReportById(params['id']).subscribe(
                    (res: RestResponse<any>) => {
                        if (res.data) {
                            this.selectedRoles = [];
                            this.sortReportParameters(res.data);
                            this.reportProfile = res.data;
                            for (let i = 0; i < this.reportProfile.kjcApplicationRoleses.length; i++) {
                                this.selectedRoles.push(this.reportProfile.kjcApplicationRoleses[i].name);
                            }
                            for (let i = 0; i < this.reportProfile.kjcCompanieses.length; i++) {
                                this.selectedCompanies.push(this.reportProfile.kjcCompanieses[i].id);
                            }
                            if (res.data.kjcClasses) {
                                this.hasKjcClassesInitially = true;
                                res.data.kjcClassesDescription = res.data.kjcClasses.description;
                            }
                            this.editFix = true;
                            this.reportProfile.kjcReportParameterses = this.parametersArrayToMatrix(this.reportProfile.kjcReportParameterses);
                            this.populateEditReport(this.reportProfile);
                        } else {
                            this._router.navigate(['admin/report_management']);
                        }
                    },
                    (err: RestResponse<any>) => {
                        this._router.navigate(['admin/report_management']);
                    }
                ),
                    (err: RestResponse<any>) => {
                        this._router.navigate(['admin/report_management']);
                    }
            }
        });
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy() {
        this._dragulaService.destroy('bag-main');
        this._appService.refreshEmitters(this.subscriptions);
    }
}
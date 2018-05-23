import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AppService } from '../../kjcore/shared/services/app.service';
import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ng2-bootstrap';
import { UIChart } from 'primeng/primeng';

import { Alert, RestResponse } from '../../kjcore/shared/models';

import { KJGriHistoryService } from './kjgri.history.service';

import { KJGriConstants } from "../kjgri.constants";
import { ControlPanelSharedService } from '../kjgri_shared/kjgri.control_panel.service';

@Component({
    moduleId: module.id,
    templateUrl: 'kjgri.history.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class KJGriHistoryCmp implements OnInit {

    subscriptions: any;
    componentAlert: Alert;
    clientCompanies: any;
    selectedClientCompany: any;
    companyLocations: any;
    selectedCompanyLocation: any;
    selectedModule: any;
    modules: [{ moduleName: string, columns: any[], plural: string }];
    histories: any;
    today: Date;
    risks: any;
    selectedSubrisk: any;
    previewModel: any;
    styles: any;
    toDate: Date;
    fromDate: Date;
    chartData: any;
    chartColumns: any = [];
    currentChartData: any;
    @ViewChild('chart')
    chart: UIChart;

    /*--------- Constructor --------*/
    constructor(private _utilityService: UtilityService,
        private _changeDetectionRef: ChangeDetectorRef,
        private _appService: AppService,
        private _historyService: KJGriHistoryService,
        private _cpShared: ControlPanelSharedService,
        private _constants: KJGriConstants,
        private _translateService: TranslateService,
        private _datepipe: DatePipe,
        private route: ActivatedRoute,
        private router: Router) { }

    /**
     * 
     * @author Nikola Gavric
     */
    get currentModule(): { moduleName: string, columns: string[] | any[], plural: string } {
        return this.modules.filter((singleModule) => {
            return singleModule.moduleName == this.selectedModule;
        })[0];
    }

    /**
     * 
     * @param event 
     * @author Nikola Gavric
     */
    public onSubtypeSelected(event) {
        this.selectedSubrisk = event;
        if (this.currentModule.moduleName == 'risk') this._loadRiskIndexes();
        if (this.currentModule.moduleName == 'forecast') this._loadForecasts();
    }

    /**
     * 
     * @author Nikola Gavric
     */
    public clientCompanyChanged() {
        if (this.selectedClientCompany) {
            this._loadClientLocations();
            this._clearAll();
        }
    }

    /**
     * 
     * @author Nikola Gavric
     */
    public clientCompanyLocationChanged() {
        this._clearHistoryTable();
    }

    /**
     * Loading all necessary stuff
     * @author Nikola Gavric
     */
    public loadData() {
        if (this._appService.isAuthorised([KJGriConstants.ROLES.PLATINUM_I, KJGriConstants.ROLES.GOLD_I, KJGriConstants.ROLES.SILVER_I])) {
            this._loadClientLocations(
                this._locationsCallback.bind(this)
            );
        } else {
            this._loadClientCompanies(
                this._companiesCallback.bind(this)
            );
        }
    }

    /**
     * 
     * @param moduleName 
     * @author Nikola Gavric
     */
    private _getModule(moduleName: string) {
        return this.modules.filter((obj) => obj.moduleName == moduleName)[0];
    }

    /**
     * 
     * @author Nikola Gavric
     */
    private _loadRisks() {
        this.subscriptions['_loadRisks'] = this._historyService.getAllRisks().subscribe(
            (res: RestResponse<any>) => {
                this.risks = res.data;
            },
            (err: RestResponse<any>) => {
                console.log(err);
            }
        )
    }

    /**
     * 
     * @author Nikola Gavric
     */
    private _loadStyles(selectedModule: string, data: any, historyModule: string) {
        this.subscriptions['_loadStyles'] = this._historyService.getAllStyles(selectedModule[0]).subscribe(
            (res: RestResponse<any>) => {
                this.styles = res.data;
                this._buildIndexesTable(data, historyModule);
            },
            (err: RestResponse<any>) => {
                console.log(err);
            }
        )
    }

    /**
     * 
     * @author Nikola Gavric
     */
    private _loadClientCompanies(callback?: Function) {
        this.subscriptions['_loadClientCompanies'] = this._historyService.getClientCompanies().subscribe(
            (res: RestResponse<any>) => {
                this.clientCompanies = res.data;
                if (callback) callback(this.clientCompanies);
            },
            (err: RestResponse<any>) => {
                console.log(err);
            }
        )
    }

    /**
     * 
     * @author Nikola Gavric
     */
    private _loadClientLocations(callback?: Function) {
        this.subscriptions['_loadClientLocations'] = this._historyService.getCompanyLocations(this.selectedClientCompany).subscribe(
            (res: RestResponse<any>) => {
                this.companyLocations = res.data;
                if (callback) callback(this.companyLocations);
            },
            (err: RestResponse<any>) => {
                console.log(err);
            }
        )
    }

    /**
     * 
     * @param value 
     * @author Nikola Gavric
     */
    public typeOf(value: any): any {
        return typeof value;
    }

    /**
     * 
     * @param object 
     * @param modal 
     * @author Nikola Gavric
     */
    public preview(object: any, modal?: ModalDirective) {
        if (this.currentModule.moduleName == 'pdf') this._previewPDF(object.id);
        if (this.currentModule.moduleName == 'alert') this.showModal(modal, object);
    }

    /**
     * 
     * @param currValue 
     * @param dateTo 
     * @author Nikola Gavric
     */
    public onDateFromChange(currValue: any) {
        if (currValue && this.toDate) {
            if (currValue.getTime() > this.toDate.getTime()) {
                this.toDate = null;
            }
        }
    }

    /**
     * 
     * @param moduleName 
     * @author Nikola Gavric
     */
    public getHistoryFor(moduleName: string, dateFrom?: Date, dateTo?: Date) {
        this.selectedModule = moduleName;
        this.histories = null;
        this._appService.refreshEmitters(this.subscriptions);
        switch (this.selectedModule) {
            case "pdf":
                this._loadPDFs(dateFrom, dateTo);
                break;
            case "risk":
                this._loadRiskIndexes(dateFrom, dateTo);
                break;
            case "forecast":
                this._loadForecasts(dateFrom, dateTo);
                break;
            case "alert":
                this._loadAlerts(dateFrom, dateTo);
                break;
        }
    }

    /**
     * 
     * @param dateFrom 
     * @param dateTo 
     * @author Nikola Gavric
     */
    private _loadForecasts(dateFrom?: Date, dateTo?: Date) {
        this.subscriptions['_loadForecasts'] = this._historyService.getForecast(this.selectedCompanyLocation.id, dateFrom, dateTo).subscribe(
            (res: RestResponse<any>) => {
                this._loadStyles(this.selectedModule, res.data, 'forecast');
            },
            (err: RestResponse<any>) => {
                console.log(err);
            }
        )
    }

    /**
     * 
     * @param dateFrom 
     * @param dateTo 
     * @author Nikola Gavric
     */
    private _loadRiskIndexes(dateFrom?: Date, dateTo?: Date) {
        this.subscriptions['_loadRiskIndexes'] = this._historyService.getRiskIndexes(this.selectedCompanyLocation.id, dateFrom, dateTo).subscribe(
            (res: RestResponse<any>) => {
                this._loadStyles(this.selectedModule, res.data, 'risk');
            },
            (err: RestResponse<any>) => {
                console.log(err);
            }
        )
    }

    /**
     * 
     * @param data 
     * @author Nikola Gavric
     */
    private _buildIndexesTable(data: any, moduleName: string) {
        let mod = this._getModule(moduleName);
        mod.columns = [];

        //Populate columns
        for (let dateKey in data) {
            mod.columns.push((object?) => {
                let val;
                if (object) {
                    val = new Date(object.dateKey.value);
                    if (this.currentModule.moduleName == 'risk') {
                        val = this._datepipe.transform(val, 'y');
                    } else {
                        val = this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                    }
                }
                return { value: val, header: 'fe.history.dateKey', column: 'dateKey' };
            });
            //Sorting Wind, Ice, and other subtypes
            data[dateKey].sort((a, b) => {
                return a.dicRiskSubtypes.name.localeCompare(b.dicRiskSubtypes.name);
            });
            data[dateKey].forEach(riskIndex => {
                mod.columns.push((object?) => {
                    let val;
                    if (object) {
                        val = object[riskIndex.dicRiskSubtypes.code].value != -1 ? parseInt(object[riskIndex.dicRiskSubtypes.code].value) : 'N/A';
                        // val = riskIndex.indexValue;
                    }
                    return { value: val, header: 'fe.history.' + riskIndex.dicRiskSubtypes.code, column: riskIndex.dicRiskSubtypes.code };
                });
            });
            break;
        }

        //Populate history table with data
        let temp = [];
        let chart = [];
        for (let dateKey in data) {
            let tempObj = {
                dateKey: { value: dateKey }
            };
            data[dateKey].forEach(obj => {
                tempObj[obj.dicRiskSubtypes.code] = {};
                this.styles.some(style => {
                    //If global check numericValue instead of indexValue and this only applies for risks
                    if(obj.dicRiskSubtypes.code == 'GL' && obj.numericValue == style.indexValue && moduleName == 'risk') {
                        tempObj[obj.dicRiskSubtypes.code]['fill'] = style.fill;
                        return true;
                    }

                    if (
                        (obj.value !== undefined && obj.value >= style.riskIndexMin && obj.value < style.riskIndexMax) ||
                        (obj.indexValue !== undefined && obj.indexValue == style.indexValue)
                    ) {
                        tempObj[obj.dicRiskSubtypes.code]['fill'] = style.fill;
                        return true;
                    }
                });
                tempObj['dicRiskSubtypes'] = obj.dicRiskSubtypes;
                tempObj[obj.dicRiskSubtypes.code]['value'] = obj.value !== undefined ? parseInt(obj.value) : parseInt(obj.indexValue);
                tempObj[obj.dicRiskSubtypes.code]['numericValue'] = obj.numericValue !== undefined ? parseInt(obj.numericValue) : parseInt(obj.value);
            });

            temp.push(tempObj);
        }

        temp.sort((a, b) => {
            let firstDate = (<any>new Date(b.dateKey.value));
            let secondDate = (<any>new Date(a.dateKey.value));
            if(firstDate > secondDate) return -1;
            if(firstDate < secondDate) return 1;
            return 0;
        });

        this.histories = temp;

        for (let dateKey in this.histories) {
            let subrisks = this.histories[dateKey];
            for (let objKey in subrisks) {
                let obj = subrisks[objKey];

                if (objKey != 'dateKey') {
                    if (!chart[objKey]) {
                        chart[objKey] = [];
                        chart[objKey]['data'] = [];
                        chart[objKey]['fill'] = false;
                        chart[objKey]['borderColor'] = this._randomColor();
                    }
                    chart[objKey]['data'].push(obj.numericValue);
                }
            }
        }

        this.currentChartData = chart;
    }

    /**
     * 
     * @param dateFrom 
     * @param dateTo 
     * @author Nikola Gavric
     */
    private _loadAlerts(dateFrom?: Date, dateTo?: Date) {
        this.subscriptions['_loadAlerts'] = this._historyService.getCompanyAlerts(this.selectedCompanyLocation, dateFrom, dateTo).subscribe(
            (res: RestResponse<any>) => {
                this.histories = res.data;
            },
            (err: RestResponse<any>) => {
                console.log(err);
            }
        )
    }

    /**
     * 
     * @param dateFrom 
     * @param dateTo 
     * @author Nikola Gavric
     */
    private _loadPDFs(dateFrom?: Date, dateTo?: Date) {
        this.subscriptions['_loadPDFs'] = this._historyService.getPDFs(this.selectedCompanyLocation.id, dateFrom, dateTo).subscribe(
            (res: RestResponse<any>) => {
                this.histories = res.data;
            },
            (err: RestResponse<any>) => {
                console.log(err);
            }
        )
    }

    /**
     * 
     * @param id 
     * @author Nikola Gavric
     */
    private _previewPDF(id: number) {
        this.subscriptions['_previewPDF'] = this._historyService.previewObject(id, 'pdf').subscribe(
            (res: RestResponse<any>) => {
                let blob = this._appService.convertBase64ToBlob(res.data, 'application/pdf');
                let fileURL = URL.createObjectURL(blob);
                // If site settings has popups blocked, this variable will be null, thus try/catch is required
                let newWindowState = window.open(fileURL);

                setTimeout(() => {
                    try {
                        if (newWindowState.closed) {
                            this._utilityService.setAlert(this.componentAlert, this._translateService.instant('fe.history.popupBlockerPresent'), 400);
                        } else {
                            this._utilityService.setAlert(this.componentAlert, res.message, 200);
                        }
                    } catch (e) {
                        this._utilityService.setAlert(this.componentAlert, this._translateService.instant('fe.history.popupBlockerPresent'), 400);
                    }
                }, 700);

            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * 
     * @author Nikola Gavric
     */
    private _clearAll() {
        this.selectedCompanyLocation = null;
        this._clearHistoryTable();
    }

    /**
     * 
     * @author Nikola Gavric
     */
    private _clearHistoryTable() {
        this.selectedModule = null;
        this.histories = null;
        this.risks = null;
        this.selectedSubrisk = null;
    }

    /**
     * 
     * @param data 
     * @author Nikola Gavric
     */
    private _constructPreviewModel(data: any) {
        let values, names;
        /** Alert */
        if (this.currentModule.moduleName == 'alert') {
            names = ['Date sent', 'Full name', 'Subtype name', 'Index Value', 'Forecast Target Timestamp', 'Message title', 'Message body', 'Message text'];
            values = [
                (object?) => {
                    let val;
                    if (object) {
                        val = new Date(object.sentTimestamp);
                        val = this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                    }
                    return val;
                },
                (object?) => {
                    let val;
                    if (object) {
                        val = object.kjcUserAccounts.firstName + ' ' + object.kjcUserAccounts.lastName;
                    }
                    return val;
                },
                'alerts.dicRiskSubtypes.name',
                'forecastIndexValue',
                (object?) => {
                    let val;
                    if (object) {
                        val = new Date(object.forecastTargetTimestamp);
                        val = this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                    }
                    return val;
                },
                'messageTitle',
                'messageBody',
                'messageText'
            ];
        }

        /** Html create */
        if (names && values) {
            let html = ``;
            values.forEach((row, index) => {
                let type = this.typeOf(row);
                let isString = type === 'string';
                let isFunction = type === 'function';
                let newObj;
                if (isString) {
                    row = (<string>row);
                    let dots = (<string>row).split('.');
                    if (dots.length > 1) {
                        dots.forEach((dot, index) => {
                            if (index == 0) newObj = data[dot];
                            else newObj = newObj[dot];
                        });
                    } else {
                        newObj = data[row];
                    }
                } else {
                    newObj = (<Function>row)(data);
                }
                html += `<div class='row'>
                            <div class='col-md-12'>
                                <p><strong>`+ names[index] + `:</strong> ` + newObj + `</p>
                            </div>
                        </div>`;
            });
            this.previewModel = html;
        }
    }

    /**
     * Show modal based on passed modal directive and custom behaviour based on data
     * @author Nikola Gavric
     */
    public showModal(modal: ModalDirective, data: any, modalName?: string): void {
        this._utilityService.setAlert(this.componentAlert);
        if (modalName && modalName == 'chart') {
            this.chartData = null;
            this.chartColumns = [];
            this.updateChartData(null);
        }
        if (data) this._constructPreviewModel(data);
        modal.show();
    }

    /**
     * Hide modal based on passed modal directive
     * @author Nikola Gavric
     */
    public hideModal(modal: ModalDirective) {
        modal.hide();
    }

    /**
     * 
     * @param object 
     * @author Nikola Gavric
     */
    public styleClasses(object) {
        let classes = {
            display: 'table-cell',
            width: '100%',
            height: '79px',
            'vertical-align': 'middle'
        }
        if (object) {
            if (this.typeOf(object) === 'object') {
                if (object.hasOwnProperty('fill')) {
                    classes['background-color'] = object.fill;
                    classes['color'] = '#333';
                }
            }
        }
        
        return classes;
    }

    /**
     * 
     * @param hex 
     * @author Nikola Gavric
     */
    public hexToRgbA(hex, opacity = 1) {
        if (hex) {
            let c;
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                c = hex.substring(1).split('');
                if (c.length == 3) {
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x' + c.join('');
                return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ', ' + opacity + ')';
            }
            throw new Error('Bad Hex');
        }
    }

    /**
     * 
     * @param event 
     * @author Nikola Gavric
     */
    public updateChartData(event) {
        let temp = [];
        temp['labels'] = [];
        temp['datasets'] = [];
        // this.chartData = null;
        // this._changeDetectionRef.detectChanges();


        //Labels
        for (let obj of this.histories) {
            if (obj) {
                let dateObject = new Date(obj.dateKey.value);
                let dateString = obj.dateKey.value;

                //If it's risk show only year as a label
                if(this.selectedModule != 'risk') {
                    dateString = this._datepipe.transform(dateObject, 'dd-MM-yyyy HH:mm:ss');
                } else {
                    dateString = this._datepipe.transform(dateObject, 'y');
                }

                temp['labels'].push(dateString);
            }
        }

        //Graph data
        for (let i = 0; i < this.chartColumns.length; i++) {
            let obj = this.chartColumns[i];
            if (this.currentChartData[obj]) {
                let elem = {
                    label: obj,
                    data: this.currentChartData[obj]['data'],
                    fill: this.currentChartData[obj]['fill'],
                    borderColor: this.currentChartData[obj]['borderColor']
                };

                if (temp['datasets'].length == 0) {
                    temp['datasets'].push(elem);
                } else {
                    let found = false;
                    for (let dataset of temp['datasets']) {
                        if (dataset.label == obj) {
                            dataset.data.push(this.currentChartData[obj]['data']);
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        temp['datasets'].push(elem);
                    }
                }
            }
        }

        this.chartData = temp;
        this._changeDetectionRef.detectChanges();
        this.chart.refresh();
    }

    /**
     * @author Nikola Gavric
     */
    private _randomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /**
     * 
     * @param locations 
     * @author Nikola Gavric
     */
    private _locationsCallback(locations: any): void {
        this.subscriptions['routeParams'] = this.route.params.subscribe(params => {
            let companyId = +params['companyId']; // (+) converts string 'id' to a number
            let locationId = +params['locationId'];
            if (!isNaN(locationId)) {
                if (locationId < 0) {
                    this.router.navigate(['/home']);
                }
                //Impreza
                if (this._appService.isAuthorised([this._constants.getROLES().PLATINUM_I, this._constants.getROLES().GOLD_I, this._constants.getROLES().SILVER_I])) {
                    let found: boolean = false;
                    for (let location of locations) {
                        if (location.id == locationId) {
                            this.selectedCompanyLocation = location;
                            found = true;
                            break;
                        }
                    }
                    if (!found) this.router.navigate(['/home']);
                }
            }
        });
    }

    /**
     * 
     * @param companies 
     */
    private _companiesCallback(companies: any): void {
        this.subscriptions['routeParams'] = this.route.params.subscribe(params => {
            let companyId = +params['companyId']; // (+) converts string 'id' to a number
            let locationId = +params['locationId'];
            if (!isNaN(companyId) && !isNaN(locationId)) {
                if (companyId < 0 || locationId < 0) {
                    this.router.navigate(['/home']);
                }
                //Assicurativo
                if (this._appService.isAuthorised([this._constants.getROLES().PLATINUM_A, this._constants.getROLES().SUPER_ADMIN])) {
                    let found: boolean = false;
                    for (let company of companies) {
                        if (company.id == companyId) {
                            this.selectedClientCompany = company;
                            found = true;
                            break;
                        }
                    }
                    if (!found) this.router.navigate(['/home']);
                    this._loadClientLocations(
                        (locations) => {
                            if (!isNaN(locationId)) {
                                found = false;
                                for (let location of locations) {
                                    if (location.id == locationId) {
                                        this.selectedCompanyLocation = location;
                                        found = true;
                                        break;
                                    }
                                }
                                if (!found) this.router.navigate(['/home']);
                            }
                        }
                    );
                }
            }
        });
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.subscriptions = [];
        this.componentAlert = new Alert(null, true);
        this.modules = [
            {
                moduleName: 'pdf',
                columns: [
                    // 'id',
                    (object?) => {
                        let val;
                        if (object) {
                            val = new Date(object.tsInsert);
                            val = this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                        }
                        return { value: val, header: 'fe.history.createdDate', column: 'tsInsert' };
                    },
                ],
                plural: 'fe.history.pdfColumn'
            },
            {
                moduleName: 'risk',
                columns: [

                ],
                plural: 'fe.history.risksColumn'
            },
            {
                moduleName: 'forecast',
                columns: [
                    'id',
                    (object?) => {
                        let val;
                        if (object) {
                            val = new Date(object.dataMeasurementTimestamp);
                            val = this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                        }
                        return { value: val, header: 'fe.history.measurementDate', column: 'dataMeasurementTimestamp' };
                    },
                    (object?) => {
                        let val;
                        if (object) {
                            val = new Date(object.targetTimestamp);
                            val = this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                        }
                        return { value: val, header: 'fe.history.targetDate', column: 'targetTimestamp' };
                    },
                    'value'
                ],
                plural: 'fe.history.forecastsColumn'
            },
            {
                moduleName: 'alert',
                columns: [
                    (object?) => {
                        let val;
                        if (object) {
                            val = new Date(object.sentTimestamp);
                            val = this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                        }
                        return { value: val, header: 'fe.history.dateSent', column: 'sentTimestamp' };
                    },
                    (object?) => {
                        let val;
                        if (object) {
                            val = object.kjcUserAccounts.firstName + ' ' + object.kjcUserAccounts.lastName;
                        }
                        return { value: val, header: 'fe.history.userName', column: 'kjcUserAccounts.firstName' };
                    },
                    (object?) => {
                        let val;
                        if (object) {
                            val = object.forecastIndexValue;
                        }
                        return { value: val, header: 'fe.history.forecastIndexValue', column: 'forecastIndexValue' };
                    },
                    (object?) => {
                        let val;
                        if (object) {
                            val = new Date(object.forecastTargetTimestamp);
                            val = this._datepipe.transform(val, 'd MMM y HH:mm:ss');
                        }
                        return { value: val, header: 'fe.history.forecastTargetTimestamp', column: 'forecastTargetTimestamp' };
                    },
                    (object?) => {
                        let val;
                        if (object) {
                            val = object.alerts.dicRiskSubtypes.name;
                        }
                        return { value: val, header: 'fe.history.subtypeName', column: 'alerts.dicRiskSubtypes.name' };
                    },
                    (object?) => {
                        let val;
                        if (object) {
                            val = object.messageTitle;
                        }
                        return { value: val, header: 'fe.history.messageTitle', column: 'messageTitle' };
                    }
                ],
                plural: 'fe.history.alertsColumn',
            }
        ];
        this.companyLocations = [];

        //Setting initial submit value
        this.today = new Date();
        //this.today.setDate(this.today.getDate() + 2);
        //Loading view data
        this.loadData();

        this._appService.languageChangeForComponent(this);
    }

    ngOnDestroy() { // On destroy
        this._appService.refreshEmitters(this.subscriptions);
    }
}
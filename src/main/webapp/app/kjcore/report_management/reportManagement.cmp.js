"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var ng2_translate_1 = require('ng2-translate');
var primeng_1 = require('primeng/primeng');
var reportManagement_service_1 = require('./reportManagement.service');
var validation_service_1 = require('../shared/services/validation.service');
var app_service_1 = require('../shared/services/app.service');
var appData_service_1 = require('../shared/services/appData.service');
var utility_service_1 = require('../shared/services/utility.service');
var models_1 = require('./models');
var models_2 = require('../shared/models');
var constants_1 = require('../constants');
var ReportManagementCmp = (function () {
    /*--------- Constructor --------*/
    function ReportManagementCmp(_utilityService, _reportManagementService, _translateService, _router, _appService, _appDataService, _constants) {
        this._utilityService = _utilityService;
        this._reportManagementService = _reportManagementService;
        this._translateService = _translateService;
        this._router = _router;
        this._appService = _appService;
        this._appDataService = _appDataService;
        this._constants = _constants;
        this.options = [];
    }
    /*--------- App logic --------*/
    /**
     * Loads all the reports.
     * @author Mario Petrovic
     */
    ReportManagementCmp.prototype.loadReportsRest = function (deleteAction) {
        var _this = this;
        this.reports = [];
        this.selectedReport = null;
        this.subscriptions['loadReportsRest'] = this._reportManagementService.getReports().subscribe(function (res) {
            _this.allReports = res.data;
            _this.modifyReports(_this.allReports);
            _this.reports = _this.allReports;
            _this.sortPossibleSQL(_this.reports);
            _this.sortReportParameters(_this.reports);
            _this.dataTable.selection = _this.tableReports[0];
            _this.selectReport(_this.allReports[0]);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Modify reports object
     * @author Stefan Svrkota
     */
    ReportManagementCmp.prototype.modifyReports = function (reports) {
        var _this = this;
        this.tableReports = [];
        var hostParameters = [];
        var iterator = 0;
        for (var _i = 0, reports_1 = reports; _i < reports_1.length; _i++) {
            var report = reports_1[_i];
            // Connect dependent parameters
            var iteratorTemp = 0;
            hostParameters[iterator] = {};
            for (var _a = 0, _b = report.kjcReportParameterses; _a < _b.length; _a++) {
                var param = _b[_a];
                if (param.dbColumn && param.dbTable) {
                    param.eventEmitter = new core_1.EventEmitter();
                    var tempName = param.key;
                    hostParameters[iterator][tempName] = iteratorTemp;
                }
                iteratorTemp++;
            }
            // Fill table array with report
            var roles = "";
            for (var j = 0; j < report.kjcApplicationRoleses.length; j++) {
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
        var iteratorParams = 0;
        var _loop_1 = function(report) {
            var _loop_2 = function(param) {
                if (param.dbColumn && param.dbTable && param.dependencyParameter) {
                    var tempIndex = hostParameters[iteratorParams][param.dependencyParameter.key];
                    report.kjcReportParameterses[tempIndex].eventEmitter.subscribe(function (value) {
                        if (value) {
                            _this._reportManagementService.getDependencyFilteredList(value, param.id).subscribe(function (res) {
                                var obj = [];
                                obj.push({ label: "Select", value: null });
                                var newArr = _this.sortParametersByValue(res.data);
                                for (var _i = 0, newArr_1 = newArr; _i < newArr_1.length; _i++) {
                                    var key = newArr_1[_i];
                                    obj.push({ label: key[1], value: key[0] });
                                }
                                _this.options[report.id][param.key] = obj;
                            });
                        }
                        else {
                            _this.options[report.id][param.key] = [];
                        }
                    });
                }
            };
            for (var _c = 0, _d = report.kjcReportParameterses; _c < _d.length; _c++) {
                var param = _d[_c];
                _loop_2(param);
            }
            iteratorParams++;
        };
        for (var _e = 0, reports_2 = reports; _e < reports_2.length; _e++) {
            var report = reports_2[_e];
            _loop_1(report);
        }
    };
    ReportManagementCmp.prototype.dependencyEventEmitter = function (field, value) {
        field.eventEmitter.emit(value);
    };
    /**
     * Creates a report form on click on one of reports.
     * @author Mario Petrovic
     */
    ReportManagementCmp.prototype.selectReport = function (event) {
        var _this = this;
        // this._utilityService.setAlert(this.componentAlert);
        if (event) {
            if (event.data) {
                this.selectedReport = this.reports.filter(this.filterArrayOfObjects.bind(null, { name: 'id', value: event.data.id }))[0];
            }
            else {
                this.selectedReport = this.reports.filter(this.filterArrayOfObjects.bind(null, { name: 'id', value: event.id }))[0];
            }
            this.selectedReportParams = this.parametersArrayToMatrix(this.selectedReport.kjcReportParameterses);
            this.formLoaded = false;
            var tempFormGroup = {};
            if (this.selectedReport.type == "async") {
                tempFormGroup["bookedDate"] = new forms_1.FormControl(new Date(), [forms_1.Validators.required]);
                this.unavailableDates = [];
            }
            for (var _i = 0, _a = this.selectedReport.kjcReportParameterses; _i < _a.length; _i++) {
                var parameter = _a[_i];
                var tempValidations = [];
                var tempCondition = parameter.type != 'Timestamp' && parameter.type != 'Date' && !parameter.dbTable && !parameter.dbColumn && Object.keys(parameter.dropdownList).length == 0 && parameter.type != 'HashMap';
                if (tempCondition) {
                    for (var _b = 0, _c = Object.keys(parameter); _b < _c.length; _b++) {
                        var key = _c[_b];
                        if (key == 'minValue' && parameter['minValue'] != null) {
                            if (parameter.type == 'String') {
                                tempValidations.push(forms_1.Validators.minLength(parameter['minValue']));
                            }
                            else {
                                tempValidations.push(validation_service_1.ValidationService.validateMin(parameter['minValue']));
                            }
                        }
                        else if (key == 'maxValue' && parameter['minValue'] != null) {
                            if (parameter.type == 'String') {
                                tempValidations.push(forms_1.Validators.maxLength(parameter['maxValue']));
                            }
                            else {
                                tempValidations.push(validation_service_1.ValidationService.validateMax(parameter['maxValue']));
                            }
                        }
                        else if (key == 'isMandatory' && parameter['isMandatory']) {
                            tempValidations.push(forms_1.Validators.required);
                        }
                    }
                    tempFormGroup[parameter.key] = new forms_1.FormControl(parameter.defaultValue, tempValidations);
                }
                else if (parameter.dbTable && parameter.dbColumn && (parameter.type == 'String' || parameter.type == "Integer")) {
                    if (parameter.isMandatory) {
                        tempValidations.push(forms_1.Validators.required);
                    }
                    tempFormGroup[parameter.key] = new forms_1.FormControl(this.options[parameter.key], tempValidations);
                }
                else if (parameter.type == 'Date') {
                    tempValidations.push(forms_1.Validators.required);
                    tempFormGroup[parameter.key] = new forms_1.FormControl(new Date(), tempValidations);
                }
            }
            tempFormGroup["format"] = new forms_1.FormControl('pdf', [forms_1.Validators.required]);
            this.form = new forms_1.FormGroup(tempFormGroup);
            setTimeout(function () {
                _this.formLoaded = true;
            });
        }
    };
    /**
     * Retrieve unavailable dates for a report
     * @author Ciprian Dorofte
     */
    ReportManagementCmp.prototype.getUnavailableDates = function (event) {
        var _this = this;
        //Check if is a valid date, if is clicked on calendar icon and retrieve unavailabled dates list
        if (event.target.value || event.target.tagName == 'SPAN') {
            this.subscriptions['getUnavailableDates'] = this._reportManagementService.getUnavailableDatesRest(this.selectedReport.id).subscribe(function (res) {
                var tempList = [];
                res.data.forEach(function (dateInLong) {
                    tempList.push(new Date(dateInLong));
                });
                _this.unavailableDates = tempList;
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            }, function () {
                _this.clearValidationMessages();
            });
        }
    };
    /**
     * Formats the date object into YYYY-MM-DD HH:MM:SS format.
     * @author Nikola Gavric
     */
    ReportManagementCmp.prototype.currentDateWithFormat = function (date) {
        var curr_date = date.getDate();
        var curr_month = date.getMonth();
        var curr_year = date.getFullYear();
        var curr_hours = date.getHours();
        var curr_mins = date.getMinutes();
        var curr_secs = date.getSeconds();
        var new_month = curr_month.toString();
        var new_secs = curr_secs.toString();
        var new_mins = curr_mins.toString();
        var new_hours = curr_hours.toString();
        if (curr_month < 10)
            new_month = "0" + curr_month;
        if (curr_hours < 10)
            new_hours = "0" + curr_hours;
        if (curr_mins < 10)
            new_mins = "0" + curr_mins;
        if (curr_secs < 10)
            new_secs = "0" + curr_secs;
        return curr_year + "-" + new_month + "-" + curr_date + " " + new_hours + ":" + new_mins + ":" + new_secs;
    };
    /**
     * Scheduling a report.
     * @author Nikola Gavric
     */
    ReportManagementCmp.prototype.addBooking = function () {
        // this._utilityService.setAlert(this.componentAlert);
        var _this = this;
        //Current Date and Time
        this.today = new Date();
        var date = new Date(this.form.value.bookedDate);
        //Set current time to available date
        date.setHours(this.today.getHours(), this.today.getMinutes(), this.today.getSeconds());
        var params = [];
        var obj = {
            format: this.form.value.format,
            bookedDate: date.getTime(),
            kjcReports: null,
            kjcReportBookingParameterses: null
        };
        var newObj = this._utilityService.copy(obj);
        //Setting newSelectedReport so selectedReport doesnt break HTML, it is binded
        var newSelectedReport = this._utilityService.copy(this.selectedReport);
        newSelectedReport.parameters = null;
        //Setting report
        obj.kjcReports = newSelectedReport;
        for (var key in this.form.value) {
            for (var _i = 0, _a = this.selectedReport.kjcReportParameterses; _i < _a.length; _i++) {
                var parameter = _a[_i];
                if (parameter['key'] == key) {
                    var param = {};
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
        this.subscriptions['addBooking'] = this._reportManagementService.addBooking(obj).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
        }, function () {
            _this.clearValidationMessages();
        });
    };
    ReportManagementCmp.prototype.isDisabledToBook = function () {
        var formDate = new Date(this.form.value.bookedDate);
        formDate.setHours(0, 0, 0, 0);
        this.today.setHours(0, 0, 0, 0);
        if (formDate.getTime() == this.today.getTime()) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Printing a report.
     * @author Nikola Gavric
     */
    ReportManagementCmp.prototype.printReport = function (newWindow, reportName) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        var params = {};
        //setting sql value
        for (var _i = 0, _a = this.selectedReport.kjcReportParameterses; _i < _a.length; _i++) {
            var parameter = _a[_i];
            INNERLOOP: for (var formParam in this.form.controls) {
                if (parameter.key == formParam) {
                    if (parameter.type == 'Timestamp' || parameter.type == 'Date') {
                        parameter.value = new Date(this.form.controls[formParam].value).getTime();
                    }
                    else {
                        parameter.value = this.form.controls[formParam].value;
                    }
                    break INNERLOOP;
                }
            }
        }
        var frontEndFormat;
        if (this.form.value.format == "pdf") {
            frontEndFormat = 'application/pdf';
        }
        else {
            frontEndFormat = 'application/vnd.ms-excel';
        }
        // Clear report object from EventEmmiters beacuse Circular error appears when sending data through http
        var clearedReport = this.clearEventEmitters(this.selectedReport);
        var obj = {
            id: null,
            format: this.form.value.format,
            bookedDate: this.form.value.bookedDate,
            report: clearedReport,
            pageId: "reportManagement",
            kjcReportParameterses: params,
            frontEndFormat: frontEndFormat
        };
        this.subscriptions['printReport'] = this._reportManagementService.printReport(obj).subscribe(function (res) {
            var blob = _this._appService.convertBase64ToBlob(res.data, frontEndFormat);
            if (newWindow) {
                var fileURL = URL.createObjectURL(blob);
                // If site settings has popups blocked, this variable will be null, thus try/catch is required
                var newWindowState_1 = window.open(fileURL);
                setTimeout(function () {
                    try {
                        if (newWindowState_1.closed) {
                            _this._utilityService.setAlert(_this.componentAlert, 'fe.reportManagement.popupBlockerPresent', 400);
                        }
                        else {
                            _this._utilityService.setAlert(_this.componentAlert, 'fe.reportManagement.reportPrinted', res.statusCode);
                        }
                    }
                    catch (e) {
                        _this._utilityService.setAlert(_this.componentAlert, 'fe.reportManagement.popupBlockerPresent', 400);
                    }
                }, 700);
            }
            else {
                saveAs(blob, reportName + (frontEndFormat == 'application/pdf' ? '.pdf' : '.xlsx'));
                _this._utilityService.setAlert(_this.componentAlert, 'fe.reportManagement.reportPrinted', res.statusCode);
            }
            _this.formErrors = null;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.formErrors = err;
        });
    };
    /**
     * Rest - delete choosen report
     * @author Mario Petrovic
     */
    ReportManagementCmp.prototype.deleteReport = function (reportId, modal) {
        var _this = this;
        this._reportManagementService.deleteReport(reportId).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.loadReportsRest(true);
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Update report status
     * @author Stefan Svrkota
     */
    ReportManagementCmp.prototype.updateReportStatus = function (report) {
        var _this = this;
        var status;
        if (report.flEnabled == true) {
            status = 0;
        }
        else {
            status = 1;
        }
        this.subscriptions['updateReportStatus'] = this._reportManagementService.updateReportStatus(status, report.id).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.loadReportsRest(false);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Opet modal for editing report
     * @author Mario Petrovic
     */
    ReportManagementCmp.prototype.editReport = function (reportId) {
        this._router.navigate(['admin/create_report', reportId]);
    };
    /*---------- Utilities ----------*/
    /**
     * Addition to filtering by param name
     * @author Mario Petrovic
     */
    ReportManagementCmp.prototype.filterArrayOfObjects = function (customArgument, value) {
        return value[customArgument.name] == customArgument.value;
    };
    /**
     * Transforms report parameter type into form-readable type.
     * @author Mario Petrovic
     */
    ReportManagementCmp.prototype.transformFieldType = function (type) {
        if (type == "Integer" || type == "Double" || type == "Long" || type == "Float") {
            return "number";
        }
        else if (type == "String") {
            return "text";
        }
    };
    /**
     * Transform parameters array into matrix
     * @author Mario Petrovic
     */
    ReportManagementCmp.prototype.parametersArrayToMatrix = function (parametersArrayRef) {
        // let tempParameters = this._utilityService.copy(parametersArrayRef);
        var tempMatrix = [[]];
        var tempRow = 0;
        for (var _i = 0, parametersArrayRef_1 = parametersArrayRef; _i < parametersArrayRef_1.length; _i++) {
            var parameter = parametersArrayRef_1[_i];
            if (parameter.key != "translationMap") {
                var tempPosition = parameter.position.split(',');
                if (tempRow != tempPosition[0]) {
                    tempMatrix.push([]);
                }
                tempMatrix[parseInt(tempPosition[0])].push(parameter);
                tempRow = tempPosition[0];
            }
        }
        return tempMatrix;
    };
    /**
     * Sort incoming parameters from report by position
     * @author Mario Petrovic
     */
    ReportManagementCmp.prototype.sortReportParameters = function (reportsRef) {
        for (var _i = 0, reportsRef_1 = reportsRef; _i < reportsRef_1.length; _i++) {
            var report = reportsRef_1[_i];
            report.kjcReportParameterses = report.kjcReportParameterses.sort(function (a, b) {
                return a.position > b.position;
            });
        }
    };
    /**
     * Sort possible sql
     * @author Nikola Gavric
     */
    ReportManagementCmp.prototype.sortPossibleSQL = function (reports) {
        for (var _i = 0, reports_3 = reports; _i < reports_3.length; _i++) {
            var report = reports_3[_i];
            this.options[report.id] = [];
            for (var _a = 0, _b = report.kjcReportParameterses; _a < _b.length; _a++) {
                var param = _b[_a];
                OUTERIF: if (param.type == "String" || param.type == "Integer") {
                    if (param.dbTable && param.dbColumn && !param.dependencyParameter) {
                        if (Object.keys(param.dropdownList).length > 0) {
                            var obj = [];
                            obj.push({ label: "Select", value: null });
                            var newArr = this.sortParametersByValue(param);
                            for (var _c = 0, newArr_2 = newArr; _c < newArr_2.length; _c++) {
                                var key = newArr_2[_c];
                                obj.push({ label: key[1], value: key[0] });
                            }
                            this.options[report.id][param.key] = obj;
                        }
                        else {
                            break OUTERIF;
                        }
                    }
                    else if (param.dependencyParameter) {
                        this.options[report.id][param.key] = [];
                    }
                }
            }
        }
    };
    /**
     * Sorting parameter dropdownList by
     * each value represented in key:value pair
     * @author Nikola
     */
    ReportManagementCmp.prototype.sortParametersByValue = function (param) {
        var toArr = [];
        for (var key in param.dropdownList) {
            toArr.push([key, param.dropdownList[key]]);
        }
        toArr.sort(function (a, b) {
            return a[1].toLowerCase() > b[1].toLowerCase() ? 1 : -1;
        });
        return toArr;
    };
    /**
     * This method clear validation messages
     * @author Ciprian Dorofte
     */
    ReportManagementCmp.prototype.clearValidationMessages = function () {
        this.formErrors = null;
    };
    ReportManagementCmp.prototype.refreshTable = function () {
        this.loadReportsRest(false);
        this.dataTable.reset();
        this.dataTable.selection = null;
        this.globalFilter.nativeElement.value = "";
    };
    /**
    *  Repack report object, because report cannot be sent to http handler with EventEmitters inside
    *  @author Mario Petrovic
    */
    ReportManagementCmp.prototype.clearEventEmitters = function (report) {
        var reportTemp = {};
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
        };
        for (var _i = 0, _a = report.kjcReportParameterses; _i < _a.length; _i++) {
            var parameter = _a[_i];
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
    };
    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Mario Petrovic
     */
    ReportManagementCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.formErrors = new models_2.RestResponse();
        switch (modalName) {
            case 'deleteReport':
                this.deletingReport = data;
                break;
        }
        modal.show();
    };
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    ReportManagementCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /*--------- NG On Init ---------*/
    ReportManagementCmp.prototype.ngOnInit = function () {
        var _this = this;
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        // Variable initialization
        this.messages = [];
        this.reports = [];
        this.form = new forms_1.FormGroup({});
        this.formLoaded = false;
        this.subscriptions = {};
        this.selectedReportParams = [];
        this.deletingReport = new models_1.Report();
        this.formErrors = new models_2.RestResponse();
        this.today = new Date();
        this.minDate = new Date();
        this.maxDate = new Date();
        this.dateFormat = "dd/mm/yy";
        this.minDate.setDate(this.today.getDate() + 1);
        // The availability interval is from tommorw + 31 days
        this.maxDate.setDate(this.today.getDate() + 31);
        this.types = [
            new models_1.ReportType('Asynchronous', 'async'),
            new models_1.ReportType('All', 'all'),
            new models_1.ReportType('Synchronous', 'sync')
        ];
        this.componentAlert = new models_2.Alert(null, true);
        var reportStatusAlert = this._appDataService.getReportMessage();
        if (reportStatusAlert != null) {
            this._utilityService.setAlert(this.componentAlert, reportStatusAlert.message);
        }
        // Initial methods
        this.loadReportsRest(false);
        this._appService.languageChangeForComponent(this, function () {
            _this.loadReportsRest(false);
        });
    };
    ReportManagementCmp.prototype.ngOnDestroy = function () {
        this._appDataService.destroyData();
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('dataTable'), 
        __metadata('design:type', primeng_1.DataTable)
    ], ReportManagementCmp.prototype, "dataTable", void 0);
    __decorate([
        core_1.ViewChild('globalFilter'), 
        __metadata('design:type', Object)
    ], ReportManagementCmp.prototype, "globalFilter", void 0);
    ReportManagementCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'reportManagement.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, reportManagement_service_1.ReportManagementService, ng2_translate_1.TranslateService, router_1.Router, app_service_1.AppService, appData_service_1.AppDataService, constants_1.Constants])
    ], ReportManagementCmp);
    return ReportManagementCmp;
}());
exports.ReportManagementCmp = ReportManagementCmp;
//# sourceMappingURL=reportManagement.cmp.js.map
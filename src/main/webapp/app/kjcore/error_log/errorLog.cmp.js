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
var router_1 = require('@angular/router');
var primeng_1 = require('primeng/primeng');
var ng2_translate_1 = require('ng2-translate');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var errorLog_service_1 = require('../error_log/errorLog.service');
var utility_service_1 = require('../shared/services/utility.service');
var app_service_1 = require('../shared/services/app.service');
var models_1 = require('../shared/models');
var ErrorLogCmp = (function () {
    /*--------- Constructor --------*/
    function ErrorLogCmp(_errorLogService, _utilityService, _router, _appService, _translateService, _changeDetectionRef) {
        this._errorLogService = _errorLogService;
        this._utilityService = _utilityService;
        this._router = _router;
        this._appService = _appService;
        this._translateService = _translateService;
        this._changeDetectionRef = _changeDetectionRef;
        this.validator = true;
        this.isLoading = false;
    }
    /*--------- App logic --------*/
    /**
     * Get dropdown lists data (list of errors and usernames)
     * @author Stefan Svrkota
     */
    ErrorLogCmp.prototype.getLogsInit = function () {
        var _this = this;
        if (!this._errorLogService.cmbErrorName && !this._errorLogService.cmbUsername && !this._errorLogService.cmbProcessType) {
            this.subscriptions['getLogsInit'] = this._errorLogService.getLogsInitRest().subscribe(function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].filterName == "errorName") {
                        _this._errorLogService.cmbErrorName = res.data[i].selectBoxList;
                    }
                    if (res.data[i].filterName == "username") {
                        _this._errorLogService.cmbUsername = res.data[i].selectBoxList;
                    }
                    if (res.data[i].filterName == "processType") {
                        _this._errorLogService.cmbProcessType = res.data[i].selectBoxList;
                    }
                }
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            });
        }
    };
    /**
     * Get filtered logs
     * @author Stefan Svrkota
     */
    ErrorLogCmp.prototype.getFilteredLogs = function (filter) {
        var _this = this;
        this.subscriptions['getFilteredLogs'] = this._errorLogService.getFilteredLogsRest(filter).subscribe(function (res) {
            _this.logs = res.data;
            _this.globalFilter.nativeElement.value = "";
            _this.errorLogDataTable.reset();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Validate filters
     * @author Stefan Svrkota
     */
    ErrorLogCmp.prototype.validateFilter = function () {
        var _this = this;
        setTimeout(function () {
            if ((_this._errorLogService.errorLogForm.value.filterDateFrom && _this._errorLogService.errorLogForm.value.filterDateTo) &&
                (_this._errorLogService.errorLogForm.value.filterDateFrom > _this._errorLogService.errorLogForm.value.filterDateTo)) {
                _this.validator = true;
            }
            else if ((_this._errorLogService.errorLogForm.value.filterDateFrom && _this._errorLogService.errorLogForm.value.filterDateTo) ||
                _this._errorLogService.errorLogForm.value.filterErrorName) {
                _this.validator = false;
            }
            else {
                _this.validator = true;
            }
        });
    };
    /**
     * Clear form
     * @author Stefan Svrkota
     */
    ErrorLogCmp.prototype.clearFilter = function () {
        this._errorLogService.errorLogForm.reset();
        this.validateFilter();
    };
    /**
     * Clear field
     * @author Kirey
     */
    ErrorLogCmp.prototype.clearField = function (fieldName) {
        this._errorLogService.errorLogForm.controls[fieldName].reset();
        this.validateFilter();
    };
    /**
     * Submit log filter
     * @author Stefan Svrkota
     */
    ErrorLogCmp.prototype.submitErrorLogForm = function (form) {
        var filterDateTo, filterDateFrom, filterDateFromMiliseconds, filterDateToMiliseconds, filterErrorName, filterUsername, filterProcessType, keys, values, filter;
        if (form.value.filterDateFrom != null) {
            filterDateFrom = new Date(form.value.filterDateFrom);
            filterDateFromMiliseconds = {
                key: null,
                name: filterDateFrom.getTime()
            };
        }
        else {
            filterDateFrom = new Date("01/01/1970");
            filterDateFromMiliseconds = {
                key: null,
                name: filterDateFrom.getTime()
            };
        }
        if (form.value.filterDateTo != null) {
            filterDateTo = new Date(form.value.filterDateTo);
            filterDateToMiliseconds = {
                key: null,
                name: filterDateTo.getTime()
            };
        }
        else {
            filterDateTo = new Date();
            filterDateToMiliseconds = {
                key: null,
                name: filterDateTo.getTime()
            };
        }
        filterErrorName = form.value.filterErrorName;
        filterUsername = form.value.filterUsername;
        filterProcessType = form.value.filterProcessType;
        keys = ["combobox.date.from.thrownDate", "combobox.date.to.thrownDate", "errorName", "username", "processType"];
        values = [filterDateFromMiliseconds, filterDateToMiliseconds, filterErrorName, filterUsername, filterProcessType];
        filter = [];
        for (var i = 0; i < 5; i++) {
            if (values[i]) {
                filter.push({
                    "filterName": keys[i],
                    "selectBoxList": [
                        values[i]
                    ]
                });
            }
        }
        this.errorLogDataTable.paginate({ first: 0, rows: this._errorLogService.pageRow.rows });
        this.getFilteredLogs(filter);
    };
    /**
     * Event method when data table changes (page or size)
     * @author Stefan Svrkota
     */
    ErrorLogCmp.prototype.changePage = function (event) {
        this._errorLogService.pageRow = this._utilityService.copy(event);
    };
    /**
     * Get log tracer by id
     * @author Stefan Svrkota
     */
    ErrorLogCmp.prototype.selectErrorLog = function (event) {
        this._errorLogService.logs = this._utilityService.copy(this.logs);
        this.selectedErrorLog = event.data;
        this.getLogById(event.data.id);
    };
    /**
     * Get all logs in list
     * @author Stefan Svrkota
     */
    ErrorLogCmp.prototype.getLogById = function (id) {
        var _this = this;
        this.subscriptions['getLogById'] = this._errorLogService.getLogByIdRest(id).subscribe(function (res) {
            _this.trace = _this.formatLogMessage(res.data.trace);
            _this.showSingleErrorLogModal();
        }, function (err) {
            _this.trace = null;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    ErrorLogCmp.prototype.showSingleErrorLogModal = function () {
        this.errorLogModal.show();
    };
    ErrorLogCmp.prototype.closeSingleErrorLogModal = function () {
        this.errorLogModal.hide();
    };
    /**
     * Format trace message
     * @author Kirey
     */
    ErrorLogCmp.prototype.formatLogMessage = function (message) {
        var tempMessage = message.replace(/(\r\n|\n|\r)/gm, "<br>");
        tempMessage = tempMessage.split('<br>');
        tempMessage.pop();
        for (var i in tempMessage) {
            var tempLineSecondSection = tempMessage[i].split("(");
            if (tempLineSecondSection[1]) {
                tempLineSecondSection[0] = '<div class="trace_row"><span class="method">' + tempLineSecondSection[0] + '</span><span class="code_trace">';
                tempLineSecondSection[1] += '</span></div>';
            }
            else {
                tempLineSecondSection[0] = '<div class="trace_row trace_start"><span class="code_trace">' + tempLineSecondSection[0] + '</span></div>';
            }
            tempMessage[i] = tempLineSecondSection.join('(');
        }
        return tempMessage.join("");
    };
    /**
     * Cause exception on backend and store into DB as new exception
     * @author Kirey
     */
    ErrorLogCmp.prototype.causeException = function () {
        var _this = this;
        this.loadingState = true;
        this._errorLogService.causeExceptionRest().subscribe(function (res) { }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /*--------- NgOnInit --------*/
    ErrorLogCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        // Variable initialization
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        this.maxDate = new Date();
        this.logs = this._errorLogService.logs;
        this.context = this;
        this.errorLogDataTable.paginate(this._errorLogService.pageRow);
        // Initial methods
        this.getLogsInit();
        this.validateFilter();
        this._appService.languageChangeForComponent(this);
    };
    ErrorLogCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('errorLogDataTable'), 
        __metadata('design:type', primeng_1.DataTable)
    ], ErrorLogCmp.prototype, "errorLogDataTable", void 0);
    __decorate([
        core_1.ViewChild('singleErrorLogModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ErrorLogCmp.prototype, "errorLogModal", void 0);
    __decorate([
        core_1.ViewChild('globalFilter'), 
        __metadata('design:type', Object)
    ], ErrorLogCmp.prototype, "globalFilter", void 0);
    ErrorLogCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'errorLog.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [errorLog_service_1.ErrorLogService, utility_service_1.UtilityService, router_1.Router, app_service_1.AppService, ng2_translate_1.TranslateService, core_1.ChangeDetectorRef])
    ], ErrorLogCmp);
    return ErrorLogCmp;
}());
exports.ErrorLogCmp = ErrorLogCmp;
//# sourceMappingURL=errorLog.cmp.js.map
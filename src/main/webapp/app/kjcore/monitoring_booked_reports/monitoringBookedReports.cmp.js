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
var utility_service_1 = require('../shared/services/utility.service');
var app_service_1 = require('../shared/services/app.service');
var monitoringBookedReports_service_1 = require('./monitoringBookedReports.service');
var lazyLoadDropdown_cmp_1 = require('../shared/components/lazyLoadDropdown/lazyLoadDropdown.cmp');
var models_1 = require('../shared/models');
var constants_1 = require("./../constants");
var MonitoringBookedReportsCmp = (function () {
    /*--------- Constructor --------*/
    function MonitoringBookedReportsCmp(_monBookedRepService, _utilityService, _router, _appService, _translateService, _changeDetectionRef, _constants) {
        this._monBookedRepService = _monBookedRepService;
        this._utilityService = _utilityService;
        this._router = _router;
        this._appService = _appService;
        this._translateService = _translateService;
        this._changeDetectionRef = _changeDetectionRef;
        this._constants = _constants;
        this.validator = true;
        this.isLoading = false;
    }
    /*--------- App logic --------*/
    /**
     * Get dropdown lists data (list of companies and usernames)
     * @author Ciprian Dorofte
     */
    MonitoringBookedReportsCmp.prototype.getBookedRepFiltersInit = function () {
        var _this = this;
        if (!this._monBookedRepService.cmbCompany && !this._monBookedRepService.cmbUsername) {
            this.subscriptions['getBookedRepFiltersInit'] = this._monBookedRepService.getBookedRepFiltersInitRest().subscribe(function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].filterName == "company") {
                        _this._monBookedRepService.cmbCompany = res.data[i].selectBoxList;
                    }
                    if (res.data[i].filterName == "user") {
                        _this._monBookedRepService.cmbUsername = res.data[i].selectBoxList;
                    }
                }
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            });
        }
    };
    /**
     * Get filtered booked reports
     * @author Ciprian Dorofte
     */
    MonitoringBookedReportsCmp.prototype.getFilteredBookedReports = function (filter) {
        var _this = this;
        this.subscriptions['getFilteredBookedReports'] = this._monBookedRepService.getFilteredBookedReportsRest(filter).subscribe(function (res) {
            _this.reportList = res.data;
            _this.globalFilter.nativeElement.value = "";
            _this.monBookedRepDataTable.reset();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Download report file
     * @author Ciprian Dorofte
     */
    MonitoringBookedReportsCmp.prototype.downloadReportFile = function (report, newWindow) {
        var _this = this;
        var contentType;
        if (report.format.toLowerCase() == 'pdf') {
            contentType = 'application/pdf';
        }
        else {
            contentType = 'application/vnd.ms-excel';
        }
        this.subscriptions['getBookedReportFileByIdRest'] = this._monBookedRepService.getBookedReportFileByIdRest(report.id).subscribe(function (res) {
            var blob = _this._appService.convertBase64ToBlob(res.data, contentType);
            if (newWindow) {
                var fileURL = URL.createObjectURL(blob);
                window.open(fileURL);
            }
            else {
                saveAs(blob, report.reportName + (contentType == 'application/pdf' ? '.pdf' : '.xlsx'));
                _this._utilityService.setAlert(_this.componentAlert, 'fe.monitoringBookedReports.bookedReportDownloaded');
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Submit monitoring booked reports filters
     * @author Ciprian Dorofte
     */
    MonitoringBookedReportsCmp.prototype.submitMonBookedRepForm = function (form) {
        var filterDateTo, filterDateFrom, filterDateFromMiliseconds, filterDateToMiliseconds, filterCompany, filterUsername, keys, values, filter;
        var today = new Date();
        if (form.value.filterDateFrom != null) {
            filterDateFrom = new Date(form.value.filterDateFrom);
            filterDateFrom.setHours(today.getHours(), today.getMinutes(), today.getSeconds());
            filterDateFromMiliseconds = {
                key: null,
                name: filterDateFrom.getTime()
            };
        }
        else {
            filterDateFrom = new Date("01/01/1970");
            filterDateFrom.setHours(today.getHours(), today.getMinutes(), today.getSeconds());
            filterDateFromMiliseconds = {
                key: null,
                name: filterDateFrom.getTime()
            };
        }
        if (form.value.filterDateTo != null) {
            filterDateTo = new Date(form.value.filterDateTo);
            filterDateTo.setHours(today.getHours(), today.getMinutes(), today.getSeconds());
            filterDateToMiliseconds = {
                key: null,
                name: filterDateTo.getTime()
            };
        }
        else {
            filterDateTo = today;
            filterDateToMiliseconds = {
                key: null,
                name: filterDateTo.getTime()
            };
        }
        filterCompany = form.value.filterCompany;
        filterUsername = form.value.filterUsername;
        keys = ["combobox.date.from.bookedDate", "combobox.date.to.bookedDate", "company", "user"];
        values = [filterDateFromMiliseconds, filterDateToMiliseconds, filterCompany, filterUsername];
        filter = [];
        for (var i = 0; i < 4; i++) {
            if (values[i]) {
                filter.push({
                    "filterName": keys[i],
                    "selectBoxList": [
                        values[i]
                    ]
                });
            }
        }
        this.monBookedRepDataTable.paginate({ first: 0, rows: this._monBookedRepService.pageRow.rows });
        this.getFilteredBookedReports(filter);
    };
    /**
     * Validate filters
     * @author Ciprian Dorofte
     */
    MonitoringBookedReportsCmp.prototype.validateFilter = function (filterName) {
        var _this = this;
        setTimeout(function () {
            if (filterName == 'filterCompany') {
                _this._monBookedRepService.cmbUsername = null;
                _this.usersLazyDropDown.clearInput();
                var filterCompany = _this._monBookedRepService.monBookedRepForm.controls['filterCompany'];
                if (filterCompany.value) {
                    _this.subscriptions['getUsersFilterRest'] = _this._monBookedRepService.getUsersFilterRest(filterCompany.value.key).subscribe(function (res) {
                        _this._monBookedRepService.cmbUsername = res.data.selectBoxList;
                        _this.disabledUserFilter = false;
                    }, function (err) {
                        _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
                    });
                }
                else {
                    _this.disabledUserFilter = true;
                }
            }
            if (_this.isSuperAdmin) {
                if ((_this._monBookedRepService.monBookedRepForm.value.filterDateFrom && _this._monBookedRepService.monBookedRepForm.value.filterDateTo) &&
                    (_this._monBookedRepService.monBookedRepForm.value.filterDateFrom <= _this._monBookedRepService.monBookedRepForm.value.filterDateTo) &&
                    _this._monBookedRepService.monBookedRepForm.value.filterCompany) {
                    _this.validator = false;
                }
                else {
                    _this.validator = true;
                }
            }
            else {
                if ((_this._monBookedRepService.monBookedRepForm.value.filterDateFrom && _this._monBookedRepService.monBookedRepForm.value.filterDateTo) &&
                    (_this._monBookedRepService.monBookedRepForm.value.filterDateFrom <= _this._monBookedRepService.monBookedRepForm.value.filterDateTo)) {
                    _this.validator = false;
                }
                else {
                    _this.validator = true;
                }
            }
        });
    };
    /**
     * Clear form
     * @author Ciprian Dorofte
     */
    MonitoringBookedReportsCmp.prototype.clearFilter = function () {
        this._monBookedRepService.monBookedRepForm.reset();
        this.companiesLazyDropDown.clearInput();
        this.usersLazyDropDown.clearInput();
        this.validateFilter();
    };
    /**
     * Clear field
     * @author Ciprian Dorofte
     */
    MonitoringBookedReportsCmp.prototype.clearField = function (fieldName) {
        this._monBookedRepService.monBookedRepForm.controls[fieldName].reset();
        this.validateFilter();
    };
    /**
     * Event method when data table changes (page or size)
     * @author Ciprian Dorofte
     */
    MonitoringBookedReportsCmp.prototype.changePage = function (event) {
        this._monBookedRepService.pageRow = this._utilityService.copy(event);
    };
    /*--------- NgOnInit --------*/
    MonitoringBookedReportsCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        // Variable initialization
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        this.maxDate = new Date();
        this.context = this;
        this.monBookedRepDataTable.paginate(this._monBookedRepService.pageRow);
        this.disabledUserFilter = false;
        this.isCompanyFilter = false;
        this.isUsernameFilter = false;
        this.isAdmin = this._appService.isAuthorised(this._constants.getROLES().ADMIN);
        this.isSuperAdmin = this._appService.isAuthorised(this._constants.getROLES().SUPER_ADMIN);
        this.isSubAdmin = this._appService.isAuthorised(this._constants.getROLES().SUBADMIN);
        // Initial methods
        this.getBookedRepFiltersInit();
        this.validateFilter();
        this._appService.languageChangeForComponent(this);
        if (this.isSuperAdmin) {
            this.isCompanyFilter = true;
            this.isUsernameFilter = true;
            this.disabledUserFilter = true;
        }
        else if (this.isAdmin || this.isSubAdmin) {
            this.isUsernameFilter = true;
        }
    };
    MonitoringBookedReportsCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('companiesLazyDropDown'), 
        __metadata('design:type', lazyLoadDropdown_cmp_1.LazyLoadDropdownCmp)
    ], MonitoringBookedReportsCmp.prototype, "companiesLazyDropDown", void 0);
    __decorate([
        core_1.ViewChild('usersLazyDropDown'), 
        __metadata('design:type', lazyLoadDropdown_cmp_1.LazyLoadDropdownCmp)
    ], MonitoringBookedReportsCmp.prototype, "usersLazyDropDown", void 0);
    __decorate([
        core_1.ViewChild('monBookedRepDataTable'), 
        __metadata('design:type', primeng_1.DataTable)
    ], MonitoringBookedReportsCmp.prototype, "monBookedRepDataTable", void 0);
    __decorate([
        core_1.ViewChild('globalFilter'), 
        __metadata('design:type', Object)
    ], MonitoringBookedReportsCmp.prototype, "globalFilter", void 0);
    MonitoringBookedReportsCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'monitoringBookedReports.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [monitoringBookedReports_service_1.MonitoringBookedReportsService, utility_service_1.UtilityService, router_1.Router, app_service_1.AppService, ng2_translate_1.TranslateService, core_1.ChangeDetectorRef, constants_1.Constants])
    ], MonitoringBookedReportsCmp);
    return MonitoringBookedReportsCmp;
}());
exports.MonitoringBookedReportsCmp = MonitoringBookedReportsCmp;
//# sourceMappingURL=monitoringBookedReports.cmp.js.map
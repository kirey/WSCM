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
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var utility_service_1 = require('../shared/services/utility.service');
var MonitoringBookedReportsService = (function () {
    function MonitoringBookedReportsService(_http, _formBuilder) {
        this._http = _http;
        this._formBuilder = _formBuilder;
        this.baseUrl = 'rest/reports/';
        this.monBookedRepForm = this._formBuilder.group({
            filterDateFrom: new forms_1.FormControl(null, []),
            filterDateTo: new forms_1.FormControl(null, []),
            filterCompany: new forms_1.FormControl(null, []),
            filterUsername: new forms_1.FormControl(null, [])
        });
        this.pageRow = { first: 0, rows: 10 };
    }
    /**
     * Rest call for getting booked report file by id
     * @author Ciprian Dorofte
     */
    MonitoringBookedReportsService.prototype.getBookedReportFileByIdRest = function (bookedReportId) {
        return this._http.get(this.baseUrl + 'book/print/' + bookedReportId)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest get all comboboxes filters
     * @author Ciprian Dorofte
     */
    MonitoringBookedReportsService.prototype.getBookedRepFiltersInitRest = function () {
        return this._http.get(this.baseUrl + 'book/populateBookedReportsFilters')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest get users combox filter
     * @author Ciprian Dorofte
     */
    MonitoringBookedReportsService.prototype.getUsersFilterRest = function (companyId) {
        return this._http.get(this.baseUrl + 'populateUsersFilter?company=' + companyId)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest get filtered booked reports
     * @author Ciprian Dorofte
     */
    MonitoringBookedReportsService.prototype.getFilteredBookedReportsRest = function (filter) {
        var encodedFilter = encodeURI(JSON.stringify(filter));
        return this._http.get(this.baseUrl + 'book/allFilteredBooked?filterMap=' + encodedFilter)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    MonitoringBookedReportsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder])
    ], MonitoringBookedReportsService);
    return MonitoringBookedReportsService;
}());
exports.MonitoringBookedReportsService = MonitoringBookedReportsService;
//# sourceMappingURL=monitoringBookedReports.service.js.map
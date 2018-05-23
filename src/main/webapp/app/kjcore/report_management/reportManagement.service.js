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
var utility_service_1 = require('../shared/services/utility.service');
var ReportManagementService = (function () {
    /*--------- Constructor --------*/
    function ReportManagementService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/reports';
    }
    /**
     * Get filtered reports from database.
     * @author Mario Petrovic
     */
    ReportManagementService.prototype.getReports = function () {
        return this._http.get(this.baseUrl)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Save a report into database for later use.
     * @author Kirey
     */
    ReportManagementService.prototype.addBooking = function (booking) {
        return this._http.put(this.baseUrl + '/book?pageId=reportManagement', JSON.stringify(booking))
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Print a report.
     * @author Kirey
     */
    ReportManagementService.prototype.printReport = function (reportData) {
        var url = this.baseUrl + '/' + reportData.format + '/inline?pageId=' + reportData.pageId;
        return this._http.put(url, reportData.report)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * REST - delete choosen report
     * @author Mario Petrovic
     */
    ReportManagementService.prototype.deleteReport = function (reportId) {
        return this._http.delete(this.baseUrl + '/' + reportId + '?pageId=reportManagement')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest POST call for report status update
     * @author Stefan Svrkota
     */
    ReportManagementService.prototype.updateReportStatus = function (reportStatus, reportId) {
        return this._http.post(this.baseUrl + '/status/' + reportId +
            this._utilityService.generateQueryParams({
                enabled: reportStatus,
                pageId: 'reportManagement'
            }), null)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call that retrieve unavailable dates for a report
     * @author Ciprian Dorofte
     */
    ReportManagementService.prototype.getUnavailableDatesRest = function (reportId) {
        return this._http.get(this.baseUrl + '/book/' + reportId).
            map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call that retrieve unavailable dates for a report
     * @author Ciprian Dorofte
     */
    ReportManagementService.prototype.getDependencyFilteredList = function (dependencyValueId, dependentId) {
        return this._http.get(this.baseUrl + '/populateDropdownParameter' + this._utilityService.generateQueryParams({
            dependencyValueId: dependencyValueId,
            dependentId: dependentId
        })).map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    ReportManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], ReportManagementService);
    return ReportManagementService;
}());
exports.ReportManagementService = ReportManagementService;
//# sourceMappingURL=reportManagement.service.js.map
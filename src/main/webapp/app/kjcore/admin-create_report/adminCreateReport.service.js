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
var AdminCreateReportService = (function () {
    function AdminCreateReportService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/reports';
    }
    /**
     * Create new report with given data
     * @author Mario Petrovic
     */
    AdminCreateReportService.prototype.createReport = function (reportData, override) {
        return this._http.post(this.baseUrl + '?pageId=reportManagement&checked=' + override, reportData)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Create new report with given data
     * @author Mario Petrovic
     */
    AdminCreateReportService.prototype.updateReport = function (reportProfile) {
        return this._http.post(this.baseUrl + '/edited?pageId=reportManagement', reportProfile)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Get report by id
     * @author Mario Petrovic
     */
    AdminCreateReportService.prototype.getReportById = function (id) {
        return this._http.get(this.baseUrl + '/' + id +
            this._utilityService.generateQueryParams({
                pageId: 'reportManagement'
            }))
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Get tables
     * @author Nikola Gavric
     */
    AdminCreateReportService.prototype.getAllTables = function () {
        return this._http.get(this.baseUrl + '/tables')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Get columns for table
     * @author Nikola Gavric
     */
    AdminCreateReportService.prototype.getAllColumns = function (tableName) {
        return this._http.get(this.baseUrl + '/tables/columns?tableName=' + encodeURIComponent(tableName))
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call for all roles
     * @author Stefan Svrkota
     */
    AdminCreateReportService.prototype.getRolesRest = function () {
        return this._http.get(this.baseUrl + '/roles')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest DELETE call for deleting
     * validation class of report
     * @author Nikola Gavric
     */
    AdminCreateReportService.prototype.deleteValidationClassByReportId = function (reportId) {
        return this._http.delete(this.baseUrl + "/validationClass/" + reportId)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call for all existing
     * validation classes
     * @author Nikola Gavric
     */
    AdminCreateReportService.prototype.getValidationClasses = function () {
        return this._http.get(this.baseUrl + '/classes')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Loading all filtered companies
     * based on logged in user role
     * @author Nikola Gavric
     */
    AdminCreateReportService.prototype.getAvailableCompanies = function () {
        return this._http.get(this.baseUrl + '/company')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    AdminCreateReportService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], AdminCreateReportService);
    return AdminCreateReportService;
}());
exports.AdminCreateReportService = AdminCreateReportService;
//# sourceMappingURL=adminCreateReport.service.js.map
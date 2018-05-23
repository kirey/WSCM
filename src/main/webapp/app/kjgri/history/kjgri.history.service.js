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
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var KJGriHistoryService = (function () {
    function KJGriHistoryService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/history/clients';
    }
    /**
     * GET Call - Returns client companies
     * @author Nikola Gavric
     */
    KJGriHistoryService.prototype.getClientCompanies = function () {
        return this._http.get(this.baseUrl + '/clientCompanies')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET Call - Returns all styles for indexes
     * @author Nikola Gavric
     */
    KJGriHistoryService.prototype.getAllStyles = function (selectedModuleFlag) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/styles', {
            rfFlag: selectedModuleFlag.toUpperCase()
        });
        return this._utilityService.getRequest(url);
    };
    /**
     * GET Call - Returns company locations based on a company id
     * @author Nikola Gavric
     */
    KJGriHistoryService.prototype.getCompanyLocations = function (company) {
        var companyIdString = '';
        if (company)
            companyIdString = '?clientCompanyId=' + company.id;
        return this._http.get(this.baseUrl + '/clientLocations' + companyIdString)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET Call - Returns alerts based on a location id
     * @author Nikola Gavric
     */
    KJGriHistoryService.prototype.getCompanyAlerts = function (location, dateFrom, dateTo) {
        var dateFromString = '';
        var dateToString = '';
        var locationIdString = '';
        if (dateFrom)
            dateFromString = '&dateFrom=' + dateFrom.getTime();
        if (dateTo)
            dateToString = '&dateTo=' + dateTo.getTime();
        if (location)
            locationIdString = '&locationId=' + location.id;
        var url = this.baseUrl + '/locationAlerts?' + dateFromString + dateToString + locationIdString;
        return this._http.get(url)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET Call - Returns base64 of all PDF's found
     * @author Nikola Gavric
     */
    KJGriHistoryService.prototype.getPDFs = function (locationId, dateFrom, dateTo) {
        var dateFromString = '';
        var dateToString = '';
        if (dateFrom)
            dateFromString = '&dateFrom=' + dateFrom.getTime();
        if (dateTo)
            dateToString = '&dateTo=' + dateTo.getTime();
        var url = this.baseUrl + '/plans?locationId=' + locationId + dateFromString + dateToString;
        return this._http.get(url)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET Call - Returns risk indexes based on a location id and risk subtype id
     * @author Nikola Gavric
     */
    KJGriHistoryService.prototype.getRiskIndexes = function (locationId, dateFrom, dateTo) {
        var dateFromString = '';
        var dateToString = '';
        if (dateFrom)
            dateFromString = '&dateFrom=' + dateFrom.getTime();
        if (dateTo)
            dateToString = '&dateTo=' + dateTo.getTime();
        var url = this.baseUrl + '/riskIndexes?locationId=' + locationId + dateFromString + dateToString;
        return this._http.get(url)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET Call - Returns forecast indexes based on a location id and risk subtype id
     * @author Nikola Gavric
     */
    KJGriHistoryService.prototype.getForecast = function (locationId, dateFrom, dateTo) {
        var dateFromString = '';
        var dateToString = '';
        if (dateFrom)
            dateFromString = '&dateFrom=' + dateFrom.getTime();
        if (dateTo)
            dateToString = '&dateTo=' + dateTo.getTime();
        var url = this.baseUrl + '/forecastIndexes?locationId=' + locationId + dateFromString + dateToString;
        return this._http.get(url)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    KJGriHistoryService.prototype.getAllRisks = function () {
        return this._http.get(this.baseUrl + '/initialized')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Call for preview of an object
     * @author Nikola Gavric
     */
    KJGriHistoryService.prototype.previewObject = function (id, type) {
        if (type == 'pdf') {
            return this._http.get(this.baseUrl + '/planDocument?id=' + id, [])
                .map(utility_service_1.UtilityService.handleSuccess)
                .catch(utility_service_1.UtilityService.handleError);
        }
    };
    KJGriHistoryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], KJGriHistoryService);
    return KJGriHistoryService;
}());
exports.KJGriHistoryService = KJGriHistoryService;
//# sourceMappingURL=kjgri.history.service.js.map
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
/**
 * Service for Home page component
 * @author Mario Petrovic
 */
var KJGriHomeService = (function () {
    function KJGriHomeService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/admin/home';
        this.nominaticAddressSearchBaseUrl = 'http://nominatim.openstreetmap.org/search';
    }
    /* --------------- GET --------------- */
    /**
     * GET - Retrieve risks based on type
     * @author Mario Petrovic
     */
    KJGriHomeService.prototype.getRisksByType = function (type) {
        var url = 'rest/client/risks/subrisks/' + type;
        return this._utilityService.getRequest(url);
    };
    /**
     * GET - Retrieves list of clinet companies filtered by name
     * @author Mario Petrovic
     */
    KJGriHomeService.prototype.getFilteredClientCompanies = function (searchName) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/clientCompanies', {
            companyName: searchName
        });
        return this._utilityService.getRequest(url);
    };
    /**
     * GET - Retrieves list of clinet locations based on search criterias
     * @author Mario Petrovic
     */
    KJGriHomeService.prototype.getClientLocations = function (searchData) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/clientLocations', searchData);
        return this._utilityService.getRequest(url);
    };
    /**
     * GET - Retrieves list of clinet locations based on search criterias
     * @author Mario Petrovic
     */
    KJGriHomeService.prototype.getGeolocations = function (searchData) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, searchData);
        return this._utilityService.getRequest(url);
    };
    /**
     * GET - Retrieves list of risks for chosen spot on the map
     * @author Mario Petrovic
     */
    KJGriHomeService.prototype.getAllRiskIndexesForLocation = function (data) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/geolocations', {
            istat: data['istat'],
            sub: data['sub'],
            targetTimestamp: data['timestamp'],
            longitude: data['longitude'],
            latitude: data['latitude'],
            typeId: data['typeId'],
            rfFlag: data['rfFlag']
        });
        return this._utilityService.getRequest(url);
    };
    /**
     * GET - Retrieves list of locations for company of the loggedin user
     * @author Mario Petrovic
     */
    KJGriHomeService.prototype.getClientLocationsByContext = function (searchData) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/locations', searchData);
        return this._utilityService.getRequest(url);
    };
    /**
     * GET - Retrieves list of risks for choosen company location
     * @author Mario Petrovic
     */
    KJGriHomeService.prototype.getAllRiskIndexesForCompanyLocation = function (data) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/client/locations', {
            companyLocationId: data['companyLocationId'],
            targetTimestamp: data['targetTimestamp'],
            typeId: data['typeId'],
            rfFlag: data['rfFlag']
        });
        return this._utilityService.getRequest(url);
    };
    /**
     * GET - Retrieves list of risk history for location
     * @author Mario Petrovic
     */
    KJGriHomeService.prototype.getRiskHistory = function (locationId, typeId, rfFlag) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/history', {
            locationId: locationId,
            typeId: typeId,
            rfFlag: rfFlag
        });
        return this._utilityService.getRequest(url);
    };
    /**
     * GET - Retrieves list of risk history for selected location from the map
     * @author Mario Petrovic
     */
    KJGriHomeService.prototype.getRiskHistoryForLocation = function (searchData) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/geolocationHistory', {
            istat: searchData.istat,
            sub: searchData.sub,
            typeId: searchData.typeId,
            rfFlag: searchData.rfFlag,
            longitude: searchData.longitude,
            latitude: searchData.latitude
        });
        return this._utilityService.getRequest(url);
    };
    /**
     * GET - Retrieves list of risk index styles
     * @author Mario Petrovic
     */
    KJGriHomeService.prototype.getRiskIndexStypes = function (searchData) {
        var url = this._utilityService.generateUrlWithQueryParams('rest/history/clients/styles', searchData);
        return this._utilityService.getRequest(url);
    };
    /**
     * GET - Retrieves measurement types
     * @author Mario Petrovic
     */
    KJGriHomeService.prototype.getMeasurementTypes = function () {
        return this._utilityService.getRequest(this.baseUrl + '/measureType');
    };
    /**
     * Searches the external server for results
     * Must not exceed https://operations.osmfoundation.org/policies/nominatim/ usage
     *
     * @param data any
     * @author Nikola Gavric
     */
    KJGriHomeService.prototype.searchAddress = function (data) {
        var url = this._utilityService.generateUrlWithQueryParams(this.nominaticAddressSearchBaseUrl, {
            q: data,
            format: 'json',
            dedupe: 1,
            polygon_geojson: 1,
            addressdetails: 1,
            limit: 10
        });
        return this._http.get(url)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET call to return min and max date
     * for date picker under the map.
     *
     * @author Nikola Gavric
     */
    KJGriHomeService.prototype.getMinAndMaxDates = function () {
        return this._utilityService.getRequest(this.baseUrl + '/minMax');
    };
    KJGriHomeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], KJGriHomeService);
    return KJGriHomeService;
}());
exports.KJGriHomeService = KJGriHomeService;
//# sourceMappingURL=kjgri.home.service.js.map
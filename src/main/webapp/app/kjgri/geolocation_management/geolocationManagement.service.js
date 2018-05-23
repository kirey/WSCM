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
 * Service for geolocation management component
 * @author Nikola Gavric
 */
var GeolocationManagementService = (function () {
    /* --------------- Constructor --------------- */
    function GeolocationManagementService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/admin/geolocations';
    }
    /* --------------- GET --------------- */
    /**
     * GET - retrieves geolocation by search parameters and pagination
     * @author Mario Petrovic
     */
    GeolocationManagementService.prototype.getAllGeolocations = function (istat) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/near', {
            istat: istat
        });
        return this._utilityService.getRequest(url);
    };
    /**
     * GET - retrieves geolocation as polygons for map drawing
     * @author Mario Petrovic
     */
    GeolocationManagementService.prototype.getMapGeolocations = function (geolocationSearchData) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/draw', geolocationSearchData);
        return this._utilityService.getRequest(url);
    };
    /**
     * GET - retrieves geolocation by coordinates picked from the map or inputed in the form
     * @author Mario petrovic
     */
    GeolocationManagementService.prototype.getGeolocationByCoordinates = function (geolocationInfo) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/geolocation', geolocationInfo);
        return this._utilityService.getRequest(url);
    };
    GeolocationManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], GeolocationManagementService);
    return GeolocationManagementService;
}());
exports.GeolocationManagementService = GeolocationManagementService;
//# sourceMappingURL=geolocationManagement.service.js.map
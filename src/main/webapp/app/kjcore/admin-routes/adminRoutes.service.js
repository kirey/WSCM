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
require('rxjs/add/operator/map');
var utility_service_1 = require('../shared/services/utility.service');
var AdminRoutesService = (function () {
    /* --------------- Constructor --------------- */
    function AdminRoutesService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/adminRoute';
        this.pageId = 'routes';
    }
    /* --------------- GET --------------- */
    /**
     * Rest GET call for all routes
     * @author Stefan Svrkota
     */
    AdminRoutesService.prototype.getRoutesRest = function () {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: this.pageId
        });
        return this._utilityService.getRequest(url);
    };
    /**
     * Rest GET call for all roles
     * @author Stefan Svrkota
     */
    AdminRoutesService.prototype.getRolesRest = function () {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + "/roles", {
            pageId: this.pageId
        });
        return this._utilityService.getRequest(url);
    };
    /* --------------- POST --------------- */
    /**
     * Rest POST call for route adding
     * @author Stefan Svrkota
     */
    AdminRoutesService.prototype.postRouteRest = function (route) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: this.pageId
        });
        return this._utilityService.postRequest(url, route);
    };
    /* --------------- PUT --------------- */
    /**
     * Rest PUT call for route editing
     * @author Stefan Svrkota
     */
    AdminRoutesService.prototype.editRouteRest = function (route) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: this.pageId
        });
        return this._utilityService.putRequest(url, route);
    };
    /* --------------- DELETE --------------- */
    /**
     * Rest POST call for route deleting
     * @author Stefan Svrkota
     */
    AdminRoutesService.prototype.deleteRouteRest = function (routeId) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + "/" + routeId, {
            pageId: this.pageId
        });
        return this._utilityService.deleteRequest(url);
    };
    AdminRoutesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], AdminRoutesService);
    return AdminRoutesService;
}());
exports.AdminRoutesService = AdminRoutesService;
//# sourceMappingURL=adminRoutes.service.js.map
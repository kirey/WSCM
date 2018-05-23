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
var PlaceholderManagementService = (function () {
    function PlaceholderManagementService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/admin/placeholders';
    }
    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    PlaceholderManagementService.prototype.getAllPlaceholders = function () {
        return this._http.get(this.baseUrl + '/default')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST Call for creating an alert
     * @author Nikola Gavric
     */
    PlaceholderManagementService.prototype.createPlaceholder = function (data) {
        return this._http.post(this.baseUrl + '?pageId=placeholders', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT Call for updating an alert
     * @author Nikola Gavric
     */
    PlaceholderManagementService.prototype.updatePlaceholder = function (data) {
        return this._http.put(this.baseUrl + '?pageId=placeholders', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Create/Update call for alerts
     * @author Nikola Gavric
     */
    PlaceholderManagementService.prototype.createOrUpdatePlaceholder = function (data) {
        if (data.id)
            return this.updatePlaceholder(data);
        else
            return this.createPlaceholder(data);
    };
    /**
     * DELETE Call for removing an alert
     * @author Nikola Gavric
     */
    PlaceholderManagementService.prototype.removePlaceholder = function (data) {
        return this._http.delete(this.baseUrl + '/' + data.id + '?pageId=placeholders')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    PlaceholderManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlaceholderManagementService);
    return PlaceholderManagementService;
}());
exports.PlaceholderManagementService = PlaceholderManagementService;
//# sourceMappingURL=kjgri.placeholder.service.js.map
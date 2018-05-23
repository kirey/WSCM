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
var MeasuredStyleService = (function () {
    function MeasuredStyleService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/admin/styles/measure';
    }
    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    MeasuredStyleService.prototype.getAllDicStyles = function () {
        return this._http.get(this.baseUrl)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    MeasuredStyleService.prototype.getAllMeasuredStyles = function (id) {
        return this._http.get(this.baseUrl + '/' + id)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST Call for creating an alert
     * @author Nikola Gavric
     */
    MeasuredStyleService.prototype.createMeasuredStyle = function (data, obj) {
        var id = null;
        if (obj)
            id = obj.id;
        return this._http.post(this.baseUrl + '/' + id + '?pageId=riskIndexStyles', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT Call for updating an alert
     * @author Nikola Gavric
     */
    MeasuredStyleService.prototype.updateMeasuredStyle = function (data) {
        return this._http.put(this.baseUrl + '?pageId=riskIndexStyles', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Create/Update call for alerts
     * @author Nikola Gavric
     */
    MeasuredStyleService.prototype.createOrUpdateMeasuredStyle = function (data, obj) {
        if (data.id)
            return this.updateMeasuredStyle(data);
        else
            return this.createMeasuredStyle(data, obj);
    };
    /**
     * DELETE Call for removing an alert
     * @author Nikola Gavric
     */
    MeasuredStyleService.prototype.removeMeasuredStyle = function (data) {
        return this._http.delete(this.baseUrl + '/' + data.id + '?pageId=riskIndexStyles')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    MeasuredStyleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MeasuredStyleService);
    return MeasuredStyleService;
}());
exports.MeasuredStyleService = MeasuredStyleService;
//# sourceMappingURL=kjgri.measured_style.service.js.map
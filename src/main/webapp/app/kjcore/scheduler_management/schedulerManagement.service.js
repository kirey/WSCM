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
var SchedulerManagementService = (function () {
    function SchedulerManagementService(_http) {
        this._http = _http;
        this._baseUrl = "rest/schedulerManagement";
    }
    /**
     * get all schedulers and their details
     * @author Roxana
     */
    SchedulerManagementService.prototype.getAllSchedulersRest = function () {
        return this._http.get(this._baseUrl)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * save or update scheduler
     * @author Roxana
     */
    SchedulerManagementService.prototype.saveOrUpdateSchedulerRest = function (pageId, scheduler) {
        return this._http.post(this._baseUrl + "?pageId=" + pageId, JSON.stringify(scheduler))
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * stop scheduler
     * @author Roxana
     */
    SchedulerManagementService.prototype.stopSchedulerRest = function (schedulerName) {
        return this._http.post(this._baseUrl + "/stopScheduler", { "schedulerName": schedulerName })
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * delete scheduler
     * @author Roxana
     */
    SchedulerManagementService.prototype.deleteSchedulerRest = function (schedulerName) {
        return this._http.delete(this._baseUrl + "/deleteScheduler/" + schedulerName)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * remove scheduler parameter
     * @author Roxana
     */
    SchedulerManagementService.prototype.removeParameterRest = function (schedulerName, paramId) {
        return this._http.delete(this._baseUrl + "/deleteParameters/" + schedulerName + "/" + paramId)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    SchedulerManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SchedulerManagementService);
    return SchedulerManagementService;
}());
exports.SchedulerManagementService = SchedulerManagementService;
//# sourceMappingURL=schedulerManagement.service.js.map
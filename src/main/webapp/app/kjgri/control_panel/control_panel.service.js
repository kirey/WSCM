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
var Observable_1 = require('rxjs/Observable');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var ControlPanelService = (function () {
    function ControlPanelService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/admin/controlPanel';
    }
    /**
     * Post call to load all given modules into cache
     *
     * @param modules string[]
     * @author Nikola Gavric
     */
    ControlPanelService.prototype.loadCache = function (modules) {
        return this._http.post(this.baseUrl + '/load', modules)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Post call to clear all modules from cache
     *
     * @param modules string[]
     * @author Nikola Gavric
     */
    ControlPanelService.prototype.clearCache = function (modules) {
        return this._http.post(this.baseUrl + '/clear', modules)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.refreshMemory = function () {
        return this._http.get(this.baseUrl + '/memoryUsage')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.currentModulesStatus = function () {
        return this._http.get(this.baseUrl + '/currentNumber')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.currentSFTPStatus = function () {
        return this._http.get(this.baseUrl + '/download/counter')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.currentDBStatus = function () {
        return this._http.get(this.baseUrl + '/currentNumber')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.runGC = function () {
        return this._http.get(this.baseUrl + '/gc')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     *
     * @param sftp string[]
     * @author Nikola Gavric
     */
    ControlPanelService.prototype.downloadSFTP = function (sftp) {
        return this._http.post(this.baseUrl + '/download', sftp)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     *
     * @param minutes number
     * @author Nikola Gavric
     */
    ControlPanelService.prototype.updateAlert = function (minutes) {
        return this._http.post(this.baseUrl + '/download', minutes)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     *
     * @param db string[]
     * @author Nikola Gavric
     */
    ControlPanelService.prototype.loadIntoDB = function (db) {
        return this._http.post(this.baseUrl + '/insert', db)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     * @author Nikola Gavric
     */
    ControlPanelService.prototype.dbStatus = function () {
        return this._http.get(this.baseUrl + '/insert/counter')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     *
     * @param arr string[]
     * @author Nikola Gavric
     */
    ControlPanelService.prototype.loadAll = function (arr) {
        return this._http.post(this.baseUrl + '/all', arr)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.cancelSFTP = function () {
        return this._http.get(this.baseUrl + '/download/cancel')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.cancelModules = function () {
        return this._http.get(this.baseUrl + '/load/cancel')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.cancelDB = function () {
        return this._http.get(this.baseUrl + '/insert/cancel')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.cancelAll = function () {
        return Observable_1.Observable.forkJoin(this.cancelModules(), this.cancelDB(), this.cancelSFTP());
    };
    /**
     *
     */
    ControlPanelService.prototype.fireAlert = function () {
        return this._http.get(this.baseUrl + '/fireAlert')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.alertStatus = function () {
        return this._http.get(this.baseUrl + '/fireAlert/status')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     * @param seconds number
     */
    ControlPanelService.prototype._startAlert = function (seconds) {
        return this._http.get(this.baseUrl + '/fireAlert/start/' + seconds)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype._stopAlert = function () {
        return this._http.get(this.baseUrl + '/fireAlert/stop')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     * @param isScheduled boolean
     * @param seconds number
     */
    ControlPanelService.prototype.runAlert = function (isScheduled, seconds) {
        return !isScheduled ? this._startAlert(seconds) : this._stopAlert();
    };
    /**
     *
     */
    ControlPanelService.prototype.checkAll = function () {
        return this._http.get(this.baseUrl + '/all/counter')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.startScheduleTimer = function (date, schedulers) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/forecast/schedule/start', {
            min: date.getMinutes(),
            hour: date.getHours()
        });
        return this._utilityService.postRequest(url, schedulers);
    };
    /**
     *
     */
    ControlPanelService.prototype.scheduleTimerStatus = function () {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/forecast/schedule/status', {});
        return this._utilityService.getRequest(url);
    };
    /**
     *
     */
    ControlPanelService.prototype.stopScheduleTimer = function (schedulers) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/forecast/schedule/stop', {});
        return this._utilityService.postRequest(url, schedulers);
    };
    /**
     *
     */
    ControlPanelService.prototype.nextScheduleTimer = function () {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/forecast/schedule/next', {});
        return this._utilityService.getRequest(url);
    };
    /**
     *
     */
    ControlPanelService.prototype.nextAlert = function () {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/fireAlert/nextExecution', {});
        return this._utilityService.getRequest(url);
    };
    /**
     *
     * @param status
     */
    ControlPanelService.prototype.automaticallyFireAlert = function (status) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/alerts', {
            fire: status
        });
        return this._utilityService.getRequest(url);
    };
    /**
     *
     */
    ControlPanelService.prototype.loadSFTPHistoryDates = function () {
        return this._http.get(this.baseUrl + '/download/dates')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.loadDBHistoryDates = function () {
        return this._http.get(this.baseUrl + '/insert/dates')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.resetModulesProgress = function (modules) {
        return this._http.post(this.baseUrl + '/load/counters/reset', modules)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.numberOfFilesOnDisc = function () {
        return this._http.get(this.baseUrl + '/download/files/count')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.refreshPageVars = function () {
        return this._http.get(this.baseUrl + '/monitor')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     *
     */
    ControlPanelService.prototype.connectPoints = function () {
        return this._http.post(this.baseUrl + '/locations/affiliation', {})
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    ControlPanelService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], ControlPanelService);
    return ControlPanelService;
}());
exports.ControlPanelService = ControlPanelService;
//# sourceMappingURL=control_panel.service.js.map
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
var utility_service_1 = require('../../shared/services/utility.service');
var AdminEmailConfigsService = (function () {
    function AdminEmailConfigsService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/adminEmails/';
    }
    /*  -------- Email Configs REST Cals --------**/
    /**
     * Rest GET call for retrieving all email Configs
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsService.prototype.getAllEmailsConfigsRest = function () {
        return this._http.get(this.baseUrl + 'getAllEmailsConfigs')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest DELETE call for to deleting an email Configs
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsService.prototype.deleteEmailConfigsRest = function (emailConfigId) {
        return this._http.delete(this.baseUrl + 'deleteEmailConfigs/' + emailConfigId)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest POST call for saving an email config
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsService.prototype.saveEmailConfigsRest = function (pageId, emailConfigs) {
        return this._http.post(this.baseUrl + 'saveEmailConfigs?pageId=' + pageId, emailConfigs)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest PUT call for updating an email config
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsService.prototype.updateEmailConfigsRest = function (pageId, emailConfigs) {
        return this._http.put(this.baseUrl + 'updateEmailConfigs?pageId=' + pageId, emailConfigs)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    AdminEmailConfigsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AdminEmailConfigsService);
    return AdminEmailConfigsService;
}());
exports.AdminEmailConfigsService = AdminEmailConfigsService;
//# sourceMappingURL=adminEmailConfigs.service.js.map
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
var AdminEmailTemplateService = (function () {
    function AdminEmailTemplateService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/adminEmails/';
    }
    /*  -------- Email Template REST Cals --------**/
    /**
     * Rest GET call to retrieve all email templates
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateService.prototype.getAllEmailsTemplatesRest = function () {
        return this._http.get(this.baseUrl + 'getAllEmailsTemplates')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest DELETE call to delete an email template
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateService.prototype.deleteEmailTemplateRest = function (emailTemplateId) {
        return this._http.delete(this.baseUrl + 'deleteEmailTemplate/' + emailTemplateId)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest POST call to save an email template
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateService.prototype.saveEmailTemplateRest = function (pageId, emailTemplateData) {
        return this._http.post(this.baseUrl + 'saveEmailTemplate?pageId=' + pageId, emailTemplateData)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest POST call to update an email template
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateService.prototype.updateEmailTemplateRest = function (pageId, emailTemplateData) {
        return this._http.post(this.baseUrl + 'updateEmailTemplate?pageId=' + pageId, emailTemplateData)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    AdminEmailTemplateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AdminEmailTemplateService);
    return AdminEmailTemplateService;
}());
exports.AdminEmailTemplateService = AdminEmailTemplateService;
//# sourceMappingURL=adminEmailTemplate.service.js.map
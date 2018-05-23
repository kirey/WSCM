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
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
/**
 * Service for RegistrationCmp
 * @author Stefan Svrkota
 */
var RegistrationService = (function () {
    function RegistrationService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/users';
    }
    /**
     * Rest GET call for retrieving captcha
     * @author Stefan Svrkota
     */
    RegistrationService.prototype.getCaptchaRest = function () {
        return this._http.get(this.baseUrl + '/noAuth/captchacode?pageId=registration')
            .map(function (res) { return res.json(); });
    };
    /**
     * Rest GET call for retrieving lanugages
     * @author Stefan Svrkota
     */
    RegistrationService.prototype.getLanguagesRest = function () {
        return this._http.get(this.baseUrl + '/noAuth/availableLanguages?pageId=registration')
            .map(function (res) { return res.json(); });
    };
    /**
     * Rest POST call for registering user
     * @author Stefan Svrkota
     */
    RegistrationService.prototype.registerRest = function (userForm, code, hashCode) {
        return this._http.post(this.baseUrl + '/noAuth/signup?pageId=registration&code=' + code + '&hashCode=' + hashCode, userForm)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    RegistrationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RegistrationService);
    return RegistrationService;
}());
exports.RegistrationService = RegistrationService;
//# sourceMappingURL=kjgri.registration.service.js.map
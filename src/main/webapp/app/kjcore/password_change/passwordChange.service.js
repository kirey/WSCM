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
var utility_service_1 = require('../shared/services/utility.service');
/**
 * Service for Password Change component
 * @author Mario Petrovic
 */
var PasswordChangeService = (function () {
    /*--------- Constructor --------*/
    function PasswordChangeService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/users';
    }
    /**
     * Rest GET call to retrieve user details based on hash value
     * @author Mario Petrovic
     */
    PasswordChangeService.prototype.getUserDetailsRest = function (mailHash) {
        return this._http.get(this.baseUrl + '/noAuth/userInfo?mailHash=' + mailHash)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call for sending forgot password request as mail
     * @author Mario Petrovic
     */
    PasswordChangeService.prototype.forgotPasswordRequestRest = function (email) {
        return this._http.get(this.baseUrl + '/noAuth/forgotPassword?email=' + email)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest POST call for submitting change password form
     * @author Mario Petrovic
     */
    PasswordChangeService.prototype.changePasswordSubmitRest = function (passwordChangeData) {
        return this._http.post(this.baseUrl + '/noAuth/password?pageId=registration', passwordChangeData)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    PasswordChangeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PasswordChangeService);
    return PasswordChangeService;
}());
exports.PasswordChangeService = PasswordChangeService;
//# sourceMappingURL=passwordChange.service.js.map
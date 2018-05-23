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
 * Service for Password Change component
 * @author Mario Petrovic
 */
var ActivateUserService = (function () {
    /*--------- Constructor --------*/
    function ActivateUserService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/common/users/noAuth';
    }
    /**
     * Rest GET call to retrieve user details based on hash value
     * @author Mario Petrovic
     */
    ActivateUserService.prototype.getUserDetailsRest = function (mailHash) {
        return this._http.get('rest/users/noAuth/userInfo?mailHash=' + mailHash)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call for sending activate user request as mail
     * @author Mario Petrovic
     */
    ActivateUserService.prototype.activateUserRequestRest = function (email) {
        return this._http.get(this.baseUrl + '/activateMail?email=' + email)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest POST call for activate user form
     * @author Mario Petrovic
     */
    ActivateUserService.prototype.activateUserSubmitRest = function (activateUser) {
        return this._http.post(this.baseUrl + '/activate?pageId=registration', activateUser)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    ActivateUserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ActivateUserService);
    return ActivateUserService;
}());
exports.ActivateUserService = ActivateUserService;
//# sourceMappingURL=activateUser.service.js.map
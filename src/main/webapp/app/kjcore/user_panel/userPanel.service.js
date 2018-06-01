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
var UserPanelService = (function () {
    function UserPanelService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/users';
    }
    /**
     * Rest - Change password for logged user
     * @author Kirey
     */
    UserPanelService.prototype.changePassword = function (userCredentials, code, hashCode) {
        return this._http.put('/rest/common/users/userPassword?pageId=registration&code=' + code + '&hashCode=' + hashCode, userCredentials)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest - Update user data
     * @author Kirey
     */
    UserPanelService.prototype.updateUserData = function (userData, code, hashCode) {
        return this._http.put(this.baseUrl + '/userDetails?pageId=registration&code=' + code + '&hashCode=' + hashCode, userData)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest - Get all languages
     * @author Kirey
     */
    UserPanelService.prototype.getAvailableLanguages = function () {
        return this._http.get(this.baseUrl + '/noAuth/availableLanguages')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    UserPanelService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserPanelService);
    return UserPanelService;
}());
exports.UserPanelService = UserPanelService;
//# sourceMappingURL=userPanel.service.js.map
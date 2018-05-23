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
var KJGriAdminUserService = (function () {
    /************** Constructor ***************** */
    function KJGriAdminUserService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/kjgriAdmin/users';
        this.pageId = 'roleUser';
    }
    /************** GET ***************** */
    /**
     * GET - Fetches all users
     * @author DynTech
     */
    KJGriAdminUserService.prototype.getAllUsers = function () {
        return this._utilityService.getRequest(this.baseUrl);
    };
    /**
     * GET - Get roles by company id
     * @author Mario Petrovic
     */
    KJGriAdminUserService.prototype.getRolesByCompanyId = function (companyId) {
        return this._utilityService.getRequest(this.baseUrl + '/role/' + companyId);
    };
    /**
     * GET - Get roles by logged in user
     * @author Mario Petrovic
     */
    KJGriAdminUserService.prototype.getRolesByUserCompany = function () {
        return this._utilityService.getRequest(this.baseUrl + '/client/role');
    };
    /**
     * GET - Loading all languages
     * @author Nikola Gavric
     */
    KJGriAdminUserService.prototype.getLanguagesRest = function () {
        return this._utilityService.getRequest('rest/users/noAuth/availableLanguages');
    };
    /**
     * GET - Loading all filtered users as Company admin and Agent
     * @author Nikola Gavric
     */
    KJGriAdminUserService.prototype.getFilteredUsers = function (filter) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/filtered', {
            pageId: this.pageId,
            companyId: filter && filter.company ? filter.company.id : '',
            username: filter ? filter.username : ''
        });
        return this._utilityService.getRequest(url);
    };
    /**
     * GET - Loading all modal companies
     * based on logged in user role
     * @author Nikola Gavric
     */
    KJGriAdminUserService.prototype.getActiveCompanies = function () {
        return this._utilityService.getRequest(this.baseUrl + '/activeCompany');
    };
    /************** POST ***************** */
    /**
     * POST - Adding new user
     * @author DynTech
     */
    KJGriAdminUserService.prototype.addUser = function (user) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: this.pageId
        });
        return this._utilityService.postRequest(url, user);
    };
    /************** PUT ***************** */
    /**
     * PUT - Enables or disables the user
     * @author DynTech
     */
    KJGriAdminUserService.prototype.updateUserStatus = function (user) {
        var status = (!user.enabled == false) ? 0 : 1;
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/enable/' + user.id, {
            checked: status,
            pageId: this.pageId
        });
        return this._utilityService.putRequest(url, user);
    };
    /**
     * PUT - Editing a user
     * @author DynTech
     */
    KJGriAdminUserService.prototype.editUser = function (user) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: this.pageId
        });
        return this._utilityService.putRequest(url, user);
    };
    KJGriAdminUserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], KJGriAdminUserService);
    return KJGriAdminUserService;
}());
exports.KJGriAdminUserService = KJGriAdminUserService;
//# sourceMappingURL=kjgri.adminUsers.service.js.map
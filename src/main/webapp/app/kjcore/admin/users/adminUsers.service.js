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
var AdminUserService = (function () {
    function AdminUserService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/admin/users';
    }
    /**
     * GET - Fetches all users
     * @author DynTech
     */
    AdminUserService.prototype.getAllUsers = function () {
        return this._http.get(this.baseUrl)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT - Enables or disables the user
     * @author DynTech
     */
    AdminUserService.prototype.updateUserStatus = function (user) {
        var status = (!user.enabled == false) ? 0 : 1;
        return this._http.put(this.baseUrl + "/enable/" + user.id + "?checked=" + status + "&pageId=roleUser", "")
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT - Editing a user
     * @author DynTech
     */
    AdminUserService.prototype.editUser = function (user) {
        return this._http.put(this.baseUrl + "?pageId=roleUser", JSON.stringify(user))
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST - Adding new user
     * @author DynTech
     */
    AdminUserService.prototype.addUser = function (user) {
        return this._http.post(this.baseUrl + "?pageId=roleUser", JSON.stringify(user))
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET - Loading all languages
     * @author Nikola Gavric
     */
    AdminUserService.prototype.getLanguagesRest = function () {
        return this._http.get('rest/users/noAuth/availableLanguages')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET - Loading all filtered users as Company admin and Agent
     * @author Nikola Gavric
     */
    AdminUserService.prototype.getFilteredUsers = function (filter) {
        return this._http.get(this.baseUrl + '/filtered?pageId=roleUser&company=' + filter.company + '&role=' + filter.role + '&username=' + filter.username)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET - Loading all filtered companies
     * based on logged in user role
     * @author Nikola Gavric
     */
    AdminUserService.prototype.getCompanies = function () {
        return this._http.get(this.baseUrl + '/company')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET - Loading all modal companies
     * based on logged in user role
     * @author Nikola Gavric
     */
    AdminUserService.prototype.getActiveCompanies = function () {
        return this._http.get(this.baseUrl + '/activeCompany')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Fetches all roles
     * @author Nikola Gavric
     */
    AdminUserService.prototype.getAllRoles = function () {
        return this._http.get(this.baseUrl + '/role?pageId=roleUser')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    AdminUserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AdminUserService);
    return AdminUserService;
}());
exports.AdminUserService = AdminUserService;
//# sourceMappingURL=adminUsers.service.js.map
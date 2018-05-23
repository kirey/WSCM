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
var AdminRoleService = (function () {
    /*************** Constructor ***************/
    function AdminRoleService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/admin/users';
        this.pageId = 'roleUser';
    }
    /***************** GET ******************/
    /**
     * Fetches all roles
     * @author Mario Petrovic
     */
    AdminRoleService.prototype.getAllRolesSuperAdmin = function () {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/role', {
            pageId: this.pageId
        });
        return this._utilityService.getRequest(url);
    };
    /***************** POST ******************/
    /**
     * Adding a role
     * @author DynTech
     */
    AdminRoleService.prototype.addRole = function (role) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/role', {
            pageId: this.pageId
        });
        return this._utilityService.postRequest(url, role);
    };
    /***************** PUT ******************/
    /**
     * Editing a role
     * @author DynTech
     */
    AdminRoleService.prototype.editRole = function (role) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/role', {
            pageId: this.pageId
        });
        return this._utilityService.putRequest(url, role);
    };
    /***************** DELETE ******************/
    /**
     * Removing a role
     * @author DynTech
     */
    AdminRoleService.prototype.deleteRole = function (role) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/role/' + role.id, {
            pageId: this.pageId
        });
        return this._utilityService.deleteRequest(url, role);
    };
    AdminRoleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], AdminRoleService);
    return AdminRoleService;
}());
exports.AdminRoleService = AdminRoleService;
//# sourceMappingURL=adminRoles.service.js.map
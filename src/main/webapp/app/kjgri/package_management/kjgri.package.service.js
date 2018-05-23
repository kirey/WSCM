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
var PackageManagementService = (function () {
    function PackageManagementService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/admin/packages';
    }
    /**
     * GET Call for getting all available packages
     * @author Nikola Gavric
     */
    PackageManagementService.prototype.getAllPackages = function () {
        return this._http.get(this.baseUrl)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT Call for updating a Package
     * @author Nikola Gavric
     */
    PackageManagementService.prototype.updatePackage = function (data) {
        var url = this.baseUrl + '/' + data.id;
        url += '?numberOfAccounts=' + data.numberOfAccounts;
        if (data.numberOfLocations)
            url += '&numberOfLocations=' + data.numberOfLocations;
        else
            url += '&numberOfLocations=0';
        url += '&duration=' + data.duration;
        return this._http.put(url, data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    PackageManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PackageManagementService);
    return PackageManagementService;
}());
exports.PackageManagementService = PackageManagementService;
//# sourceMappingURL=kjgri.package.service.js.map
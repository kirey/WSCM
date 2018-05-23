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
 * Service for insurance comapnies management component
 * @author Mario Petrovic
 */
var ClientCompaniesService = (function () {
    function ClientCompaniesService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/admin/companies';
    }
    ;
    /* --------------- GET --------------- */
    /**
     * GET call for retrieval of insurance companies
     * @author Mario Petrovic
     */
    ClientCompaniesService.prototype.getInsuranceCompanies = function (queryParams) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/insurance/clientCompanies', queryParams);
        return this._utilityService.getRequest(url);
    };
    /* --------------- DELETE --------------- */
    /**
     * DELETE call to detach from client company
     * @author Mario Petrovic
     */
    ClientCompaniesService.prototype.detachFromClientCompany = function (companyId) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/insurance/clientCompanies/' + companyId);
        return this._utilityService.deleteRequest(url);
    };
    ClientCompaniesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], ClientCompaniesService);
    return ClientCompaniesService;
}());
exports.ClientCompaniesService = ClientCompaniesService;
//# sourceMappingURL=clientCompanies.service.js.map
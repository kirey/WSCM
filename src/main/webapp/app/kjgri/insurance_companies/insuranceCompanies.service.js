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
var InsuranceCompaniesService = (function () {
    function InsuranceCompaniesService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/admin/companies';
        this.pageId = 'adminCompanies';
    }
    ;
    /* --------------- GET --------------- */
    /**
     * GET call for retrieval of insurance companies
     * @author Mario Petrovic
     */
    InsuranceCompaniesService.prototype.getInsuranceCompanies = function () {
        return this._utilityService.getRequest(this.baseUrl + '/join');
    };
    /* --------------- POST --------------- */
    /**
     * POST call to attach loggedin user's company to insurance company
     * @author Mario Petrovic
     */
    InsuranceCompaniesService.prototype.attachToInsuranceCompany = function (attachForm) {
        attachForm['pageId'] = 'kjgriAdminCompanies';
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/join', attachForm);
        return this._utilityService.postRequest(url);
    };
    /* --------------- PUT --------------- */
    /**
     * PUT call to allow insurance company to see info from loggedin user's company
     * @author Mario Petrovic
     */
    InsuranceCompaniesService.prototype.updateInfoConsent = function (insuranceId, flag) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/join', {
            insuranceId: insuranceId,
            flag: flag
        });
        return this._utilityService.putRequest(url);
    };
    /* --------------- DELETE --------------- */
    /**
     * GET call for retrieval of all companies and their details
     * @author Mario Petrovic
     */
    InsuranceCompaniesService.prototype.detachFromInsuranceCompany = function (insuranceId) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/join', {
            insuranceId: insuranceId
        });
        return this._utilityService.deleteRequest(url);
    };
    InsuranceCompaniesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], InsuranceCompaniesService);
    return InsuranceCompaniesService;
}());
exports.InsuranceCompaniesService = InsuranceCompaniesService;
//# sourceMappingURL=insuranceCompanies.service.js.map
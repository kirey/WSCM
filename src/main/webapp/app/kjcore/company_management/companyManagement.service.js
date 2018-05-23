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
var CompanyManagementService = (function () {
    function CompanyManagementService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/adminCompanies';
        this.pageId = 'adminCompanies';
    }
    ;
    /**
     * GET call for retrieval of all companies and their details
     * @author Mario Petrovic
     */
    CompanyManagementService.prototype.getAllCompaniesRest = function () {
        return this._http.get(this.baseUrl + '/superAdmin/company')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET call for retrieval of company profile (in case of super admin, that is default company)
     * @author Mario Petrovic
     */
    CompanyManagementService.prototype.getDefaultCompanyRest = function () {
        return this._http.get(this.baseUrl + '/company')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET call for retrieval of company profile by id
     * @author Mario Petrovic
     */
    CompanyManagementService.prototype.getCompanyProfileByIdRest = function (id) {
        return this._http.get(this.baseUrl + '/superAdmin/company/' + id)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT call update company details
     * @author Mario Petrovic
     */
    CompanyManagementService.prototype.updateCompanyRest = function (company) {
        return this._http.put(this.baseUrl + '/superAdmin/company?pageId=' + this.pageId, company)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT call update default company
     * @author Mario Petrovic
     */
    CompanyManagementService.prototype.updateDefaultCompanyRest = function (company) {
        return this._http.put(this.baseUrl + '/defaultCompany' + this._utilityService.generateQueryParams({
            name: company.name,
            description: company.description
        }), '')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST call for creating new company
     * @author Mario Petrovic
     */
    CompanyManagementService.prototype.saveCompanyRest = function (newCompany) {
        return this._http.post(this.baseUrl + '/superAdmin/company?pageId=' + this.pageId, newCompany)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT call to activate company
     * @author Mario Petrovic
     */
    CompanyManagementService.prototype.updateCompanyStatusRest = function (id, status) {
        return this._http.put(this.baseUrl + '/superAdmin/company/' + id + '/' + status, '')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST call to update default company css
     * @author Mario Petrovic
     */
    CompanyManagementService.prototype.updateDefaultCssRest = function (defaultCss) {
        return this._http.post(this.baseUrl + '/superAdmin/newDefaultCss', defaultCss)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST call to update default company css
     * @author Mario Petrovic
     */
    CompanyManagementService.prototype.updateCompanyCssRest = function (id, defaultCss) {
        return this._http.post(this.baseUrl + '/superAdmin/company/newCompanyCss/' + id, defaultCss)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT call to reset default css to initial
     * @author Mario Petrovic
     */
    CompanyManagementService.prototype.resetDefaultCssToInitRest = function () {
        return this._http.put(this.baseUrl + '/superAdmin/resetToInitialCss', '')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT call to reset company style to default
     * @author Mario Petrovic
     */
    CompanyManagementService.prototype.resetCompanyStyleToDefault = function (id) {
        return this._http.put(this.baseUrl + '/superAdmin/company/resetToDefaultCss/' + id, '')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT call to reset company style to previous
     * @author Mario Petrovic
     */
    CompanyManagementService.prototype.resetCompanyStyleToPreviousRest = function (id) {
        return this._http.put(this.baseUrl + '/superAdmin/company/resetToPreviousCss/' + id, '')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST - upload company logo
     * @author Mario Petrovic
     */
    CompanyManagementService.prototype.uploadCompanyLogoRest = function (companyLogo) {
        return this._http.post(this.baseUrl + '/company/logo', companyLogo)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    CompanyManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], CompanyManagementService);
    return CompanyManagementService;
}());
exports.CompanyManagementService = CompanyManagementService;
//# sourceMappingURL=companyManagement.service.js.map
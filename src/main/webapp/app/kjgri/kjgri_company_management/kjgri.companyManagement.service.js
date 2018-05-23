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
var KJGriCompanyManagementService = (function () {
    /* ----------- Constructor ---------- */
    function KJGriCompanyManagementService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/admin/companies';
        this.pageId = 'kjgriAdminCompanies';
        this.nominaticAddressSearchBaseUrl = 'http://nominatim.openstreetmap.org/search';
    }
    ;
    /* --------------- GET --------------- */
    /**
     * GET call for retrieval of all companies and their details
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.getAllCompaniesRest = function (queryParams) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, queryParams);
        return this._utilityService.getRequest(url);
    };
    /**
     * GET call for retrieval of all companies and their details
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.getPackages = function (companyType) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/packagesType', {
            companyType: companyType
        });
        return this._utilityService.getRequest(url);
    };
    /**
     * GET call for retrieval of company profile (in case of super admin, that is default company)
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.getDefaultCompanyRest = function () {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/defaultCompany');
        return this._utilityService.getRequest(url);
    };
    /**
     * GET call for retrieval of company profile by id
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.getCompanyProfileByIdRest = function (id) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/' + id);
        return this._utilityService.getRequest(url);
    };
    /**
     * GET call for retrieval of list of company's locations
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.getCompanyLocationsById = function (id) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/locations/' + id);
        return this._utilityService.getRequest(url);
    };
    /**
     * GET call for retrieval of all joined companies.
     * @author Nikola Gavric
     */
    KJGriCompanyManagementService.prototype.getJoinedCompanies = function (companyId) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/superdamin/join', {
            id: companyId
        });
        return this._utilityService.getRequest(url);
    };
    /**
     * GET call for retrieval of all client companies.
     * @author Nikola Gavric
     */
    KJGriCompanyManagementService.prototype.getClientCompanies = function () {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/client');
        return this._utilityService.getRequest(url);
    };
    /**
     * GET call for retrieval of all insurance companies.
     * @author Nikola Gavric
     */
    KJGriCompanyManagementService.prototype.getInsuranceCompanies = function () {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/insurance');
        return this._utilityService.getRequest(url);
    };
    /**
     * GET call for retrieval of geolocations for the map
     * @author Nikola Gavric
     */
    KJGriCompanyManagementService.prototype.getGeolocations = function (searchData) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/locations/draw', searchData);
        return this._utilityService.getRequest(url);
    };
    /* --------------- POST --------------- */
    /**
     * POST call for creating new company
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.saveCompanyRest = function (newCompany) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: this.pageId
        });
        return this._utilityService.postRequest(url, newCompany);
    };
    /**
     * POST call to update default company css
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.updateDefaultCssRest = function (defaultCss) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/newDefaultCss');
        return this._utilityService.postRequest(url, defaultCss);
    };
    /**
     * POST call to update default company css
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.updateCompanyCssRest = function (id, defaultCss) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/newCompanyCss/' + id);
        return this._utilityService.postRequest(url, defaultCss);
    };
    /**
     * POST - upload company logo
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.uploadCompanyLogoRest = function (companyLogo) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/logo');
        return this._utilityService.postRequest(url, companyLogo);
    };
    /**
     * POST call to add new company location
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.saveCompanyLocation = function (company, companyId) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/locations/superadmin', {
            pageId: this.pageId,
            companyId: companyId
        });
        return this._utilityService.postRequest(url, company);
    };
    /**
     * POST call to add new company location
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.connectCompany = function (clientId, insuranceId, flag) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/superadmin/join', {
            clientId: clientId,
            insuranceId: insuranceId,
            flConsentToView: flag,
            pageId: this.pageId
        });
        return this._utilityService.postRequest(url, []);
    };
    /* --------------- PUT --------------- */
    /**
     * PUT call update company details
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.updateCompanyRest = function (company) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/?pageId=' + this.pageId);
        return this._utilityService.putRequest(url, company);
    };
    /**
     * PUT call update default company
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.updateDefaultCompanyRest = function (company) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/defaultCompany', {
            name: company.name,
            description: company.description
        });
        return this._utilityService.putRequest(url);
    };
    /**
     * PUT call to activate company
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.updateCompanyStatusRest = function (id, status) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/' + id + '/' + status);
        return this._utilityService.putRequest(url);
    };
    /**
     * PUT call to reset default css to initial
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.resetDefaultCssToInitRest = function () {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/resetToInitialCss');
        return this._utilityService.putRequest(url);
    };
    /**
     * PUT call to reset company style to default
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.resetCompanyStyleToDefault = function (id) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/resetToDefaultCss/' + id);
        return this._utilityService.putRequest(url);
    };
    /**
     * PUT call to reset company style to previous
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.resetCompanyStyleToPreviousRest = function (id) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/resetToPreviousCss/' + id);
        return this._utilityService.putRequest(url);
    };
    /**
     * PUT call to update company location
     * @author Mario Petrovic
     */
    KJGriCompanyManagementService.prototype.updateCompanyLocation = function (company, companyId) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/locations/superadmin/' + companyId, {
            pageId: this.pageId
        });
        return this._utilityService.putRequest(url, company);
    };
    /**
     * PUT call
     * @author Nikola Gavric
     */
    KJGriCompanyManagementService.prototype.updateInfoConsent = function (clientId, insuranceId, flag) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/join', {
            clientId: clientId,
            insuranceId: insuranceId,
            flag: flag
        });
        return this._utilityService.putRequest(url);
    };
    /* --------------- DELETE --------------- */
    /**
     * DELETE call for detaching insurance company
     * @author Nikola Gavric
     */
    KJGriCompanyManagementService.prototype.detachCompany = function (clientId, insuranceId) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/join', {
            clientId: clientId,
            insuranceId: insuranceId
        });
        return this._utilityService.deleteRequest(url);
    };
    /**
     * Searches the external server for results
     * Must not exceed https://operations.osmfoundation.org/policies/nominatim/ usage
     *
     * @param data any
     * @author Nikola Gavric
     */
    KJGriCompanyManagementService.prototype.searchAddress = function (data) {
        var url = this._utilityService.generateUrlWithQueryParams(this.nominaticAddressSearchBaseUrl, {
            q: data,
            format: 'json',
            dedupe: 1,
            polygon_geojson: 1,
            addressdetails: 1,
            limit: 10
        });
        return this._http.get(url)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    KJGriCompanyManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], KJGriCompanyManagementService);
    return KJGriCompanyManagementService;
}());
exports.KJGriCompanyManagementService = KJGriCompanyManagementService;
//# sourceMappingURL=kjgri.companyManagement.service.js.map
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
var CompanyPanelService = (function () {
    function CompanyPanelService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/adminCompanies';
        this.pageId = 'adminCompanies';
    }
    ;
    /**
     * GET call to retrieve company details of current user
     * @author Mario Petrovic
     */
    CompanyPanelService.prototype.getCompanyRest = function () {
        return this._http.get(this.baseUrl + '/company')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT call update company details of current user
     * @author Mario Petrovic
     */
    CompanyPanelService.prototype.updateCompanyRest = function (company) {
        return this._http.put(this.baseUrl + '/company?pageId=' + this.pageId, company)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT call to reset company style to previous
     * @author Mario Petrovic
     */
    CompanyPanelService.prototype.resetCompanyStyleToPreviousRest = function (id) {
        return this._http.put(this.baseUrl + '/company/resetToPreviousCss', '')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT call to reset company style to default
     * @author Mario Petrovic
     */
    CompanyPanelService.prototype.resetCompanyStyleToDefault = function () {
        return this._http.put(this.baseUrl + '/company/resetToDefaultCss/', '')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST call to update default company css
     * @author Mario Petrovic
     */
    CompanyPanelService.prototype.updateCompanyCssRest = function (newCss) {
        return this._http.post(this.baseUrl + '/company/newCompanyCss/', newCss)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    CompanyPanelService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CompanyPanelService);
    return CompanyPanelService;
}());
exports.CompanyPanelService = CompanyPanelService;
//# sourceMappingURL=companyPanel.service.js.map
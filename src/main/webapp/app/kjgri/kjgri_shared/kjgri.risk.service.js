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
var RiskManagementService = (function () {
    function RiskManagementService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/admin/risks';
    }
    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    RiskManagementService.prototype.getAllRisks = function () {
        return this._http.get(this.baseUrl + '/initialized?pageId=risks')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    RiskManagementService.prototype.getAllSubRisks = function (id) {
        return this._http.get(this.baseUrl + '/' + id + '/subrisks?pageId=risks')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST Call for creating a risk
     * @author Nikola Gavric
     */
    RiskManagementService.prototype.createRisk = function (data) {
        return this._http.post(this.baseUrl + '?pageId=risks', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT Call for updating a risk
     * @author Nikola Gavric
     */
    RiskManagementService.prototype.updateRisk = function (data) {
        return this._http.put(this.baseUrl + '?pageId=risks', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Create/Update call for risks
     * @author Nikola Gavric
     */
    RiskManagementService.prototype.createOrUpdateRisk = function (data) {
        if (data.id)
            return this.updateRisk(data);
        else
            return this.createRisk(data);
    };
    /**
     * DELETE call for risk
     * @author Nikola Gavric
     */
    RiskManagementService.prototype.removeRisk = function (data) {
        return this._http.delete(this.baseUrl + '/' + data.id + '?pageId=risks')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST Call for creating a risk subtype
     * @author Nikola Gavric
     */
    RiskManagementService.prototype.createRiskSubtype = function (data) {
        return this._http.post(this.baseUrl + '/subrisks?pageId=risks', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT Call for updating a risk subtype
     * @author Nikola Gavric
     */
    RiskManagementService.prototype.updateRiskSubtype = function (data) {
        return this._http.put(this.baseUrl + '/subrisks?pageId=risks', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Create/Update call for risk subtypes
     * @author Nikola Gavric
     */
    RiskManagementService.prototype.createOrUpdateRiskSubtype = function (data) {
        if (data.id)
            return this.updateRiskSubtype(data);
        else
            return this.createRiskSubtype(data);
    };
    /**
     * DELETE call for risk subtype
     * @author Nikola Gavric
     */
    RiskManagementService.prototype.removeRiskSubtype = function (data) {
        return this._http.delete(this.baseUrl + '/subrisks/' + data.id + '?pageId=risks')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    RiskManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RiskManagementService);
    return RiskManagementService;
}());
exports.RiskManagementService = RiskManagementService;
//# sourceMappingURL=kjgri.risk.service.js.map
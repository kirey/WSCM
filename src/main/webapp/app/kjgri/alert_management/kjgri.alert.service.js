"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var kjgri_services_1 = require('./../kjgri_shared/kjgri.services');
var AlertManagementService = (function (_super) {
    __extends(AlertManagementService, _super);
    function AlertManagementService() {
        _super.apply(this, arguments);
        this.alertBaseUrl = 'rest/admin/risks/subrisks';
    }
    /**
     * Load all risks
     */
    AlertManagementService.prototype.getAllRisks = function () {
        return this._http.get(this.alertBaseUrl + '/types/forecast')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Load all subrisks by risk id
     * @param id number
     */
    AlertManagementService.prototype.getAllSubRisks = function (id) {
        return this._http.get(this.alertBaseUrl + '/' + id + '/subrisks/forecast')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET Call for all alerts for a given subtype risk
     * @author Nikola Gavric
     */
    AlertManagementService.prototype.getAlertsBySubriskId = function (subriskId) {
        return this._http.get(this.alertBaseUrl + '/' + subriskId + '/alerts?pageId=risks')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST Call for creating an alert
     * @author Nikola Gavric
     */
    AlertManagementService.prototype.createAlert = function (data) {
        return this._http.post(this.alertBaseUrl + '/alerts?pageId=risks', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT Call for updating an alert
     * @author Nikola Gavric
     */
    AlertManagementService.prototype.updateAlert = function (data) {
        return this._http.put(this.alertBaseUrl + '/alerts?pageId=risks', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Create/Update call for alerts
     * @author Nikola Gavric
     */
    AlertManagementService.prototype.createOrUpdateAlert = function (data) {
        if (data.id)
            return this.updateAlert(data);
        else
            return this.createAlert(data);
    };
    /**
     * DELETE Call for removing an alert
     * @author Nikola Gavric
     */
    AlertManagementService.prototype.removeAlert = function (data) {
        return this._http.delete(this.alertBaseUrl + '/alerts/' + data.id + '?pageId=risks')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    AlertManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AlertManagementService);
    return AlertManagementService;
}(kjgri_services_1.RiskManagementService));
exports.AlertManagementService = AlertManagementService;
//# sourceMappingURL=kjgri.alert.service.js.map
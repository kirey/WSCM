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
var PlanManagementService = (function (_super) {
    __extends(PlanManagementService, _super);
    function PlanManagementService() {
        _super.apply(this, arguments);
        this.placeholderBaseUrl = 'rest/admin/risks/subrisks';
    }
    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    PlanManagementService.prototype.getAllActionsByLocation = function (locationId) {
        return this._http.get('rest/admin/risks/actions?locationId=' + locationId)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET Call for getting all available locations
     * @author Nikola Gavric
     */
    PlanManagementService.prototype.getAllLocations = function () {
        return this._http.get('rest/admin/companies/locations')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST Call for creating an Placeholder
     * @author Nikola Gavric
     */
    PlanManagementService.prototype.createPlaceholder = function (data) {
        return this._http.post(this.placeholderBaseUrl + '/placeholder', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT Call for updating an Placeholder
     * @author Nikola Gavric
     */
    PlanManagementService.prototype.updatePlaceholder = function (data) {
        return this._http.put(this.placeholderBaseUrl + '/placeholder', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Create/Update call for Placeholder
     * @author Nikola Gavric
     */
    PlanManagementService.prototype.createOrUpdatePlaceholder = function (data) {
        if (data.id)
            return this.updatePlaceholder(data);
        else
            return this.createPlaceholder(data);
    };
    /**
     * GET Call for all placeholders
     * @author Nikola Gavric
     */
    PlanManagementService.prototype.getPlaceholders = function (locationId) {
        return this._http.get('rest/client/locations/' + locationId + '/placeholders')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST Call for saving actions chosen for plan
     * @author Nikola Gavric
     */
    PlanManagementService.prototype.saveActions = function (locationId, actions) {
        return this._http.post('rest/client/locations/' + locationId + '/actions/checked', actions)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST Call for saving actions chosen for plan
     * @author Nikola Gavric
     */
    PlanManagementService.prototype.savePlaceholders = function (locationId, data) {
        return this._http.post('rest/client/locations/' + locationId + '/placeholders', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET Call for for a plan preview
     * @author Nikola Gavric
     */
    PlanManagementService.prototype.previewPlan = function (locationId, placeholders) {
        return this._http.put('rest/client/locations/' + locationId + '/preview', placeholders)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET Call for archiving a plan
     * @author Nikola Gavric
     */
    PlanManagementService.prototype.archivePlan = function (locationId, placeholders) {
        return this._http.put('rest/client/locations/' + locationId + '/archive', placeholders)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    PlanManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PlanManagementService);
    return PlanManagementService;
}(kjgri_services_1.RiskManagementService));
exports.PlanManagementService = PlanManagementService;
//# sourceMappingURL=kjgri.plan.service.js.map
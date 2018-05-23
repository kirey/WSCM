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
var ActionManagementService = (function (_super) {
    __extends(ActionManagementService, _super);
    function ActionManagementService() {
        _super.apply(this, arguments);
        this.actionBaseUrl = 'rest/admin/risks/subrisks';
    }
    /**
     * Load all risks
     */
    ActionManagementService.prototype.getAllRisks = function () {
        return this._http.get(this.actionBaseUrl + '/types/risk')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Load all subrisks by risk id
     * @param id number
     */
    ActionManagementService.prototype.getAllSubRisks = function (id) {
        return this._http.get(this.actionBaseUrl + '/' + id + '/subrisks/risk')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * GET Call for all actions for a given subtype risk
     * @author Nikola Gavric
     */
    ActionManagementService.prototype.getActionsBySubriskId = function (subriskId) {
        return this._http.get(this.actionBaseUrl + '/' + subriskId + '/actions?pageId=risks')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * POST Call for creating an action
     * @author Nikola Gavric
     */
    ActionManagementService.prototype.createAction = function (data) {
        return this._http.post(this.actionBaseUrl + '/actions?pageId=risks', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT Call for updating an action
     * @author Nikola Gavric
     */
    ActionManagementService.prototype.updateAction = function (data) {
        return this._http.put(this.actionBaseUrl + '/actions?pageId=risks', data)
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * PUT/POST call for actions
     * @author Nikola Gavric
     */
    ActionManagementService.prototype.createOrUpdateAction = function (data) {
        if (data.id)
            return this.updateAction(data);
        else
            return this.createAction(data);
    };
    /**
     * DELETE call for actions
     * @author Nikola Gavric
     */
    ActionManagementService.prototype.removeAction = function (data) {
        console.log(data);
        return this._http.delete(this.actionBaseUrl + '/actions/' + data.id + '?pageId=risks')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    ActionManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ActionManagementService);
    return ActionManagementService;
}(kjgri_services_1.RiskManagementService));
exports.ActionManagementService = ActionManagementService;
//# sourceMappingURL=kjgri.action.service.js.map
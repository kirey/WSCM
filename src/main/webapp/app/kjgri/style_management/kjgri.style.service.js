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
var StyleManagementService = (function () {
    function StyleManagementService(_http, _utilityService) {
        this._http = _http;
        this._utilityService = _utilityService;
        this.baseUrl = 'rest/admin/styles';
    }
    /* --------------- GET --------------- */
    /**
     * GET Call for getting all available risks
     * @author Nikola Gavric
     */
    StyleManagementService.prototype.getAllStyles = function () {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: 'riskIndexStyles'
        });
        return this._utilityService.getRequest(url);
    };
    /**
     * GET Call for retrieving map pin image
     * @author Nikola Gavric
     */
    StyleManagementService.prototype.getMapPinImage = function () {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/pin', {
            pageId: 'riskIndexStyles'
        });
        return this._utilityService.getRequest(url);
    };
    /* --------------- POST --------------- */
    /**
     * POST Call for creating an Placeholder
     * @author Nikola Gavric
     */
    StyleManagementService.prototype.createStyle = function (data) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: 'riskIndexStyles'
        });
        return this._utilityService.postRequest(url, data);
    };
    /**
     * POST Call for changing pin icon
     * @author Nikola Gavric
     */
    StyleManagementService.prototype.changeMapPin = function (data) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/pin');
        return this._utilityService.postRequest(url, data);
    };
    /* --------------- PUT --------------- */
    /**
     * PUT Call for updating an Placeholder
     * @author Nikola Gavric
     */
    StyleManagementService.prototype.updateStyle = function (data) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl, {
            pageId: 'riskIndexStyles'
        });
        return this._utilityService.putRequest(url, data);
    };
    /* --------------- DELETE --------------- */
    /**
     * DELETE Call for removing an alert
     * @author Nikola Gavric
     */
    StyleManagementService.prototype.removeStyle = function (data) {
        var url = this._utilityService.generateUrlWithQueryParams(this.baseUrl + '/' + data.id, {
            pageId: 'riskIndexStyles'
        });
        return this._utilityService.deleteRequest(url);
    };
    /* --------------- Utility methods --------------- */
    /**
     * Create/Update call for Placeholder
     * @author Nikola Gavric
     */
    StyleManagementService.prototype.createOrUpdateStyle = function (data) {
        if (data.id)
            return this.updateStyle(data);
        else
            return this.createStyle(data);
    };
    StyleManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_service_1.UtilityService])
    ], StyleManagementService);
    return StyleManagementService;
}());
exports.StyleManagementService = StyleManagementService;
//# sourceMappingURL=kjgri.style.service.js.map
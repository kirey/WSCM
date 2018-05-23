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
var utility_service_1 = require('../../../services/utility.service');
/**
 * Phone input component service for retrieving data required
 * by phone input component
 *
 * @author Nikola Gavric
 */
var PhoneInputService = (function () {
    function PhoneInputService(_http) {
        this._http = _http;
    }
    /**
     * Rest GET call for getting all countries
     *
     * @author Nikola Gavric
     */
    PhoneInputService.prototype.getAvailableCountries = function () {
        return this._http.get('rest/clientCompanies/countries')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    PhoneInputService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PhoneInputService);
    return PhoneInputService;
}());
exports.PhoneInputService = PhoneInputService;
//# sourceMappingURL=phoneInput.service.js.map
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
var AdminTranslationService = (function () {
    function AdminTranslationService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/adminTranslation/';
    }
    /**
     * Rest GET call for all existing languages
     * @author Stefan Svrkota
     */
    AdminTranslationService.prototype.getLanguagesRest = function () {
        return this._http.get(this.baseUrl + 'languages')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call for all available languages
     * @author Stefan Svrkota
     */
    AdminTranslationService.prototype.getAvailableLanguagesRest = function () {
        return this._http.get(this.baseUrl + 'availableLanguages')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call for all sections from database
     * @author Stefan Svrkota
     */
    AdminTranslationService.prototype.getSectionsRest = function () {
        return this._http.get(this.baseUrl + 'section')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest PUT call for editing section
     * @author Stefan Svrkota
     */
    AdminTranslationService.prototype.editSectionRest = function (sectionName, editedSectionName) {
        return this._http.put(this.baseUrl + 'section?sectionName=' + sectionName + '&editedSectionName=' + editedSectionName + '&pageId=adminTranslation', '')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest DELETE call for deleting selected section
     * @author Stefan Svrkota
     */
    AdminTranslationService.prototype.deleteSectionRest = function (sectionName) {
        return this._http.delete(this.baseUrl + 'section?section=' + sectionName + '&pageId=adminTranslation')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call for modules from database based on selected section
     * @author Stefan Svrkota
     */
    AdminTranslationService.prototype.getModulesRest = function (sectionName) {
        return this._http.get(this.baseUrl + 'module?section=' + sectionName + '&pageId=adminTranslation')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest PUT call for editing module
     * @author Stefan Svrkota
     */
    AdminTranslationService.prototype.editModuleRest = function (moduleName, editedModuleName) {
        return this._http.put(this.baseUrl + 'module?moduleName=' + moduleName + '&editedModuleName=' + editedModuleName + '&pageId=adminTranslation', '')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest DELETE call for deleting selected module
     * @author Stefan Svrkota
     */
    AdminTranslationService.prototype.deleteModuleRest = function (moduleName) {
        return this._http.delete(this.baseUrl + 'module?name=' + moduleName + '&pageId=adminTranslation')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call for translations from database based on selected section and module
     * @author Stefan Svrkota
     */
    AdminTranslationService.prototype.getTranslationsRest = function (menu) {
        return this._http.get(this.baseUrl + 'translation?module=' + menu + '&pageId=adminTranslation')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest POST call for adding one or more translations to database. Also used for adding section or module
     * @author Kirey
     */
    AdminTranslationService.prototype.addTranslationRest = function (list) {
        return this._http.post(this.baseUrl + 'translation?pageId=adminTranslation', list)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest PUT call for editing translation
     * @author Stefan Svrkota
     */
    AdminTranslationService.prototype.editTranslationRest = function (key) {
        return this._http.put(this.baseUrl + 'translation?pageId=adminTranslation', key)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest DELETE call for deleting selected translation
     * @author Stefan Svrkota
     */
    AdminTranslationService.prototype.deleteTranslationRest = function (genericName) {
        return this._http.delete(this.baseUrl + 'translation?name=' + genericName + '&pageId=adminTranslation')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest POST call for uploading file that contains translations
     * @author DynTech
     */
    AdminTranslationService.prototype.uploadCsvFileRest = function (formData, override) {
        return this._http.post(this.baseUrl + 'uploadTranslation?pageId=adminTranslation&checked=' + override, formData)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    AdminTranslationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AdminTranslationService);
    return AdminTranslationService;
}());
exports.AdminTranslationService = AdminTranslationService;
//# sourceMappingURL=adminTranslation.service.js.map
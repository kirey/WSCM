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
var ClassLoadingService = (function () {
    function ClassLoadingService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/classLoading/';
    }
    /**
     * Rest POST call for class upload
     * @author Kirey
     */
    ClassLoadingService.prototype.uploadRest = function (formData) {
        return this._http.post(this.baseUrl + 'classes?pageId=classLoading', formData)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call for getting all classes
     * @author Kirey
     */
    ClassLoadingService.prototype.getAllClassesRest = function () {
        return this._http.get(this.baseUrl + 'classes?pageId=classLoading')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call for getting all categories
     * @author Stefan Svrkota
     */
    ClassLoadingService.prototype.getAllCategoriesRest = function () {
        return this._http.get(this.baseUrl + 'categories?pageId=classLoading')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest DELETE call for class delete
     * @author Kirey
     */
    ClassLoadingService.prototype.deleteClassRest = function (className) {
        return this._http.delete(this.baseUrl + 'classes?pageId=classLoading&name=' + className)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call for class edit
     * @author Kirey
     */
    ClassLoadingService.prototype.getEditClassRest = function (className) {
        return this._http.get(this.baseUrl + 'classes/info?pageId=classLoading&name=' + className)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest POST call for class edit
     * @author Kirey
     */
    ClassLoadingService.prototype.postEditClassRest = function (formData) {
        return this._http.post(this.baseUrl + 'classes/edited?pageId=classLoading', formData)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call for class status change
     * @author Kirey
     */
    ClassLoadingService.prototype.changeStatusRest = function (checked, classId) {
        var temp;
        if (checked == true)
            temp = 1;
        else
            temp = 0;
        return this._http.post(this.baseUrl + 'classes/checkmarks/' + classId + '?pageId=classLoading&checked=' + temp, "")
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest GET call for status change of all c;asses
     * @author Kirey
     */
    ClassLoadingService.prototype.changeAllStatusesRest = function (checked) {
        var temp;
        if (checked == true)
            temp = 1;
        else
            temp = 0;
        return this._http.post(this.baseUrl + 'classes/checkmarks?pageId=classLoading&checked=' + temp, "")
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * JVM
     * @author Kirey
     */
    ClassLoadingService.prototype.enabledClassesInMemoryRest = function () {
        return this._http.put(this.baseUrl + 'classes/load', "")
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    ClassLoadingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ClassLoadingService);
    return ClassLoadingService;
}());
exports.ClassLoadingService = ClassLoadingService;
//# sourceMappingURL=classLoading.service.js.map
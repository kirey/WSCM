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
var utility_service_1 = require('../../shared/services/utility.service');
var CategoryService = (function () {
    function CategoryService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/classLoading/';
    }
    /**
     * Rest GET call for getting all categories
     * @author Stefan Svrkota
     */
    CategoryService.prototype.getAllCategoriesRest = function () {
        return this._http.get(this.baseUrl + 'categories?pageId=classLoading')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest POST call for category adding
     * @author Stefan Svrkota
     */
    CategoryService.prototype.addCategoryRest = function (categoryObject) {
        return this._http.post(this.baseUrl + 'categories', categoryObject)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest PUT call for category editing
     * @author Stefan Svrkota
     */
    CategoryService.prototype.editCategoryRest = function (categoryObject) {
        return this._http.put(this.baseUrl + 'categories?pageId=classLoading', categoryObject)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Rest DELETE call for category delete
     * @author Stefan Svrkota
     */
    CategoryService.prototype.deleteCategoryRest = function (categoryId) {
        return this._http.delete(this.baseUrl + 'categories/' + categoryId + '?pageId=classLoading')
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    CategoryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CategoryService);
    return CategoryService;
}());
exports.CategoryService = CategoryService;
//# sourceMappingURL=categories.service.js.map
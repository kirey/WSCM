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
var utility_service_1 = require('../shared/services/utility.service');
var GenericsService = (function () {
    function GenericsService(_http) {
        this._http = _http;
        this._baseUrl = "rest/generics";
    }
    ;
    /**
     * retrieve all generics from database
     * @author Roxana
     */
    GenericsService.prototype.getGenericsRest = function () {
        return this._http.get(this._baseUrl)
            .map(function (resp) { return resp = resp.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * delete generics with selected category
     * @author Roxana
     */
    GenericsService.prototype.deleteCategoryRest = function (category) {
        return this._http.delete(this._baseUrl + "/deleteCategory/" + category).map(function (resp) { return resp = resp.json(); });
    };
    /**
     * delete generics with selected category and subcategory
     * @author Roxana
     */
    GenericsService.prototype.deleteSubcategoryRest = function (category, subcategory) {
        return this._http.delete(this._baseUrl + "/deleteSubcategory/" + category + "/" + subcategory)
            .map(function (resp) { return resp = resp.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * delete generics by key
     * @author Roxana
     */
    GenericsService.prototype.deleteGenericRest = function (key) {
        return this._http.delete(this._baseUrl + "/" + key)
            .map(function (resp) { return resp = resp.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * update generic
     * @author Roxana
     */
    GenericsService.prototype.saveGenericRest = function (generic, pageId) {
        return this._http.post(this._baseUrl + "?pageId=" + pageId, generic)
            .map(function (resp) { return resp = resp.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * update generic
     * @author Roxana
     */
    GenericsService.prototype.updateGenericRest = function (generic, oldKey, pageId) {
        return this._http.put(this._baseUrl + "?oldKey=" + oldKey + "&pageId=" + pageId, generic)
            .map(function (resp) { return resp = resp.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * filter generics displayed on page by category and subcategory
     * @author Roxana
     */
    GenericsService.prototype.getFilteredResultsRest = function (category, subcategory) {
        return this._http.get(this._baseUrl + "/filterResult/" + category + "/" + subcategory)
            .map(function (resp) { return resp = resp.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * update the key of all generics in the selected category
     * send oldCategory to know which generics must be updated
     * @author Roxana
     */
    GenericsService.prototype.updateCategoryRest = function (oldCategory, newCategory) {
        var options = {
            "oldCategory": oldCategory,
            "newCategory": newCategory
        };
        return this._http.put(this._baseUrl + "/updateCategory", options)
            .map(function (resp) { return resp = resp.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * update the key of all generics in the selected category and subcategory
     * send oldSubcategory to know which generics must be updated
     * @author Roxana
     */
    GenericsService.prototype.updateSubcategoryRest = function (category, oldSubcategory, newSubcategory) {
        var options = {
            "category": category,
            "oldSubcategory": oldSubcategory,
            "newSubcategory": newSubcategory
        };
        return this._http.put(this._baseUrl + "/updateSubcategory", options)
            .map(function (resp) { return resp = resp.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    GenericsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GenericsService);
    return GenericsService;
}());
exports.GenericsService = GenericsService;
//# sourceMappingURL=generics.service.js.map
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
var categories_service_1 = require('./categories.service');
var ng2_translate_1 = require('ng2-translate');
var utility_service_1 = require('../../shared/services/utility.service');
var app_service_1 = require('../../shared/services/app.service');
var models_1 = require('../../shared/models');
var CategoriesCmp = (function () {
    function CategoriesCmp(_appService, _categoriesService, _translateService, _utilityService) {
        this._appService = _appService;
        this._categoriesService = _categoriesService;
        this._translateService = _translateService;
        this._utilityService = _utilityService;
    }
    /**
     * Get all categories from database
     * @author Stefan Svrkota
     */
    CategoriesCmp.prototype.getAllCategories = function () {
        var _this = this;
        this.subscriptions['getAllCategories'] = this._categoriesService.getAllCategoriesRest().subscribe(function (res) {
            _this.allCategories = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Add new category
     * @author Stefan Svrkota
     */
    CategoriesCmp.prototype.addCategory = function (modal) {
        var _this = this;
        var categoryObject = {
            name: this.categoryAdd
        };
        this.subscriptions['addCategory'] = this._categoriesService.addCategoryRest(categoryObject).subscribe(function (res) {
            _this.categoryFormErrors = new models_1.RestResponse();
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.getAllCategories();
            _this.categoryAdd = "";
            _this.hideModal(modal);
        }, function (err) {
            _this.categoryFormErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Add new category
     * @author Stefan Svrkota
     */
    CategoriesCmp.prototype.editCategorySubmit = function (modal) {
        var _this = this;
        this.subscriptions['editCategory'] = this._categoriesService.editCategoryRest(this.categoryEditObject).subscribe(function (res) {
            _this.categoryEditFormErrors = new models_1.RestResponse();
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.getAllCategories();
            _this.categoryEditObject = {};
            _this.categoryEditName = "";
            _this.hideModal(modal);
        }, function (err) {
            _this.categoryEditFormErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Delete category
     * @author Stefan Svrkota
     */
    CategoriesCmp.prototype.deleteCategory = function (categoryObjectId, modal) {
        var _this = this;
        this.subscriptions['deleteCategory'] = this._categoriesService.deleteCategoryRest(categoryObjectId).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.getAllCategories();
            _this.categoryDeleteObject = {};
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Refresh data table
     * @author Stefan Svrkota
     */
    CategoriesCmp.prototype.refreshTable = function (table) {
        this.getAllCategories();
        table.reset();
    };
    /**
     * Display modal for category delete
     * @author Stefan Svrkota
     */
    CategoriesCmp.prototype.openModal = function (modal, operation, object) {
        if (operation == 'delete') {
        }
        else if (operation == 'add') {
        }
        else if (operation == 'edit') {
        }
    };
    /**
     * Showing modal
     * @author Mario Petrovic
     */
    CategoriesCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        this.operation = modalName;
        switch (modalName) {
            case 'addCategory':
                this.categoryAdd = "";
                this.categoryFormErrors = new models_1.RestResponse();
                this._utilityService.setAlert(this.componentAlert);
                break;
            case 'editCategory':
                this.categoryEditFormErrors = new models_1.RestResponse();
                this._utilityService.setAlert(this.componentAlert);
                this.categoryEditObject = this._utilityService.copy(data);
                this.categoryEditName = data.name;
                break;
            case 'deleteCategory':
                this.categoryDeleteObject = data;
                break;
        }
        modal.show();
    };
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    CategoriesCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /*--------- NG On Init ---------*/
    CategoriesCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        // Variable initialization
        this.subscriptions = {};
        this.categoryEditObject = {};
        this.categoryEditName = "";
        this.categoryAdd = "";
        this.componentAlert = new models_1.Alert(null, true);
        this.getAllCategories();
        this._appService.languageChangeForComponent(this);
    };
    /*--------- NG On Destroy ---------*/
    CategoriesCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    CategoriesCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'categories.cmp.html'
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, categories_service_1.CategoryService, ng2_translate_1.TranslateService, utility_service_1.UtilityService])
    ], CategoriesCmp);
    return CategoriesCmp;
}());
exports.CategoriesCmp = CategoriesCmp;
//# sourceMappingURL=categories.cmp.js.map
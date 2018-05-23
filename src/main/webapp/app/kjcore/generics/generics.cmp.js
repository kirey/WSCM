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
var ng2_translate_1 = require('ng2-translate');
var utility_service_1 = require('../shared/services/utility.service');
var app_service_1 = require('../shared/services/app.service');
var generics_service_1 = require('./generics.service');
var models_1 = require('./models');
var models_2 = require('../shared/models');
var GenericsCmp = (function () {
    function GenericsCmp(_utilityService, _genericsService, _appService, _translateService) {
        this._utilityService = _utilityService;
        this._genericsService = _genericsService;
        this._appService = _appService;
        this._translateService = _translateService;
        this.editedCategory = "";
        this.editedSubcategory = "";
        this.insertNewSubcategory = false;
        this.selectedDate = "";
        this.refreshEditableGenerics();
        this.resetNewGenericObject();
        this.categories = new Array();
        this.selectedCategory = {};
        this.componentAlert = new models_2.Alert(3000, true);
        this._pageId = "genericsValidation";
    }
    /*--------- NG On Init ---------*/
    GenericsCmp.prototype.ngOnInit = function () {
        this._appService.pageLoaded('', this);
        this.subscriptions = {};
        this.getAllGenerics();
        this._appService.languageChangeForComponent(this);
    };
    /*--------- NG On Destroy ---------*/
    GenericsCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    /**
     * retrieve all generics from database
     * @author Roxana
     */
    GenericsCmp.prototype.getAllGenerics = function () {
        var This = this;
        this.subscriptions["getGenerics"] = this._genericsService.getGenericsRest().subscribe(function (res) {
            // console.log(res);
            This.generics = res.data.kjcGenericsList;
            This.customDataTypes = res.data.customType;
            This.getCategoriesAndSubcategories();
        }, function (error) {
            // console.log(err);
        });
    };
    /**
     * filter all generics by selected category and subcategory
     * @author Roxana
     */
    GenericsCmp.prototype.getFilteredData = function () {
        var This = this;
        this.subscriptions["getFilteredGenerics"] = this._genericsService.getFilteredResultsRest(this.selectedCategory["name"], this.selectedSubcategory).subscribe(function (res) {
            This.generics = res.data;
        });
    };
    /**
     * refresh the editable generic model
     * @author Roxana
     */
    GenericsCmp.prototype.refreshEditableGenerics = function () {
        this.editableGeneric = {
            "genericModel": new models_1.GenericsModel(),
            "category": "",
            "subcategory": "",
            "name": ""
        };
    };
    GenericsCmp.prototype.resetNewGenericObject = function () {
        this.newGeneric = {
            "genericModel": new models_1.GenericsModel(),
            "category": "",
            "subcategory": "",
            "name": ""
        };
        this.newGeneric["genericModel"].keyType = "String";
    };
    /**
    * update selected subcategory
    * @author Roxana
    */
    GenericsCmp.prototype.editSelectedSubcategory = function (modal) {
        var _this = this;
        this.refreshEditableGenerics();
        this.resetNewGenericObject();
        this.subscriptions["updateSubcategory"] = this._genericsService.updateSubcategoryRest(this.selectedCategory["name"], this.selectedSubcategory, this.editedSubcategory).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.setAlertDismissible(res);
            _this.resetPageValues();
            _this.getAllGenerics();
            _this.hideModal(modal);
        }, function (err) {
            // console.log(err);
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * update selected category
     * @author Roxana
     */
    GenericsCmp.prototype.editSelectedCategory = function (modal) {
        var _this = this;
        this.refreshEditableGenerics();
        this.resetNewGenericObject();
        this.subscriptions["updateCategory"] = this._genericsService.updateCategoryRest(this.selectedCategory["name"], this.editedCategory).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.setAlertDismissible(res);
            _this.getAllGenerics();
            _this.resetPageValues();
            _this.refreshEditableGenerics();
            _this.hideModal(modal);
        }, function (err) {
            // console.log(err);
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
    * Sets default value to false if key type is boolean
    * @author Stefan Svrkota
    */
    GenericsCmp.prototype.keyTypeChange = function (event) {
        if (event == 'Boolean') {
            this.newGeneric['genericModel'].value = false;
        }
    };
    /**
    * insert new generic parameter into database
    * @author Roxana
    */
    GenericsCmp.prototype.insertNewGeneric = function () {
        var _this = this;
        if (this.newGeneric["genericModel"].keyType == "Date") {
            if (this.selectedDate != "") {
                this.newGeneric["genericModel"].value = this.selectedDate;
            }
        }
        this.newGeneric["genericModel"].key = this.newGeneric["category"] + "." + this.newGeneric["subcategory"] + "." + this.newGeneric["name"];
        this.subscriptions["insertGeneric"] = this._genericsService.saveGenericRest(this.newGeneric["genericModel"], this._pageId).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.setAlertDismissible(res);
            _this.getAllGenerics();
            _this.resetNewGenericObject();
            _this.resetPageValues();
            _this.selectedDate = "";
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
    * update generic parameter
    * send old key to identify the edited generic in case the key changed
    * @author Roxana
    */
    GenericsCmp.prototype.updateGeneric = function (modal) {
        var _this = this;
        if (this.editableGeneric["genericModel"].keyType == "Date") {
            if (this.editableGeneric != "") {
                this.editableGeneric["genericModel"].value = this.selectedDate;
            }
        }
        var oldKey = this.editableGeneric["genericModel"].key;
        this.editableGeneric["genericModel"].key = this.editableGeneric["category"] + "." + this.editableGeneric["subcategory"] + "." + this.editableGeneric["name"];
        this.subscriptions["updateGeneric"] = this._genericsService.updateGenericRest(this.editableGeneric["genericModel"], oldKey, this._pageId).subscribe(function (res) {
            _this.setAlertDismissible(res);
            _this.getAllGenerics();
            _this.resetPageValues();
            _this.selectedDate = "";
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
    * populate subcategory filter dropdown according to selected category
    * @author Roxana
    */
    GenericsCmp.prototype.getSubcategories = function () {
        this.subcategories = new Array();
        if (this.selectedCategory) {
            this.selectedSubcategory = null;
            this.subcategories = this.selectedCategory["subcategories"];
        }
    };
    /**
     * refresh data in the table
     * if any filter is selected keep the selected category and subcategory
     * @author Roxana
     */
    GenericsCmp.prototype.refreshData = function () {
        if (this.selectedCategory["name"] && this.selectedCategory) {
            this.getFilteredData();
        }
        else
            this.getAllGenerics();
    };
    /**
     * display the alert with the res and hide it after certain interval
     * @author Roxana
     */
    GenericsCmp.prototype.setAlertDismissible = function (res) {
        this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
        var This = this;
        // setTimeout(function () {
        //     This._utilityService.setAlert(This.componentAlert);
        // }, 3000);
    };
    /**
    * called when user clicks on edit button
    * populate editableGeneric fields with the key components and details of the selected generic
    * @author Roxana
    */
    GenericsCmp.prototype.editGenericClick = function (generic) {
        this.selectedDate = "";
        var keyComponents = generic.key.split(".");
        this.editableGeneric = this.parseGenericKey(generic.key);
        this.editableGeneric.genericModel = JSON.parse(JSON.stringify(generic));
        if (this.editableGeneric.genericModel.keyType == 'Date') {
            this.selectedDate = this.editableGeneric.genericModel.value;
        }
        else if (this.editableGeneric.genericModel.keyType == 'Boolean') {
            if (this.editableGeneric.genericModel.value == "false") {
                this.editableGeneric.genericModel.value = false;
            }
        }
    };
    /**
    * set the type of the item that needs to be deleted and the itemToDelete
    * this function is used for reducing the number of confirmation modals for delete, to use the same modal for deleting the category, subcategory or key
    * @author Roxana
    */
    GenericsCmp.prototype.setDeleteDetails = function (type, selectedItem) {
        this.itemToDelete = selectedItem;
        this.itemType = type;
    };
    /**
    * when the user confirms the delete of an item call the corresponding delete function for the type of the selected item
    * @author Roxana
    */
    GenericsCmp.prototype.confirmDelete = function (modal) {
        var _this = this;
        this.refreshEditableGenerics();
        this.resetNewGenericObject();
        switch (this.itemType) {
            case "category":
                this.subscriptions["deleteCategory"] = this._genericsService.deleteCategoryRest(this.itemToDelete).subscribe(function (res) {
                    _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                    _this.getAllGenerics();
                    _this.resetPageValues();
                    _this.setAlertDismissible(res);
                    _this.hideModal(modal);
                }, function (err) {
                    _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
                });
                break;
            case "subcategory":
                this.subscriptions["deleteSubcategory"] = this._genericsService.deleteSubcategoryRest(this.selectedCategory["name"], this.itemToDelete).subscribe(function (res) {
                    _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                    _this.getAllGenerics();
                    _this.resetPageValues();
                    _this.setAlertDismissible(res);
                    _this.hideModal(modal);
                }, function (err) {
                    _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
                });
                break;
            case "generic":
                this.subscriptions["deleteGeneric"] = this._genericsService.deleteGenericRest(this.itemToDelete).subscribe(function (res) {
                    if (_this.selectedCategory["name"] && _this.selectedSubcategory) {
                        _this.getFilteredData();
                    }
                    else {
                        _this.getAllGenerics();
                        _this.resetPageValues();
                    }
                    _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                    _this.setAlertDismissible(res);
                    _this.hideModal(modal);
                }, function (err) {
                    _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
                });
                break;
            default:
                break;
        }
    };
    /**
     *reset page variable values
     * @author Roxana
     */
    GenericsCmp.prototype.resetPageValues = function () {
        this.selectedCategory = {};
        this.selectedSubcategory = null;
    };
    /**
    * parse the key of all generics and build a list with categories and subcategories to populate filter dropdown
    * @author Roxana
    */
    GenericsCmp.prototype.getCategoriesAndSubcategories = function () {
        this.categories = new Array();
        for (var _i = 0, _a = this.generics; _i < _a.length; _i++) {
            var generic = _a[_i];
            var keyObject = this.parseGenericKey(generic.key);
            var newCategory = {};
            var subcategs = this.categoryExists(keyObject["category"]);
            //category doesn't exists, add it to the object
            if (subcategs == null) {
                newCategory["name"] = keyObject["category"];
                newCategory["subcategories"] = new Array();
                newCategory["subcategories"].push(keyObject["subcategory"]);
                this.categories.push(newCategory);
            }
            else {
                //check to see if the subcategory exists
                if (subcategs.indexOf(keyObject["subcategory"]) == -1) {
                    subcategs.push(keyObject["subcategory"]);
                }
            }
        }
        // console.log(this.categories);
    };
    /**
     * check if a certain category exists in the categories array of objects
     * if category exists return the subcategories otherwise return null
     * @author Roxana
     */
    GenericsCmp.prototype.categoryExists = function (category) {
        var i = 0;
        for (i = 0; i < this.categories.length; i++) {
            if (this.categories[i].name == category) {
                return this.categories[i].subcategories;
            }
        }
        return null;
    };
    /**
     * parse the key that looks like category.subcategory.name and builds an object with category, subcategory and name properties
     * @author Roxana
     */
    GenericsCmp.prototype.parseGenericKey = function (key) {
        var keyComponents = key.split(".");
        var nrOfComponents = keyComponents.length;
        var parsedKey = {};
        var i = 0;
        if (nrOfComponents < 3) {
        }
        else {
            parsedKey["category"] = keyComponents[0];
            parsedKey["subcategory"] = "";
            for (i = 1; i < nrOfComponents - 1; i++) {
                parsedKey["subcategory"] += keyComponents[i];
                if (i != nrOfComponents - 2)
                    parsedKey["subcategory"] += ".";
            }
            parsedKey["name"] = keyComponents[nrOfComponents - 1];
        }
        return parsedKey;
    };
    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Mario Petrovic
     */
    GenericsCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        switch (modalName) {
            case 'editCategory':
                this.showNewGenericForm = false;
                this.editedCategory = data;
                modal.show();
                break;
            case 'deleteCategory':
                this.showNewGenericForm = false;
                this.setDeleteDetails('category', data);
                modal.show();
                break;
            case 'editSubCategory':
                this.showNewGenericForm = false;
                this.editedSubcategory = data;
                modal.show();
                break;
            case 'deleteSubCategory':
                this.showNewGenericForm = false;
                this.setDeleteDetails('subcategory', data);
                modal.show();
                break;
            case 'editGeneric':
                this.showNewGenericForm = false;
                this.editGenericClick(data);
                modal.show();
                break;
            case 'deleteGeneric':
                this.showNewGenericForm = false;
                this.setDeleteDetails('generic', data);
                modal.show();
                break;
        }
    };
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    GenericsCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    GenericsCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'generics.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, generics_service_1.GenericsService, app_service_1.AppService, ng2_translate_1.TranslateService])
    ], GenericsCmp);
    return GenericsCmp;
}());
exports.GenericsCmp = GenericsCmp;
//# sourceMappingURL=generics.cmp.js.map
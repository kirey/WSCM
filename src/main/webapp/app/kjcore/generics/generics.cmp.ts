import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ng2-bootstrap';

import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';

import { GenericsService } from './generics.service';
import { GenericsModel } from './models';

import { Alert, RestResponse } from '../shared/models';

@Component({
    moduleId: module.id,
    templateUrl: 'generics.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class GenericsCmp implements OnInit {
    generics: GenericsModel[];
    editableGeneric: any;
    categories: any;
    selectedCategory: {};
    selectedSubcategory: string;
    subcategories: {};
    customDataTypes: any;
    currentAction: string;
    itemToDelete: any;
    itemType: string;
    newGeneric: {};
    editedCategory: string = "";
    editedSubcategory: string = "";
    insertNewSubcategory: boolean = false;
    componentAlert: Alert;
    _pageId: string;
    oldKey: string;
    subscriptions: {};
    selectedDate: string = "";
    showNewGenericForm: boolean;

    constructor(
        private _utilityService: UtilityService,
        private _genericsService: GenericsService,
        private _appService: AppService,
        private _translateService: TranslateService
    ) {
        this.refreshEditableGenerics();
        this.resetNewGenericObject();
        this.categories = new Array();
        this.selectedCategory = {};
        this.componentAlert = new Alert(3000, true);
        this._pageId = "genericsValidation";
    }
    /*--------- NG On Init ---------*/
    ngOnInit() {

        this._appService.pageLoaded('', this);
        this.subscriptions = {};
        this.getAllGenerics();
        this._appService.languageChangeForComponent(this);
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }

    /**
     * retrieve all generics from database
     * @author Roxana
     */
    getAllGenerics() {
        let This = this;
        this.subscriptions["getGenerics"] = this._genericsService.getGenericsRest().subscribe(
            (res: RestResponse<any>) => {
                // console.log(res);
                This.generics = res.data.kjcGenericsList;
                This.customDataTypes = res.data.customType;
                This.getCategoriesAndSubcategories();
            }, (error: RestResponse<any>) => {
                // console.log(err);
            })
    }

    /**
     * filter all generics by selected category and subcategory
     * @author Roxana
     */
    getFilteredData() {
        let This = this;
        this.subscriptions["getFilteredGenerics"] = this._genericsService.getFilteredResultsRest(this.selectedCategory["name"], this.selectedSubcategory).subscribe(
            (res: RestResponse<any>) => {
                This.generics = res.data;
            }
        )
    }

    /**
     * refresh the editable generic model
     * @author Roxana
     */
    refreshEditableGenerics() {
        this.editableGeneric = {
            "genericModel": new GenericsModel(),
            "category": "",
            "subcategory": "",
            "name": ""
        }
    }

    resetNewGenericObject() {
        this.newGeneric = {
            "genericModel": new GenericsModel(),
            "category": "",
            "subcategory": "",
            "name": ""
        }
        this.newGeneric["genericModel"].keyType = "String";
    }

    /**
    * update selected subcategory
    * @author Roxana
    */
    editSelectedSubcategory(modal: ModalDirective) {
        this.refreshEditableGenerics();
        this.resetNewGenericObject();
        this.subscriptions["updateSubcategory"] = this._genericsService.updateSubcategoryRest(this.selectedCategory["name"], this.selectedSubcategory, this.editedSubcategory).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.setAlertDismissible(res);
                this.resetPageValues();
                this.getAllGenerics();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                // console.log(err);
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
     * update selected category
     * @author Roxana
     */
    editSelectedCategory(modal: ModalDirective) {
        this.refreshEditableGenerics();
        this.resetNewGenericObject();
        this.subscriptions["updateCategory"] = this._genericsService.updateCategoryRest(this.selectedCategory["name"], this.editedCategory).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.setAlertDismissible(res);
                this.getAllGenerics();
                this.resetPageValues();
                this.refreshEditableGenerics();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                // console.log(err);
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
    * Sets default value to false if key type is boolean
    * @author Stefan Svrkota
    */
    keyTypeChange(event: any) {
        if (event == 'Boolean') {
            this.newGeneric['genericModel'].value = false;
        }
    }

    /**
    * insert new generic parameter into database
    * @author Roxana
    */
    insertNewGeneric() {
        if (this.newGeneric["genericModel"].keyType == "Date") {
            if (this.selectedDate != "") {
                this.newGeneric["genericModel"].value = this.selectedDate;
            }
        }
        this.newGeneric["genericModel"].key = this.newGeneric["category"] + "." + this.newGeneric["subcategory"] + "." + this.newGeneric["name"];
        this.subscriptions["insertGeneric"] = this._genericsService.saveGenericRest(this.newGeneric["genericModel"], this._pageId).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.setAlertDismissible(res);
                this.getAllGenerics();
                this.resetNewGenericObject();
                this.resetPageValues();
                this.selectedDate = "";
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
    * update generic parameter
    * send old key to identify the edited generic in case the key changed
    * @author Roxana
    */
    updateGeneric(modal: ModalDirective) {
        if (this.editableGeneric["genericModel"].keyType == "Date") {
            if (this.editableGeneric != "") {
                this.editableGeneric["genericModel"].value = this.selectedDate;
            }
        }
        let oldKey = this.editableGeneric["genericModel"].key;
        this.editableGeneric["genericModel"].key = this.editableGeneric["category"] + "." + this.editableGeneric["subcategory"] + "." + this.editableGeneric["name"];
        this.subscriptions["updateGeneric"] = this._genericsService.updateGenericRest(this.editableGeneric["genericModel"], oldKey, this._pageId).subscribe(
            (res: RestResponse<any>) => {
                this.setAlertDismissible(res);
                this.getAllGenerics();
                this.resetPageValues();
                this.selectedDate = "";
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }

    /**
    * populate subcategory filter dropdown according to selected category
    * @author Roxana
    */
    getSubcategories() {
        this.subcategories = new Array();
        if (this.selectedCategory) {
            this.selectedSubcategory = null;
            this.subcategories = this.selectedCategory["subcategories"];
        }
    }

    /**
     * refresh data in the table
     * if any filter is selected keep the selected category and subcategory
     * @author Roxana
     */
    refreshData() {
        if (this.selectedCategory["name"] && this.selectedCategory) {
            this.getFilteredData();
        }
        else
            this.getAllGenerics();
    }

    /**
     * display the alert with the res and hide it after certain interval
     * @author Roxana
     */
    setAlertDismissible(res: RestResponse<any>) {
        this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
        let This = this;
        // setTimeout(function () {
        //     This._utilityService.setAlert(This.componentAlert);
        // }, 3000);
    }

    /**
    * called when user clicks on edit button
    * populate editableGeneric fields with the key components and details of the selected generic
    * @author Roxana
    */
    editGenericClick(generic: GenericsModel) {
        this.selectedDate = "";
        let keyComponents = generic.key.split(".");
        this.editableGeneric = this.parseGenericKey(generic.key);
        this.editableGeneric.genericModel = JSON.parse(JSON.stringify(generic));
        if (this.editableGeneric.genericModel.keyType == 'Date') {
            this.selectedDate = this.editableGeneric.genericModel.value;
        } else if (this.editableGeneric.genericModel.keyType == 'Boolean') {
            if (this.editableGeneric.genericModel.value == "false") {
                this.editableGeneric.genericModel.value = false;
            }
        }

    }

    /**
    * set the type of the item that needs to be deleted and the itemToDelete
    * this function is used for reducing the number of confirmation modals for delete, to use the same modal for deleting the category, subcategory or key
    * @author Roxana
    */
    setDeleteDetails(type: string, selectedItem) {
        this.itemToDelete = selectedItem;
        this.itemType = type;
    }

    /**
    * when the user confirms the delete of an item call the corresponding delete function for the type of the selected item
    * @author Roxana
    */
    confirmDelete(modal: ModalDirective) {
        this.refreshEditableGenerics();
        this.resetNewGenericObject();
        switch (this.itemType) {
            case "category":
                this.subscriptions["deleteCategory"] = this._genericsService.deleteCategoryRest(this.itemToDelete).subscribe(
                    (res: RestResponse<any>) => {
                        this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                        this.getAllGenerics();
                        this.resetPageValues();
                        this.setAlertDismissible(res);
                        this.hideModal(modal);
                    },
                    (err: RestResponse<any>) => {
                        this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                    }
                )
                break;
            case "subcategory":
                this.subscriptions["deleteSubcategory"] = this._genericsService.deleteSubcategoryRest(this.selectedCategory["name"], this.itemToDelete).subscribe(
                    (res: RestResponse<any>) => {
                        this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                        this.getAllGenerics();
                        this.resetPageValues();
                        this.setAlertDismissible(res);
                        this.hideModal(modal);
                    },
                    (err: RestResponse<any>) => {
                        this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                    }
                )
                break;
            case "generic":
                this.subscriptions["deleteGeneric"] = this._genericsService.deleteGenericRest(this.itemToDelete).subscribe(
                    (res: RestResponse<any>) => {
                        if (this.selectedCategory["name"] && this.selectedSubcategory) {
                            this.getFilteredData();
                        }
                        else {
                            this.getAllGenerics();
                            this.resetPageValues();
                        }
                        this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                        this.setAlertDismissible(res);
                        this.hideModal(modal);
                    },
                    (err: RestResponse<any>) => {
                        this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                    }
                )
                break;
            default:
                break;
        }
    }

    /**
     *reset page variable values
     * @author Roxana
     */
    resetPageValues() {
        this.selectedCategory = {};
        this.selectedSubcategory = null;
    }

    /**
    * parse the key of all generics and build a list with categories and subcategories to populate filter dropdown
    * @author Roxana
    */
    getCategoriesAndSubcategories() {
        this.categories = new Array();
        for (let generic of this.generics) {
            let keyObject = this.parseGenericKey(generic.key);
            let newCategory = {};
            let subcategs = this.categoryExists(keyObject["category"]);
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
    }

    /**
     * check if a certain category exists in the categories array of objects
     * if category exists return the subcategories otherwise return null
     * @author Roxana
     */
    categoryExists(category: String) {
        let i = 0;
        for (i = 0; i < this.categories.length; i++) {
            if (this.categories[i].name == category) {
                return this.categories[i].subcategories;
            }
        }
        return null;
    }

    /**
     * parse the key that looks like category.subcategory.name and builds an object with category, subcategory and name properties
     * @author Roxana
     */
    parseGenericKey(key: String) {
        let keyComponents = key.split(".");
        let nrOfComponents = keyComponents.length;
        let parsedKey = {};
        let i = 0;
        if (nrOfComponents < 3) {
            // console.log("Error: key contains less than 3 components");
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
    }


    /**
     * Show modal based on passed modal directive and custom behaviour based on modalName and data
     * @author Mario Petrovic
     */
    showModal(modal: ModalDirective, modalName: string, data: any): void {
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
    }

    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    hideModal(modal: ModalDirective) {
        modal.hide();
    }
}
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { CategoryService } from './categories.service';

import { DataTable } from 'primeng/primeng';
import { TranslateService } from 'ng2-translate';

import { UtilityService } from '../../shared/services/utility.service';
import { AppService } from '../../shared/services/app.service';

import { Alert, RestResponse } from '../../shared/models';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    moduleId: module.id,
    templateUrl: 'categories.cmp.html'
})

export class CategoriesCmp implements OnInit {

    subscriptions: Object;
    componentAlert: Alert;

    allCategories: any;

    categoryFormErrors: RestResponse<any>;
    categoryEditFormErrors: RestResponse<any>;

    categoryEditName: string;
    categoryEditObject: any;
    categoryAdd: string;

    categoryDeleteObject: any;

    operation: string;

    constructor(
        private _appService: AppService,
        private _categoriesService: CategoryService,
        private _translateService: TranslateService,
        private _utilityService: UtilityService
    ) { }

    /**
     * Get all categories from database
     * @author Stefan Svrkota
     */
    getAllCategories() {
        this.subscriptions['getAllCategories'] = this._categoriesService.getAllCategoriesRest().subscribe(
            (res: RestResponse<any>) => {
                this.allCategories = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Add new category
     * @author Stefan Svrkota
     */
    addCategory(modal: ModalDirective) {
        let categoryObject = {
            name: this.categoryAdd
        }

        this.subscriptions['addCategory'] = this._categoriesService.addCategoryRest(categoryObject).subscribe(
            (res: RestResponse<any>) => {
                this.categoryFormErrors = new RestResponse();
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.getAllCategories();
                this.categoryAdd = "";
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this.categoryFormErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Add new category
     * @author Stefan Svrkota
     */
    editCategorySubmit(modal: ModalDirective) {
        this.subscriptions['editCategory'] = this._categoriesService.editCategoryRest(this.categoryEditObject).subscribe(
            (res: RestResponse<any>) => {
                this.categoryEditFormErrors = new RestResponse();
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.getAllCategories();
                this.categoryEditObject = {};
                this.categoryEditName = "";
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this.categoryEditFormErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Delete category
     * @author Stefan Svrkota
     */
    deleteCategory(categoryObjectId: number, modal: ModalDirective) {

        this.subscriptions['deleteCategory'] = this._categoriesService.deleteCategoryRest(categoryObjectId).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.getAllCategories();
                this.categoryDeleteObject = {};
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Refresh data table
     * @author Stefan Svrkota
     */
    refreshTable(table: DataTable): void {
        this.getAllCategories();
        table.reset();
    }

    /**
     * Display modal for category delete
     * @author Stefan Svrkota
     */
    openModal(modal: ModalDirective, operation: string, object?: any) {

        if (operation == 'delete') {
        } else if (operation == 'add') {
        } else if (operation == 'edit') {
        }
    }

    /**
     * Showing modal
     * @author Mario Petrovic
     */
    public showModal(modal: ModalDirective, modalName: string, data?: any) {
        this._utilityService.setAlert(this.componentAlert);
        
        this.operation = modalName;
        switch (modalName) {
            case 'addCategory':
                this.categoryAdd = "";
                this.categoryFormErrors = new RestResponse();
                this._utilityService.setAlert(this.componentAlert);
                break;

            case 'editCategory':
                this.categoryEditFormErrors = new RestResponse();
                this._utilityService.setAlert(this.componentAlert);
                this.categoryEditObject = this._utilityService.copy(data);
                this.categoryEditName = data.name;
                break;

            case 'deleteCategory':
                this.categoryDeleteObject = data;
                break;
        }

        modal.show()
    }

    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    hideModal(modal: ModalDirective) {
        modal.hide();
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        // Variable initialization
        this.subscriptions = {};
        this.categoryEditObject = {};
        this.categoryEditName = "";
        this.categoryAdd = "";
        this.componentAlert = new Alert(null, true);

        this.getAllCategories();
        this._appService.languageChangeForComponent(this);
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}
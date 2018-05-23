import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { UtilityService } from '../../shared/services/utility.service';
import { AppService } from '../../shared/services/app.service';
import { ValidationService } from '../../shared/services/validation.service';
import { AdminEmailConfigsService } from './adminEmailConfigs.service';

import { RestResponse, Alert } from '../../shared/models';
import { AdminEmailConfigs } from '../models';

import { TranslateService } from 'ng2-translate';
import { DataTable } from 'primeng/primeng';
import { ModalDirective } from 'ng2-bootstrap';

import { Constants } from "./../../constants";

/**
 * Component for Email Configurations page
 * @author Ciprian Dorofte
 */
@Component({
    moduleId: module.id,
    templateUrl: 'adminEmailConfigs.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class AdminEmailConfigsCmp implements OnInit {

    /*--------- Constructor --------*/
    constructor(
        private formBuilder: FormBuilder,
        private _adminEmailConfigsService: AdminEmailConfigsService,
        private _utilityService: UtilityService,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _constants: Constants) {
        this.listOfEmailConfigs = [];
        this.pageId = 'adminEmails';
    }

    @ViewChild('dataTable')
    dataTable: DataTable;
    @ViewChild('addEditFormModal')
    addEditFormModal: ModalDirective;

    /*-------- Email Configs VARIABLES --------*/
    listOfEmailConfigs: AdminEmailConfigs[];

    emailConfigs: AdminEmailConfigs;
    deletedEmailConfigs: AdminEmailConfigs;

    password: string;
    pageId: string;

    formErrors: RestResponse<any>;
    form: FormGroup;

    subscriptions: Object;
    componentAlert: Alert;

    isDisabledBtn: boolean;
    isAddForm: boolean;
    isLoadingAllEmailConfigs: boolean;
    isShowPassword: boolean;

    isInvalidForm: boolean;


    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        //Initialiaze Email configs variables
        this.formErrors = new RestResponse();
        this.emailConfigs = new AdminEmailConfigs();
        this.deletedEmailConfigs = new AdminEmailConfigs();

        this.isShowPassword = false;
        this.isAddForm = true;
        this.isDisabledBtn = false;

        this.password = "password";

        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);

        //Init set form controlls
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
            username: ['', [Validators.required, Validators.maxLength(255)]],
            password: ['', [Validators.required, Validators.maxLength(255)]],
            host: ['', [Validators.required, Validators.maxLength(255)]],
            port: ['', [Validators.required, Validators.maxLength(10), ValidationService.validateOnlyNumbers()]],
            emailAddress: ['', [Validators.required, Validators.maxLength(255), ValidationService.emailValidator()]],
            messageFrom: ['', [Validators.required, Validators.maxLength(255)]],
            description: ['', [Validators.maxLength(1000)]]
        });
        //-------------These two subscribers are for translation purpose---------------------
        this._appService.languageChanged.subscribe(lang => {
            this._appService.changeLangTranslate(this._translateService, lang);
        });

        this.getAllEmailsConfigs();

        this._appService.languageChangeForComponent(this, () => {
            this.getAllEmailsConfigs();
        })
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }

    /*-------- Email Configs SERVICE calls --------*/

    /**
     * This method is called when you want to retrieve all emails configurations from back-end
     * @author Ciprian Dorofte
     */
    getAllEmailsConfigs() {
        this.isLoadingAllEmailConfigs = true;
        this.subscriptions['loadAllEmailsConfigs'] = this._adminEmailConfigsService.getAllEmailsConfigsRest().subscribe(
            (res: RestResponse<any>) => this.listOfEmailConfigs = res.data,
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode),
                    this.isLoadingAllEmailConfigs = false;
            },
            () => this.isLoadingAllEmailConfigs = false);
    }

    /**
     * This method is called when you deleting an email configurations from view
     * @author Ciprian Dorofte
     */
    deleteEmailConfigs(emailConfigs: AdminEmailConfigs, modal: ModalDirective) {
        this.subscriptions['deleteEmailConfigs'] = this._adminEmailConfigsService.deleteEmailConfigsRest(emailConfigs.id).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message + ": " + emailConfigs.name, res.statusCode);
                this.getAllEmailsConfigs();
                this.resetTableEmailCnfigs();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * This method is called when you want to save or update an email configurations from view
     * @author Ciprian Dorofte
     */
    saveOrUpdateEmailConfigs(operationType: string, modal: ModalDirective) {
        if (operationType == 'save') {
            this.subscriptions['saveEmailConfigs'] = this._adminEmailConfigsService.saveEmailConfigsRest(this.pageId, this.emailConfigs).subscribe(
                (res: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);

                    this.setIsInvalidForm(false);
                    this.getAllEmailsConfigs();
                    this.resetFormFields();

                    this.hideModal(modal);
                }, (err: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                    this.formErrors = err;

                    //Show save form if the save was faild
                    this.setIsAddForm(true);
                    this.setIsInvalidForm(true);
                });
        } else {
            this.subscriptions['updateEmailConfigs'] = this._adminEmailConfigsService.updateEmailConfigsRest(this.pageId, this.emailConfigs).subscribe(
                (res: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);

                    this.setIsInvalidForm(false);
                    this.getAllEmailsConfigs();
                    this.resetFormFields();

                    this.hideModal(modal);
                }, (err: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                    this.formErrors = err;

                    //Show update form if the update was faild
                    this.setIsAddForm(false);
                    this.setIsInvalidForm(true);
                });
        }
    }

    /*  -------- Email Configs COMPONENT methods --------  */

    /**
     * This method is called when you press the EDIT button to update an email configurations.
     * The emailConfigs object sent as parameter will have a copy that will be assigned to 
     * the emailConfigs object from component which is used into the modal form. 
     * This thing prevent the form to keep the information that are'nt submitted and alter 
     * email configs table.
     * @author Ciprian Dorofte
     */
    editEmailConfigs(emailConfigs: AdminEmailConfigs) {
        this.addEditFormModal.show();
        this.emailConfigs = this._utilityService.copy(emailConfigs);
        this.rebuildForm();
        this.setIsAddForm(false);
        this.setIsInvalidForm(false);
        this.clearValidationMessages();
    }

    /**
     * This method is called when you want to add a new email configuration. It prepare the saving email config form.
     * @author Ciprian Dorofte
     */
    addEmailConfigs() {
        this.addEditFormModal.show();
        this.emailConfigs = new AdminEmailConfigs();
        this.rebuildForm();
        this.setIsAddForm(true);
        this.setIsInvalidForm(false);
        this.clearValidationMessages();

    }

    closeEmailConfigModal() {
        this.addEditFormModal.hide();
    }

    /**
     * This method is called when a save/update action is done the form fields should 
     * be resetted.
     * @author Ciprian Dorofte
     */
    resetFormFields() {
        //Reinitialization emailConfigs object
        this.emailConfigs = new AdminEmailConfigs();
        this.setIsAddForm(true);
        this.clearValidationMessages();
    }

    /**
     * This method check the form if is valid(without having form errors), don't display form error message in form header otherwise display
     * @author Ciprian Dorofte
     */
    setIsInvalidForm(invalidForm: boolean) {
        this.isInvalidForm = invalidForm;
    }

    /**
     * Toggling view password
     * @author Ciprian Dorofte
     */
    togglePassword() {
        this.isShowPassword = !this.isShowPassword;
        if (this.isShowPassword) {
            this.password = "text";
        } else {
            this.password = "password";
        }
    }

    /**
     * This method clear validation messages
     * @author Ciprian Dorofte
     */
    clearValidationMessages(): void {
        this.formErrors = null;
    }

    /**
     * This method show SAVE/UPDATE button and save header/update header in the form
     * @author Ciprian Dorofte
     */
    setIsAddForm(isAddForm: boolean): void {
        this.isAddForm = isAddForm;
    }

    /**
     * This method reset email configs table and refresh all applied filters
     * @author Ciprian Dorofte
     */
    refreshTableEmailConfigs(): void {
        this.resetTableEmailCnfigs();
        this.getAllEmailsConfigs();
    }

    /**
     * Reset email configs table
     * @author Ciprian Dorofte
     */
    resetTableEmailCnfigs() {
        this.dataTable.reset();
    }

    rebuildForm() {
        this.form = this.formBuilder.group({
            name: [this.emailConfigs.name, [Validators.required, Validators.maxLength(255)]],
            username: [this.emailConfigs.username, [Validators.required, Validators.maxLength(255)]],
            password: [this.emailConfigs.password, [Validators.required, Validators.maxLength(255)]],
            host: [this.emailConfigs.host, [Validators.required, Validators.maxLength(255)]],
            port: [this.emailConfigs.port, [Validators.required, Validators.maxLength(10), ValidationService.validateOnlyNumbers()]],
            emailAddress: [this.emailConfigs.emailAddress, [Validators.required, Validators.maxLength(255), ValidationService.emailValidator()]],
            messageFrom: [this.emailConfigs.messageFrom, [Validators.required, Validators.maxLength(255)]],
            description: [this.emailConfigs.description, [Validators.maxLength(1000)]]
        });
    }
    
    /**
     * Showing modal
     * @author Mario Petrovic
     */
    showModal(modal: ModalDirective, modalName: string, data?: any): void {
        this.formErrors = new RestResponse();
        this._utilityService.setAlert(this.componentAlert);

        switch (modalName) {
            case 'addEmailConfigs':
                this.addEmailConfigs();
                break;

            case 'deleteEmailConfigs':
                this.deletedEmailConfigs = data;
                break;

            case 'editEmailConfigs':
                this.editEmailConfigs(data);
                break;
        }

        modal.show();
    }
    
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    hideModal(modal: ModalDirective): void {
        modal.hide();
    }
}
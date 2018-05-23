import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AdminEmailTemplate, AdminInlineResourceTemplate } from '../models';
import { RestResponse, Alert } from '../../shared/models';

import { AdminEmailTemplateService } from './adminEmailTemplate.service';
import { AppService } from '../../shared/services/app.service';
import { ValidationService } from '../../shared/services/validation.service';
import { UtilityService } from '../../shared/services/utility.service';

import { TranslateService } from 'ng2-translate';
import { DataTable } from 'primeng/primeng';
import { ModalDirective } from 'ng2-bootstrap';

import { Constants } from "./../../constants";

declare let saveAs: any;

/**
 * Component for Email Template page
 * @author Ciprian Dorofte
 */
@Component({
    moduleId: module.id,
    templateUrl: 'adminEmailTemplate.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class AdminEmailTemplateCmp implements OnInit {

    /*--------- Constructor --------*/
    constructor(private formBuilder: FormBuilder,
        private _adminEmailTemplateService: AdminEmailTemplateService,
        private _appService: AppService,
        private _utilityService: UtilityService,
        private _translateService: TranslateService,
        private _constants: Constants) {
        this.pageId = 'adminEmails';
    }

    @ViewChild('dataTable')
    dataTable: DataTable;

    @ViewChild('addEditFormModal')
    addEditFormModal: ModalDirective;

    /*  -------- Email Template VARIABLES --------  */
    listOfEmailsTemplates: AdminEmailTemplate[];
    listOfInResTemplate: AdminInlineResourceTemplate[];
    listOfInResTemplateDlg: AdminInlineResourceTemplate[];
    arrOfRemovedInRes: number[];

    newInlineRes: AdminInlineResourceTemplate;
    emailTemplate: AdminEmailTemplate;
    deletedEmailTemplate: AdminEmailTemplate;
    removedInlineResource: AdminInlineResourceTemplate;

    form: FormGroup;
    formInlineRes: FormGroup;
    formErrors: RestResponse<any>;

    templateFile: string;
    templateName: string;
    inlineToEdit: string;

    isloadingEmailsTemplates: boolean;
    isAddForm: boolean;
    isAddNewResBtn: boolean;
    isMouseHoverTempFile: boolean;
    isMouseHoverInlineRes: boolean;
    isVisResourcesDlg: boolean;
    isChosenTemplateFile: boolean;
    isInvalidTemplateFile: boolean;
    isRequiredTemplateFile: boolean;
    isNotDuplicatedCID: boolean;
    isInlineResFormHidden: boolean;
    isInvalidForm: boolean;

    pageId: string;

    componentAlert: Alert;
    subscriptions: Object;

    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        this.emailTemplate = new AdminEmailTemplate();
        this.formErrors = new RestResponse();
        this.listOfEmailsTemplates = [];
        this.listOfInResTemplateDlg = [];
        this.listOfInResTemplate = [];
        this.arrOfRemovedInRes = [];

        this.isVisResourcesDlg = false;
        this.isAddForm = true;
        this.isAddNewResBtn = true;
        this.isMouseHoverTempFile = false;
        this.isMouseHoverInlineRes = false;
        this.isChosenTemplateFile = false;
        this.isInvalidTemplateFile = false;
        this.isRequiredTemplateFile = true;
        this.isNotDuplicatedCID = true;
        this.isInlineResFormHidden = true;

        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);

        //Init set controlls
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
            emailSubject: ['', [Validators.required, Validators.maxLength(200)]],
            description: ['', [Validators.maxLength(1000)]]
        });

        this.formInlineRes = this.formBuilder.group({
            cdResource: ['', [Validators.required, Validators.maxLength(255)]],
            cdDescription: ['', [Validators.maxLength(1000)]],

        });

        this.getAllEmailsTemplates();

        this._appService.languageChangeForComponent(this, () => {
            this.getAllEmailsTemplates();
        });
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }

    /*  -------- Email Template SERVICE calls --------  */

    /**
     * Retrieve all Email Templates
     * @author Ciprian Dorofte
     */
    getAllEmailsTemplates() {
        this.isloadingEmailsTemplates = true;
        this.subscriptions['loadAllEmailsTemplates'] = this._adminEmailTemplateService.getAllEmailsTemplatesRest().subscribe(
            (res: RestResponse<any>) => {
                this.listOfEmailsTemplates = res.data;
                this.isloadingEmailsTemplates = false;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode),
                    this.isloadingEmailsTemplates = false
            });
    }

    /**
     * Delete an email template
     * @author Ciprian Dorofte
     */
    deleteEmailTemplate(emailTemplate: AdminEmailTemplate, modal: ModalDirective) {
        this.subscriptions['deleteEmailTemplate'] = this._adminEmailTemplateService.deleteEmailTemplateRest(emailTemplate.id).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message + ": " + emailTemplate.name, res.statusCode);

                //Retrieving the new list with email templates
                this.getAllEmailsTemplates();

                //Clear form
                this.clearForm();

                this.resetTableEmailTemplates();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    /**
     * Save or Update an email tempate
     * @author Ciprian Dorofte
     */
    saveOrUpdateEmailTemplate(operationType: string, modal: ModalDirective) {
        this.clearValidationMessages();

        let formData = new FormData();
        let template = {
            id: this.emailTemplate.id,
            name: this.emailTemplate.name,
            emailSubject: this.emailTemplate.emailSubject,
            description: this.emailTemplate.description,
            utInsert: this.emailTemplate.utInsert,
            tsInsert: this.emailTemplate.tsInsert,
            utUpdate: this.emailTemplate.utUpdate,
            tsUpdate: this.emailTemplate.tsUpdate
        }

        if (operationType == 'save' && this.isNotDuplicatedCID) {
            formData.append('template', new Blob([JSON.stringify(template)], {
                type: 'application/json'
            }));
            formData.append('templateFile', this.emailTemplate.template);
            formData.append('inlineResource', new Blob([JSON.stringify(this.listOfInResTemplate)], {
                type: 'application/json'
            }));

            this.subscriptions['saveEmailTemplate'] = this._adminEmailTemplateService.saveEmailTemplateRest(this.pageId, formData).subscribe(
                (res: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);

                    //Retrieve the new list with email templates
                    this.getAllEmailsTemplates();

                    //Clear form
                    this.clearForm();
                    this.setIsInvalidForm(false);
                    
                    this.hideModal(modal);
                },
                (err: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                    this.formErrors = err;

                    //Show Save button if save was faild
                    this.setIsAddForm(true);
                    this.setIsInvalidForm(true);
                });

        } else if (operationType == 'update' && this.isNotDuplicatedCID) {
            formData.append('template', new Blob([JSON.stringify(template)], {
                type: 'application/json'
            }));
            formData.append('templateFile', this.emailTemplate.template);
            formData.append('inlineResource', new Blob([JSON.stringify(this.listOfInResTemplate)], {
                type: 'application/json'
            }));
            formData.append('arrDeletedResources', new Blob([JSON.stringify(this.arrOfRemovedInRes)], {
                type: 'application/json'
            }));

            this.subscriptions['updateEmailTemplate'] = this._adminEmailTemplateService.updateEmailTemplateRest(this.pageId, formData).subscribe(
                (res: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);

                    //Retrieve the new list with email templates
                    this.getAllEmailsTemplates();

                    //Clear form
                    this.clearForm();
                    this.setIsInvalidForm(false);
                    this.hideModal(modal);
                },
                (err: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
                    this.formErrors = err;

                    //Show Update button if updated was faild
                    this.setIsAddForm(false);
                    this.setIsInvalidForm(true);
                });
        }
    }

    /*-------- Email Template COMPONENT methods --------*/

    /**
     * This method is called when Add Email Template button is pressed and prepare the form for adding an email template
     * @author Ciprian Dorofte
     */
    addEmailTemplate() {
        this.arrOfRemovedInRes = [];
        this.listOfInResTemplate = [];
        this.emailTemplate = new AdminEmailTemplate();
        this.setIsAddForm(true);
        this.setIsInvalidForm(false);
        this.isChosenTemplateFile = false;
        this.isInvalidTemplateFile = false;
        this.isRequiredTemplateFile = true;
        this.isNotDuplicatedCID = true;
        this.inlineToEdit = null;

        this.clearValidationMessages();
    }

    /**
     * This method saving/updating an inline resource in the main list of inline resources(listOfInResTemplate)
     * @author Ciprian Dorofte
     */
    saveEditInlineResource(newInlineRes: AdminInlineResourceTemplate) {
        this.validationCID(newInlineRes);
        if (this.isNotDuplicatedCID) {
            if (!this.isAddNewResBtn) {
                for (let i = 0; i < this.listOfInResTemplate.length; i++) {
                    if (this.inlineToEdit == this.listOfInResTemplate[i].cdResource) {
                        this.listOfInResTemplate[i] = this._utilityService.copy(newInlineRes);
                    }
                }
            } else {
                this.listOfInResTemplate.push(newInlineRes);
            }
            this.isInlineResFormHidden = true;
            this.newInlineRes = null;
        }

    }

    /**
     * Remove an email template from the main list of inline resources(listOfInResTemplate)
     * @author Ciprian Dorofte
     */
    removeInlineRes(modal: ModalDirective) {
        //Add inline resource id in arrOfRemovedInRes if this resource exist on the current template
        if (this.removedInlineResource.id) {
            this.arrOfRemovedInRes.push(this.removedInlineResource.id);
        }

        //Remove inline resource instance from the listOfInResTemplate
        var index = this.listOfInResTemplate.indexOf(this.removedInlineResource);
        if (index > -1) {
            this.listOfInResTemplate.splice(index, 1);
        }

        this.hideModal(modal);
    }

    /**
     * This method check the form if is valid(without having form errors), don't display form error message in form header otherwise display
     * @author Ciprian Dorofte
     */
    setIsInvalidForm(invalidForm: boolean) {
        this.isInvalidForm = invalidForm;
    }

    /**
     * Clear the form
     * @author Ciprian Dorofte
     */
    clearForm() {
        this.isChosenTemplateFile = false;
        this.isRequiredTemplateFile = true;
        this.setIsAddForm(true);
        this.listOfInResTemplate = [];
        this.emailTemplate = new AdminEmailTemplate();

        this.clearValidationMessages();
    }

    /**
     * This method is called on mouse hover to the template file icon and loading the template file in a <pre> tag
     * @author Ciprian Dorofte
     */
    onMouseHoverTempFile(emailTemplate: AdminEmailTemplate) {
        let tempFile = emailTemplate.template;
        this.templateFile = this._appService.decodeData(tempFile);

        this.isMouseHoverTempFile = true;
    }

    /**
     * Upload an template file and checking if has valid format
     * @author Ciprian Dorofte
     */
    uploadTemplateFile(event) {
        var extensionFile = this._appService.extractExtensionFromFileName(event.target.files[0].name);
        if (extensionFile == 'txt' || extensionFile == 'ftl') {
            this.emailTemplate.template = event.target.files[0];
            this.isChosenTemplateFile = true;
            this.isInvalidTemplateFile = false;
            this.isRequiredTemplateFile = false;
        } else {
            this.isChosenTemplateFile = false;
            this.isInvalidTemplateFile = true;
            this.isRequiredTemplateFile = false;
        }
    }

    /**
     * Add a new inline resource file
     * @author Ciprian Dorofte
     */
    addInlineResources(event) {
        var file = event.target.files[0];
        var myReader: FileReader = new FileReader();
        this.isAddNewResBtn = true;
        this.isNotDuplicatedCID = true;
        this.clearValidationMessages();
        this.inlineToEdit = null;

        myReader.addEventListener("load", (event: Event) => {
            this.newInlineRes = new AdminInlineResourceTemplate();

            //Get the result from the reader (base64 of the image) & Extract the containing base64 encoded data
            this.newInlineRes.resourceFile = myReader.result.split(',')[1];
            this.newInlineRes.resourceName = file.name;
            this.isInlineResFormHidden = false;
            //this.listOfInResTemplate.push(newInlineRes);
        }, true);

        myReader.readAsDataURL(file);
    }

    /**
     * This method is called on mouse hover to the download button and loading the inline resource file in a <pre> tag
     * @author Ciprian Dorofte
     */
    onMouseHoverInlineRes(resourceFile: any) {
        this.isMouseHoverInlineRes = true;
    }

    /**
     * Edit an email template
     * @author Ciprian Dorofte
     */
    editEmailTemplate(emailTempate: AdminEmailTemplate) {
        this.arrOfRemovedInRes = [];
        this.isChosenTemplateFile = false;
        this.isInvalidTemplateFile = false;
        this.isRequiredTemplateFile = false;
        this.isNotDuplicatedCID = true;
        this.emailTemplate = this._utilityService.copy(emailTempate);
        this.inlineToEdit = null;

        this.getInlineResources(emailTempate, 'edit');
        this.setIsAddForm(false);
        this.setIsInvalidForm(false);
        this.clearValidationMessages();
    }

    /**
     * Open a dialog with the list of inline resources
     * @author Ciprian Dorofte
     */
    showInlineResources(emailTemplate: AdminEmailTemplate) {
        this.templateName = emailTemplate.name;
        this.getInlineResources(emailTemplate, 'show');
        this.isVisResourcesDlg = true;
    }

    /**
     * Get inline resources for inline resources dialog or for inline resources edit form, from main email template and populate listOfInResTemplateDlg or listOfInResTemplate
     * @author Ciprian Dorofte
     */
    getInlineResources(emailTempate: AdminEmailTemplate, operationType: string) {
        if (operationType == 'show') {
            this.listOfInResTemplateDlg = this._utilityService.copy(emailTempate.kjcInlineResourceTemplateses);
        } else if (operationType == 'edit') {
            this.listOfInResTemplate = this._utilityService.copy(emailTempate.kjcInlineResourceTemplateses);
        }
    }

    /**
     * Download template file
     * @author Ciprian Dorofte
     */
    downloadTemplateFile(emailTemplate: AdminEmailTemplate) {
        var contentType = 'text/html';
        var blob = this._appService.convertBase64ToBlob(emailTemplate.template, contentType);
        var templateFileName = emailTemplate.name + '.ftl';
        saveAs(blob, templateFileName);
    }

    /**
     * This method is called when inline resource download button is pressed. It building a blob which convert Base64 file into blob and make a downloadable file.
     * @author Ciprian Dorofte
     */
    downloadInlineResFile(resource: AdminInlineResourceTemplate) {
        var contentType = 'image/*';
        var blob = this._appService.convertBase64ToBlob(resource.resourceFile, contentType);
        var inineResFileName = resource.resourceName;
        saveAs(blob, inineResFileName);
    }

    /**
     * This method validate CID field
     * @author Ciprian Dorofte
     */
    validationCID(newInlineRes: AdminInlineResourceTemplate) {
        this.isNotDuplicatedCID = true;
        if (this.listOfInResTemplate.length > 0) {
            for (let i = 0; i < this.listOfInResTemplate.length; i++) {
                if (newInlineRes.cdResource == this.listOfInResTemplate[i].cdResource && this.inlineToEdit != this.listOfInResTemplate[i].cdResource) {
                    this.isNotDuplicatedCID = false;
                    this.isInlineResFormHidden = false;
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * This method is called when CANCEL button for an inline resource is pressed and cancels form errors, objects
     * @author Ciprian Dorofte
     */
    cancelAddEditInlineRes() {
        this.clearValidationMessages();
        this.isInlineResFormHidden = true;
        this.isNotDuplicatedCID = true;
        this.inlineToEdit = null;
    }

    /**
     * This method is called when EDIT button for an inline resource is pressed and prepare data for edit form.
     * @author Ciprian Dorofte
     */
    prepareToEditInlineResource(inlineRes: AdminInlineResourceTemplate) {
        this.inlineToEdit = inlineRes.cdResource;
        this.newInlineRes = new AdminInlineResourceTemplate();
        this.newInlineRes = this._utilityService.copy(inlineRes);
        this.isInlineResFormHidden = false;
        this.isAddNewResBtn = false;
        this.isNotDuplicatedCID = true;
    }

    /**
     * This method show SAVE/UPDATE button and save header/update header in the form
     * @author Ciprian Dorofte
     */
    setIsAddForm(isAddForm: boolean): void {
        this.isAddForm = isAddForm;
    }

    /**
     * This method clear validation messages
     * @author Ciprian Dorofte
     */
    clearValidationMessages(): void {
        this.formErrors = null;
    }

    /**
     * This method reset email templates table and refresh all applied filters
     * @author Ciprian Dorofte
     */
    refreshTable() {
        this.resetTableEmailTemplates();
        this.getAllEmailsTemplates();
    }

    /**
     * Reset email templates table
     * @author Ciprian Dorofte
     */
    resetTableEmailTemplates() {
        this.dataTable.reset();
    }
    
    /**
     * Showing modal
     * @author Mario Petrovic
     */
    showModal(modal: ModalDirective, modalName: string, data?: any) {
        this.formErrors = new RestResponse();
        this._utilityService.setAlert(this.componentAlert);

        switch (modalName) {
            case 'addEditForm':
                this.addEmailTemplate()
                break;

            case 'editForm':
                this.isInlineResFormHidden = true;
                this.editEmailTemplate(data);
                break;

            case 'deleteTemplate':
                this.deletedEmailTemplate = data;
                break;

            case 'lgModalRemoveInline':

                break;
        }

        modal.show()
    }
    
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    hideModal(modal: ModalDirective): void {
        modal.hide();
    }
}
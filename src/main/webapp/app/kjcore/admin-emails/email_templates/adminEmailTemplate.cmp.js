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
var forms_1 = require('@angular/forms');
var models_1 = require('../models');
var models_2 = require('../../shared/models');
var adminEmailTemplate_service_1 = require('./adminEmailTemplate.service');
var app_service_1 = require('../../shared/services/app.service');
var utility_service_1 = require('../../shared/services/utility.service');
var ng2_translate_1 = require('ng2-translate');
var primeng_1 = require('primeng/primeng');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var constants_1 = require("./../../constants");
/**
 * Component for Email Template page
 * @author Ciprian Dorofte
 */
var AdminEmailTemplateCmp = (function () {
    /*--------- Constructor --------*/
    function AdminEmailTemplateCmp(formBuilder, _adminEmailTemplateService, _appService, _utilityService, _translateService, _constants) {
        this.formBuilder = formBuilder;
        this._adminEmailTemplateService = _adminEmailTemplateService;
        this._appService = _appService;
        this._utilityService = _utilityService;
        this._translateService = _translateService;
        this._constants = _constants;
        this.pageId = 'adminEmails';
    }
    AdminEmailTemplateCmp.prototype.ngOnInit = function () {
        var _this = this;
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this.emailTemplate = new models_1.AdminEmailTemplate();
        this.formErrors = new models_2.RestResponse();
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
        this.componentAlert = new models_2.Alert(null, true);
        //Init set controlls
        this.form = this.formBuilder.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            emailSubject: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(200)]],
            description: ['', [forms_1.Validators.maxLength(1000)]]
        });
        this.formInlineRes = this.formBuilder.group({
            cdResource: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            cdDescription: ['', [forms_1.Validators.maxLength(1000)]],
        });
        this.getAllEmailsTemplates();
        this._appService.languageChangeForComponent(this, function () {
            _this.getAllEmailsTemplates();
        });
    };
    /*--------- NG On Destroy ---------*/
    AdminEmailTemplateCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    /*  -------- Email Template SERVICE calls --------  */
    /**
     * Retrieve all Email Templates
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.getAllEmailsTemplates = function () {
        var _this = this;
        this.isloadingEmailsTemplates = true;
        this.subscriptions['loadAllEmailsTemplates'] = this._adminEmailTemplateService.getAllEmailsTemplatesRest().subscribe(function (res) {
            _this.listOfEmailsTemplates = res.data;
            _this.isloadingEmailsTemplates = false;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode),
                _this.isloadingEmailsTemplates = false;
        });
    };
    /**
     * Delete an email template
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.deleteEmailTemplate = function (emailTemplate, modal) {
        var _this = this;
        this.subscriptions['deleteEmailTemplate'] = this._adminEmailTemplateService.deleteEmailTemplateRest(emailTemplate.id).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message + ": " + emailTemplate.name, res.statusCode);
            //Retrieving the new list with email templates
            _this.getAllEmailsTemplates();
            //Clear form
            _this.clearForm();
            _this.resetTableEmailTemplates();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * Save or Update an email tempate
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.saveOrUpdateEmailTemplate = function (operationType, modal) {
        var _this = this;
        this.clearValidationMessages();
        var formData = new FormData();
        var template = {
            id: this.emailTemplate.id,
            name: this.emailTemplate.name,
            emailSubject: this.emailTemplate.emailSubject,
            description: this.emailTemplate.description,
            utInsert: this.emailTemplate.utInsert,
            tsInsert: this.emailTemplate.tsInsert,
            utUpdate: this.emailTemplate.utUpdate,
            tsUpdate: this.emailTemplate.tsUpdate
        };
        if (operationType == 'save' && this.isNotDuplicatedCID) {
            formData.append('template', new Blob([JSON.stringify(template)], {
                type: 'application/json'
            }));
            formData.append('templateFile', this.emailTemplate.template);
            formData.append('inlineResource', new Blob([JSON.stringify(this.listOfInResTemplate)], {
                type: 'application/json'
            }));
            this.subscriptions['saveEmailTemplate'] = this._adminEmailTemplateService.saveEmailTemplateRest(this.pageId, formData).subscribe(function (res) {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                //Retrieve the new list with email templates
                _this.getAllEmailsTemplates();
                //Clear form
                _this.clearForm();
                _this.setIsInvalidForm(false);
                _this.hideModal(modal);
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
                _this.formErrors = err;
                //Show Save button if save was faild
                _this.setIsAddForm(true);
                _this.setIsInvalidForm(true);
            });
        }
        else if (operationType == 'update' && this.isNotDuplicatedCID) {
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
            this.subscriptions['updateEmailTemplate'] = this._adminEmailTemplateService.updateEmailTemplateRest(this.pageId, formData).subscribe(function (res) {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                //Retrieve the new list with email templates
                _this.getAllEmailsTemplates();
                //Clear form
                _this.clearForm();
                _this.setIsInvalidForm(false);
                _this.hideModal(modal);
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
                _this.formErrors = err;
                //Show Update button if updated was faild
                _this.setIsAddForm(false);
                _this.setIsInvalidForm(true);
            });
        }
    };
    /*-------- Email Template COMPONENT methods --------*/
    /**
     * This method is called when Add Email Template button is pressed and prepare the form for adding an email template
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.addEmailTemplate = function () {
        this.arrOfRemovedInRes = [];
        this.listOfInResTemplate = [];
        this.emailTemplate = new models_1.AdminEmailTemplate();
        this.setIsAddForm(true);
        this.setIsInvalidForm(false);
        this.isChosenTemplateFile = false;
        this.isInvalidTemplateFile = false;
        this.isRequiredTemplateFile = true;
        this.isNotDuplicatedCID = true;
        this.inlineToEdit = null;
        this.clearValidationMessages();
    };
    /**
     * This method saving/updating an inline resource in the main list of inline resources(listOfInResTemplate)
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.saveEditInlineResource = function (newInlineRes) {
        this.validationCID(newInlineRes);
        if (this.isNotDuplicatedCID) {
            if (!this.isAddNewResBtn) {
                for (var i = 0; i < this.listOfInResTemplate.length; i++) {
                    if (this.inlineToEdit == this.listOfInResTemplate[i].cdResource) {
                        this.listOfInResTemplate[i] = this._utilityService.copy(newInlineRes);
                    }
                }
            }
            else {
                this.listOfInResTemplate.push(newInlineRes);
            }
            this.isInlineResFormHidden = true;
            this.newInlineRes = null;
        }
    };
    /**
     * Remove an email template from the main list of inline resources(listOfInResTemplate)
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.removeInlineRes = function (modal) {
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
    };
    /**
     * This method check the form if is valid(without having form errors), don't display form error message in form header otherwise display
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.setIsInvalidForm = function (invalidForm) {
        this.isInvalidForm = invalidForm;
    };
    /**
     * Clear the form
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.clearForm = function () {
        this.isChosenTemplateFile = false;
        this.isRequiredTemplateFile = true;
        this.setIsAddForm(true);
        this.listOfInResTemplate = [];
        this.emailTemplate = new models_1.AdminEmailTemplate();
        this.clearValidationMessages();
    };
    /**
     * This method is called on mouse hover to the template file icon and loading the template file in a <pre> tag
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.onMouseHoverTempFile = function (emailTemplate) {
        var tempFile = emailTemplate.template;
        this.templateFile = this._appService.decodeData(tempFile);
        this.isMouseHoverTempFile = true;
    };
    /**
     * Upload an template file and checking if has valid format
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.uploadTemplateFile = function (event) {
        var extensionFile = this._appService.extractExtensionFromFileName(event.target.files[0].name);
        if (extensionFile == 'txt' || extensionFile == 'ftl') {
            this.emailTemplate.template = event.target.files[0];
            this.isChosenTemplateFile = true;
            this.isInvalidTemplateFile = false;
            this.isRequiredTemplateFile = false;
        }
        else {
            this.isChosenTemplateFile = false;
            this.isInvalidTemplateFile = true;
            this.isRequiredTemplateFile = false;
        }
    };
    /**
     * Add a new inline resource file
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.addInlineResources = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var myReader = new FileReader();
        this.isAddNewResBtn = true;
        this.isNotDuplicatedCID = true;
        this.clearValidationMessages();
        this.inlineToEdit = null;
        myReader.addEventListener("load", function (event) {
            _this.newInlineRes = new models_1.AdminInlineResourceTemplate();
            //Get the result from the reader (base64 of the image) & Extract the containing base64 encoded data
            _this.newInlineRes.resourceFile = myReader.result.split(',')[1];
            _this.newInlineRes.resourceName = file.name;
            _this.isInlineResFormHidden = false;
            //this.listOfInResTemplate.push(newInlineRes);
        }, true);
        myReader.readAsDataURL(file);
    };
    /**
     * This method is called on mouse hover to the download button and loading the inline resource file in a <pre> tag
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.onMouseHoverInlineRes = function (resourceFile) {
        this.isMouseHoverInlineRes = true;
    };
    /**
     * Edit an email template
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.editEmailTemplate = function (emailTempate) {
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
    };
    /**
     * Open a dialog with the list of inline resources
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.showInlineResources = function (emailTemplate) {
        this.templateName = emailTemplate.name;
        this.getInlineResources(emailTemplate, 'show');
        this.isVisResourcesDlg = true;
    };
    /**
     * Get inline resources for inline resources dialog or for inline resources edit form, from main email template and populate listOfInResTemplateDlg or listOfInResTemplate
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.getInlineResources = function (emailTempate, operationType) {
        if (operationType == 'show') {
            this.listOfInResTemplateDlg = this._utilityService.copy(emailTempate.kjcInlineResourceTemplateses);
        }
        else if (operationType == 'edit') {
            this.listOfInResTemplate = this._utilityService.copy(emailTempate.kjcInlineResourceTemplateses);
        }
    };
    /**
     * Download template file
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.downloadTemplateFile = function (emailTemplate) {
        var contentType = 'text/html';
        var blob = this._appService.convertBase64ToBlob(emailTemplate.template, contentType);
        var templateFileName = emailTemplate.name + '.ftl';
        saveAs(blob, templateFileName);
    };
    /**
     * This method is called when inline resource download button is pressed. It building a blob which convert Base64 file into blob and make a downloadable file.
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.downloadInlineResFile = function (resource) {
        var contentType = 'image/*';
        var blob = this._appService.convertBase64ToBlob(resource.resourceFile, contentType);
        var inineResFileName = resource.resourceName;
        saveAs(blob, inineResFileName);
    };
    /**
     * This method validate CID field
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.validationCID = function (newInlineRes) {
        this.isNotDuplicatedCID = true;
        if (this.listOfInResTemplate.length > 0) {
            for (var i = 0; i < this.listOfInResTemplate.length; i++) {
                if (newInlineRes.cdResource == this.listOfInResTemplate[i].cdResource && this.inlineToEdit != this.listOfInResTemplate[i].cdResource) {
                    this.isNotDuplicatedCID = false;
                    this.isInlineResFormHidden = false;
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * This method is called when CANCEL button for an inline resource is pressed and cancels form errors, objects
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.cancelAddEditInlineRes = function () {
        this.clearValidationMessages();
        this.isInlineResFormHidden = true;
        this.isNotDuplicatedCID = true;
        this.inlineToEdit = null;
    };
    /**
     * This method is called when EDIT button for an inline resource is pressed and prepare data for edit form.
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.prepareToEditInlineResource = function (inlineRes) {
        this.inlineToEdit = inlineRes.cdResource;
        this.newInlineRes = new models_1.AdminInlineResourceTemplate();
        this.newInlineRes = this._utilityService.copy(inlineRes);
        this.isInlineResFormHidden = false;
        this.isAddNewResBtn = false;
        this.isNotDuplicatedCID = true;
    };
    /**
     * This method show SAVE/UPDATE button and save header/update header in the form
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.setIsAddForm = function (isAddForm) {
        this.isAddForm = isAddForm;
    };
    /**
     * This method clear validation messages
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.clearValidationMessages = function () {
        this.formErrors = null;
    };
    /**
     * This method reset email templates table and refresh all applied filters
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.refreshTable = function () {
        this.resetTableEmailTemplates();
        this.getAllEmailsTemplates();
    };
    /**
     * Reset email templates table
     * @author Ciprian Dorofte
     */
    AdminEmailTemplateCmp.prototype.resetTableEmailTemplates = function () {
        this.dataTable.reset();
    };
    /**
     * Showing modal
     * @author Mario Petrovic
     */
    AdminEmailTemplateCmp.prototype.showModal = function (modal, modalName, data) {
        this.formErrors = new models_2.RestResponse();
        this._utilityService.setAlert(this.componentAlert);
        switch (modalName) {
            case 'addEditForm':
                this.addEmailTemplate();
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
        modal.show();
    };
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    AdminEmailTemplateCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    __decorate([
        core_1.ViewChild('dataTable'), 
        __metadata('design:type', primeng_1.DataTable)
    ], AdminEmailTemplateCmp.prototype, "dataTable", void 0);
    __decorate([
        core_1.ViewChild('addEditFormModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], AdminEmailTemplateCmp.prototype, "addEditFormModal", void 0);
    AdminEmailTemplateCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'adminEmailTemplate.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, adminEmailTemplate_service_1.AdminEmailTemplateService, app_service_1.AppService, utility_service_1.UtilityService, ng2_translate_1.TranslateService, constants_1.Constants])
    ], AdminEmailTemplateCmp);
    return AdminEmailTemplateCmp;
}());
exports.AdminEmailTemplateCmp = AdminEmailTemplateCmp;
//# sourceMappingURL=adminEmailTemplate.cmp.js.map
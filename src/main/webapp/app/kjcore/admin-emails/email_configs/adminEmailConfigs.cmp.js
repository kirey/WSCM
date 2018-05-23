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
var utility_service_1 = require('../../shared/services/utility.service');
var app_service_1 = require('../../shared/services/app.service');
var validation_service_1 = require('../../shared/services/validation.service');
var adminEmailConfigs_service_1 = require('./adminEmailConfigs.service');
var models_1 = require('../../shared/models');
var models_2 = require('../models');
var ng2_translate_1 = require('ng2-translate');
var primeng_1 = require('primeng/primeng');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var constants_1 = require("./../../constants");
/**
 * Component for Email Configurations page
 * @author Ciprian Dorofte
 */
var AdminEmailConfigsCmp = (function () {
    /*--------- Constructor --------*/
    function AdminEmailConfigsCmp(formBuilder, _adminEmailConfigsService, _utilityService, _appService, _translateService, _constants) {
        this.formBuilder = formBuilder;
        this._adminEmailConfigsService = _adminEmailConfigsService;
        this._utilityService = _utilityService;
        this._appService = _appService;
        this._translateService = _translateService;
        this._constants = _constants;
        this.listOfEmailConfigs = [];
        this.pageId = 'adminEmails';
    }
    AdminEmailConfigsCmp.prototype.ngOnInit = function () {
        var _this = this;
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        //Initialiaze Email configs variables
        this.formErrors = new models_1.RestResponse();
        this.emailConfigs = new models_2.AdminEmailConfigs();
        this.deletedEmailConfigs = new models_2.AdminEmailConfigs();
        this.isShowPassword = false;
        this.isAddForm = true;
        this.isDisabledBtn = false;
        this.password = "password";
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        //Init set form controlls
        this.form = this.formBuilder.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            username: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            host: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            port: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10), validation_service_1.ValidationService.validateOnlyNumbers()]],
            emailAddress: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(255), validation_service_1.ValidationService.emailValidator()]],
            messageFrom: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            description: ['', [forms_1.Validators.maxLength(1000)]]
        });
        //-------------These two subscribers are for translation purpose---------------------
        this._appService.languageChanged.subscribe(function (lang) {
            _this._appService.changeLangTranslate(_this._translateService, lang);
        });
        this.getAllEmailsConfigs();
        this._appService.languageChangeForComponent(this, function () {
            _this.getAllEmailsConfigs();
        });
    };
    /*--------- NG On Destroy ---------*/
    AdminEmailConfigsCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    /*-------- Email Configs SERVICE calls --------*/
    /**
     * This method is called when you want to retrieve all emails configurations from back-end
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsCmp.prototype.getAllEmailsConfigs = function () {
        var _this = this;
        this.isLoadingAllEmailConfigs = true;
        this.subscriptions['loadAllEmailsConfigs'] = this._adminEmailConfigsService.getAllEmailsConfigsRest().subscribe(function (res) { return _this.listOfEmailConfigs = res.data; }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode),
                _this.isLoadingAllEmailConfigs = false;
        }, function () { return _this.isLoadingAllEmailConfigs = false; });
    };
    /**
     * This method is called when you deleting an email configurations from view
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsCmp.prototype.deleteEmailConfigs = function (emailConfigs, modal) {
        var _this = this;
        this.subscriptions['deleteEmailConfigs'] = this._adminEmailConfigsService.deleteEmailConfigsRest(emailConfigs.id).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message + ": " + emailConfigs.name, res.statusCode);
            _this.getAllEmailsConfigs();
            _this.resetTableEmailCnfigs();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /**
     * This method is called when you want to save or update an email configurations from view
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsCmp.prototype.saveOrUpdateEmailConfigs = function (operationType, modal) {
        var _this = this;
        if (operationType == 'save') {
            this.subscriptions['saveEmailConfigs'] = this._adminEmailConfigsService.saveEmailConfigsRest(this.pageId, this.emailConfigs).subscribe(function (res) {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                _this.setIsInvalidForm(false);
                _this.getAllEmailsConfigs();
                _this.resetFormFields();
                _this.hideModal(modal);
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
                _this.formErrors = err;
                //Show save form if the save was faild
                _this.setIsAddForm(true);
                _this.setIsInvalidForm(true);
            });
        }
        else {
            this.subscriptions['updateEmailConfigs'] = this._adminEmailConfigsService.updateEmailConfigsRest(this.pageId, this.emailConfigs).subscribe(function (res) {
                _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
                _this.setIsInvalidForm(false);
                _this.getAllEmailsConfigs();
                _this.resetFormFields();
                _this.hideModal(modal);
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
                _this.formErrors = err;
                //Show update form if the update was faild
                _this.setIsAddForm(false);
                _this.setIsInvalidForm(true);
            });
        }
    };
    /*  -------- Email Configs COMPONENT methods --------  */
    /**
     * This method is called when you press the EDIT button to update an email configurations.
     * The emailConfigs object sent as parameter will have a copy that will be assigned to
     * the emailConfigs object from component which is used into the modal form.
     * This thing prevent the form to keep the information that are'nt submitted and alter
     * email configs table.
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsCmp.prototype.editEmailConfigs = function (emailConfigs) {
        this.addEditFormModal.show();
        this.emailConfigs = this._utilityService.copy(emailConfigs);
        this.rebuildForm();
        this.setIsAddForm(false);
        this.setIsInvalidForm(false);
        this.clearValidationMessages();
    };
    /**
     * This method is called when you want to add a new email configuration. It prepare the saving email config form.
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsCmp.prototype.addEmailConfigs = function () {
        this.addEditFormModal.show();
        this.emailConfigs = new models_2.AdminEmailConfigs();
        this.rebuildForm();
        this.setIsAddForm(true);
        this.setIsInvalidForm(false);
        this.clearValidationMessages();
    };
    AdminEmailConfigsCmp.prototype.closeEmailConfigModal = function () {
        this.addEditFormModal.hide();
    };
    /**
     * This method is called when a save/update action is done the form fields should
     * be resetted.
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsCmp.prototype.resetFormFields = function () {
        //Reinitialization emailConfigs object
        this.emailConfigs = new models_2.AdminEmailConfigs();
        this.setIsAddForm(true);
        this.clearValidationMessages();
    };
    /**
     * This method check the form if is valid(without having form errors), don't display form error message in form header otherwise display
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsCmp.prototype.setIsInvalidForm = function (invalidForm) {
        this.isInvalidForm = invalidForm;
    };
    /**
     * Toggling view password
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsCmp.prototype.togglePassword = function () {
        this.isShowPassword = !this.isShowPassword;
        if (this.isShowPassword) {
            this.password = "text";
        }
        else {
            this.password = "password";
        }
    };
    /**
     * This method clear validation messages
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsCmp.prototype.clearValidationMessages = function () {
        this.formErrors = null;
    };
    /**
     * This method show SAVE/UPDATE button and save header/update header in the form
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsCmp.prototype.setIsAddForm = function (isAddForm) {
        this.isAddForm = isAddForm;
    };
    /**
     * This method reset email configs table and refresh all applied filters
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsCmp.prototype.refreshTableEmailConfigs = function () {
        this.resetTableEmailCnfigs();
        this.getAllEmailsConfigs();
    };
    /**
     * Reset email configs table
     * @author Ciprian Dorofte
     */
    AdminEmailConfigsCmp.prototype.resetTableEmailCnfigs = function () {
        this.dataTable.reset();
    };
    AdminEmailConfigsCmp.prototype.rebuildForm = function () {
        this.form = this.formBuilder.group({
            name: [this.emailConfigs.name, [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            username: [this.emailConfigs.username, [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            password: [this.emailConfigs.password, [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            host: [this.emailConfigs.host, [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            port: [this.emailConfigs.port, [forms_1.Validators.required, forms_1.Validators.maxLength(10), validation_service_1.ValidationService.validateOnlyNumbers()]],
            emailAddress: [this.emailConfigs.emailAddress, [forms_1.Validators.required, forms_1.Validators.maxLength(255), validation_service_1.ValidationService.emailValidator()]],
            messageFrom: [this.emailConfigs.messageFrom, [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            description: [this.emailConfigs.description, [forms_1.Validators.maxLength(1000)]]
        });
    };
    /**
     * Showing modal
     * @author Mario Petrovic
     */
    AdminEmailConfigsCmp.prototype.showModal = function (modal, modalName, data) {
        this.formErrors = new models_1.RestResponse();
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
    };
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    AdminEmailConfigsCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    __decorate([
        core_1.ViewChild('dataTable'), 
        __metadata('design:type', primeng_1.DataTable)
    ], AdminEmailConfigsCmp.prototype, "dataTable", void 0);
    __decorate([
        core_1.ViewChild('addEditFormModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], AdminEmailConfigsCmp.prototype, "addEditFormModal", void 0);
    AdminEmailConfigsCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'adminEmailConfigs.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, adminEmailConfigs_service_1.AdminEmailConfigsService, utility_service_1.UtilityService, app_service_1.AppService, ng2_translate_1.TranslateService, constants_1.Constants])
    ], AdminEmailConfigsCmp);
    return AdminEmailConfigsCmp;
}());
exports.AdminEmailConfigsCmp = AdminEmailConfigsCmp;
//# sourceMappingURL=adminEmailConfigs.cmp.js.map
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
var adminTranslation_service_1 = require('./adminTranslation.service');
var fileUploadValidator_cmp_1 = require('../shared/fileUploadValidator.cmp');
var utility_service_1 = require('../shared/services/utility.service');
var app_service_1 = require('../shared/services/app.service');
var models_1 = require('../shared/models');
var AdminTranslationCmp = (function () {
    /*--------- Constructor ---------*/
    function AdminTranslationCmp(_utilityService, _adminTranslationService, _appService, _translateService, _fileUploadValidator, _changeDetectorRef) {
        this._utilityService = _utilityService;
        this._adminTranslationService = _adminTranslationService;
        this._appService = _appService;
        this._translateService = _translateService;
        this._fileUploadValidator = _fileUploadValidator;
        this._changeDetectorRef = _changeDetectorRef;
        this.tableTranslations = [];
        this.translationsDataUpload = [];
        this.translationsUpload = [];
    }
    /*--------- App logic ---------*/
    /**
     * Load all languages
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.getLanguages = function () {
        var _this = this;
        this.subscriptions['getLanguages'] = this._adminTranslationService.getLanguagesRest().subscribe(function (res) {
            _this.languages = res.data;
            _this.tableLanguages = _this._utilityService.copy(_this.languages);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Load all languages that can be added
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.getAvailableLanguages = function () {
        var _this = this;
        this.subscriptions['getAvailableLanguages'] = this._adminTranslationService.getAvailableLanguagesRest().subscribe(function (res) {
            _this.availableLanguages = res.data;
            _this.languageKeys = Object.keys(_this.availableLanguages);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Add new language
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.addLanguage = function (modal) {
        this.languages.push(this.selectedLanguage);
        for (var i = 0; i < this.languageKeys.length; i++) {
            if (this.languageKeys[i] == this.selectedLanguage) {
                this.languageKeys.splice(i, 1);
                break;
            }
        }
        this.hideModal(modal);
    };
    /**
     * Load all sections
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.getSections = function () {
        var _this = this;
        this.selectedSection = null;
        this.subscriptions['getSections'] = this._adminTranslationService.getSectionsRest().subscribe(function (res) {
            _this.sections = res.data;
            _this.translationsDataUpload = [];
            _this.clearFilters();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Load section for editing
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.getEditSection = function (selectedSection) {
        this.sectionEditingObject = {
            prefix: 'njamb.',
            edit: selectedSection.replace('njamb.', ''),
            suffix: '.bljab'
        };
    };
    /**
     * Edit selected section
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.postEditSection = function (modal) {
        var _this = this;
        this.subscriptions['postEditSection'] = this._adminTranslationService.editSectionRest(this.selectedSection, this.sectionEditingObject.prefix + this.sectionEditingObject.edit).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.selectedSection = null;
            _this.selectedModule = null;
            _this.getSections();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    AdminTranslationCmp.prototype.trackByIndex = function (index) {
        return index;
    };
    /**
     * Delete selected section
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.deleteSection = function (sectionName, modal) {
        var _this = this;
        this.subscriptions['deleteSection'] = this._adminTranslationService.deleteSectionRest(sectionName).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.sections = null;
            _this.selectedSection = null;
            _this.modules = null;
            _this.selectedModule = null;
            _this.tableTranslations = [];
            _this.clearFilters();
            _this.getSections();
            modal.hide();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Load modules based on selected section
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.getModules = function () {
        var _this = this;
        this.tableTranslations = [];
        if (this.selectedSection) {
            this.subscriptions['getModules'] = this._adminTranslationService.getModulesRest(this.selectedSection).subscribe(function (res) {
                _this.modules = res.data;
                _this.translationsDataUpload = [];
                _this.selectedModule = null;
                _this.clearFilters();
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            });
        }
    };
    /**
     * Load module for editing
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.getEditModule = function (selectedModule) {
        var pom = selectedModule.split('.');
        this.moduleEditingObject = {
            prefix: pom[0] + '.' + pom[1] + '.',
            edit: pom[2]
        };
    };
    /**
     * Edit selected module
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.postEditModule = function (modal) {
        var _this = this;
        this.subscriptions['postEditModule'] = this._adminTranslationService.editModuleRest(this.selectedModule, this.moduleEditingObject.prefix + this.moduleEditingObject.edit).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.selectedModule = null;
            _this.getModules();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Delete selected module
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.deleteModule = function (moduleName, modal) {
        var _this = this;
        this.subscriptions['deleteModule'] = this._adminTranslationService.deleteModuleRest(moduleName).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.modules = null;
            _this.selectedModule = null;
            _this.tableTranslations = [];
            _this.getModules();
            _this.getSections();
            modal.hide();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Alter list of translation objects for easier processing in datatable
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.modifyTranslations = function (object) {
        this.tableTranslations = [];
        for (var i = 0; i < object.length; i++) {
            this.tableTranslations.push({
                genericName: object[i].genericName,
                defaultTranslation: object[i].defaultTranslation
            });
            for (var t = 0; t < this.languages.length; t++) {
                this.tableTranslations[i][this.languages[t]] = "";
            }
            for (var j = 0; j < object[i].kjcResourceBundles.length; j++) {
                for (var k = 0; k < Object.keys(this.tableTranslations[i]).length; k++) {
                    if (object[i].kjcResourceBundles[j].language == Object.keys(this.tableTranslations[i])[k]) {
                        this.tableTranslations[i][Object.keys(this.tableTranslations[i])[k]] = object[i].kjcResourceBundles[j].translation;
                    }
                }
            }
        }
    };
    /**
     * Load translations based on selected section and module
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.getTranslations = function () {
        var _this = this;
        if (this.selectedModule) {
            this.subscriptions['getTranslations'] = this._adminTranslationService.getTranslationsRest(this.selectedModule).subscribe(function (res) {
                _this.translations = res.data;
                _this.modifyTranslations(_this.translations);
                _this.translationsDataUpload = [];
                _this.clearFilters();
            }, function (err) {
                _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            });
        }
    };
    /**
     * Prepare translations for uploading
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.addUploadTranslation = function (source) {
        if (source == 'sectionAdd') {
            this.translationsDataUpload = [];
            var translations = {};
            for (var i = 0; i < this.languages.length; i++) {
                translations[this.languages[i]] = "";
            }
            this.translationsDataUpload.push({
                section: "",
                moduleAdd: "",
                keyAdd: "",
                defaultTranslation: "",
                translations: translations,
                prefix: "njamb.",
                suffix: ".bljab",
                source: "sectionAdd"
            });
        }
        else if (source == 'moduleAdd') {
            this.translationsDataUpload = [];
            var translations = {};
            for (var i = 0; i < this.languages.length; i++) {
                translations[this.languages[i]] = "";
            }
            this.translationsDataUpload.push({
                moduleAdd: "",
                keyAdd: "",
                defaultTranslation: "",
                translations: translations,
                prefix: this.selectedSection + '.',
                suffix: ".bljab",
                source: "moduleAdd"
            });
        }
        else if (source == 'keyAdd') {
            var translations = {};
            for (var i = 0; i < this.languages.length; i++) {
                translations[this.languages[i]] = "";
            }
            if (this.translationsDataUpload.length > 0) {
                if (this.translationsDataUpload[0].source == 'sectionAdd' || this.translationsDataUpload[0].source == 'moduleAdd') {
                    this.translationsDataUpload = [];
                }
            }
            this.translationsDataUpload.push({
                genericName: "",
                defaultTranslation: "",
                translations: translations,
                prefix: this.selectedModule + '.',
                suffix: ".bljab",
                source: "keyAdd"
            });
        }
    };
    /**
     * Upload new translations
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.uploadTranslations = function () {
        var _this = this;
        this.translationsUpload = [];
        if (this.translationsDataUpload.length == 1 && this.translationsDataUpload[0].source == 'sectionAdd') {
            this.translationsUpload.push({
                genericName: this.translationsDataUpload[0].prefix + this.translationsDataUpload[0].section + '.'
                    + this.translationsDataUpload[0].moduleAdd + '.' + this.translationsDataUpload[0].keyAdd + this.translationsDataUpload[0].suffix,
                defaultTranslation: this.translationsDataUpload[0].defaultTranslation,
                kjcResourceBundles: []
            });
            for (var i = 0; i < this.languages.length; i++) {
                this.translationsUpload[0].kjcResourceBundles.push({
                    language: Object.keys(this.translationsDataUpload[0].translations)[i],
                    translation: this.translationsDataUpload[0].translations[this.languages[i]]
                });
            }
            this.uploadTemp = true;
        }
        else if (this.translationsDataUpload.length == 1 && this.translationsDataUpload[0].source == 'moduleAdd') {
            this.translationsUpload.push({
                genericName: this.translationsDataUpload[0].prefix + this.translationsDataUpload[0].moduleAdd + '.'
                    + this.translationsDataUpload[0].keyAdd + this.translationsDataUpload[0].suffix,
                defaultTranslation: this.translationsDataUpload[0].defaultTranslation,
                kjcResourceBundles: []
            });
            for (var i = 0; i < this.languages.length; i++) {
                this.translationsUpload[0].kjcResourceBundles.push({
                    language: Object.keys(this.translationsDataUpload[0].translations)[i],
                    translation: this.translationsDataUpload[0].translations[this.languages[i]]
                });
            }
            this.uploadTemp = true;
        }
        else {
            for (var i = 0; i < this.translationsDataUpload.length; i++) {
                this.translationsUpload.push({
                    genericName: this.translationsDataUpload[i].prefix + this.translationsDataUpload[i].genericName + this.translationsDataUpload[i].suffix,
                    defaultTranslation: this.translationsDataUpload[i].defaultTranslation,
                    kjcResourceBundles: []
                });
                for (var j = 0; j < this.languages.length; j++) {
                    this.translationsUpload[i].kjcResourceBundles.push({
                        language: Object.keys(this.translationsDataUpload[i].translations)[j],
                        translation: this.translationsDataUpload[i].translations[this.languages[j]]
                    });
                }
            }
            this.uploadTemp = false;
        }
        for (var i = 0; i < this.translationsUpload.length; i++) {
            var j = this.translationsUpload[i].kjcResourceBundles.length;
            while (j--) {
                if (this.translationsUpload[i].kjcResourceBundles[j].translation === "" || this.translationsUpload[i].kjcResourceBundles[j].translation == undefined) {
                    this.translationsUpload[i].kjcResourceBundles.splice(j, 1);
                }
            }
        }
        this.subscriptions['uploadTranslations'] = this._adminTranslationService.addTranslationRest(this.translationsUpload).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            if (_this.translationsDataUpload.length == 1 && _this.uploadTemp) {
                _this.translationsDataUpload = [];
                _this.selectedSection = null;
                _this.selectedModule = null;
                _this.selectedLanguage = null;
                _this.getSections();
                _this.getModules();
                _this.getLanguages();
            }
            else {
                _this.translationsDataUpload = [];
                _this.selectedLanguage = null;
                _this.getLanguages();
                _this.getTranslations();
            }
            _this.translationUploadErrors = new models_1.RestResponse();
        }, function (err) {
            _this.translationUploadErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Load translation for editing
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.getEditTranslation = function (genericName) {
        var translationObject;
        for (var i = 0; i < this.tableTranslations.length; i++) {
            if (this.tableTranslations[i].genericName == genericName) {
                this.translateTempEditingObject = this._utilityService.copy(this.tableTranslations[i]);
                break;
            }
        }
    };
    /**
     * Edit selected translation
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.postEditTranslation = function (modal) {
        var _this = this;
        this.translateEditingObject = {
            genericName: this.translateTempEditingObject.genericName,
            defaultTranslation: this.translateTempEditingObject.defaultTranslation,
            kjcResourceBundles: []
        };
        for (var i_1 = 0; i_1 < Object.keys(this.translateTempEditingObject).length; i_1++) {
            if (Object.keys(this.translateTempEditingObject)[i_1] != "genericName" && Object.keys(this.translateTempEditingObject)[i_1] != "defaultTranslation") {
                this.translateEditingObject.kjcResourceBundles.push({
                    language: Object.keys(this.translateTempEditingObject)[i_1],
                    translation: this.translateTempEditingObject[Object.keys(this.translateTempEditingObject)[i_1]]
                });
            }
        }
        var i = this.translateEditingObject.kjcResourceBundles.length;
        while (i--) {
            if (this.translateEditingObject.kjcResourceBundles[i].translation === "") {
                this.translateEditingObject.kjcResourceBundles.splice(i, 1);
            }
        }
        this.subscriptions['postEditTranslation'] = this._adminTranslationService.editTranslationRest(this.translateEditingObject).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.getTranslations();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Delete selected translation
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.deleteTranslation = function (genericName, modal) {
        var _this = this;
        this.subscriptions['deleteTranslation'] = this._adminTranslationService.deleteTranslationRest(genericName).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            if (_this.tableTranslations.length <= 1) {
                _this.selectedSection = null;
                _this.sections = null;
                _this.selectedModule = null;
                _this.modules = null;
                _this.tableTranslations = [];
                _this.getSections();
            }
            else {
                _this.getTranslations();
            }
            _this.getLanguages();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Remove row from list for uploading files
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.deleteRow = function (i) {
        var temp = this._utilityService.copy(this.translationsDataUpload);
        temp.splice(i, 1);
        this.translationsDataUpload = temp;
    };
    /**
     * Check if chosen file is valid
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.validateCsvFile = function () {
        if (this.csvFile != null &&
            this._fileUploadValidator.isFileValid(this.csvFile, 'csv')) {
            this.csvValidate = false;
        }
        else
            this.csvValidate = true;
    };
    /**
     * Store name of chosen file
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.onChangeCsvFile = function (event) {
        if (event.target.files[0]) {
            this.csvFile = event.target.files[0];
            this.csvFileName = this.csvFile.name;
        }
        this.validateCsvFile();
    };
    /**
     * Clear file input
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.clearCsvFile = function () {
        this.csvFile = null;
        this.csvFileName = null;
        this.csvFileInput.nativeElement.value = "";
        this.fileUploadErrors = new models_1.RestResponse();
        this.validateCsvFile();
    };
    AdminTranslationCmp.prototype.clearFilters = function () {
        this.dataTable.reset();
        this.globalFilter.nativeElement.value = "";
    };
    /**
     * Send translation file
     * @author Stefan Svrkota
     */
    AdminTranslationCmp.prototype.postCsvFile = function () {
        var _this = this;
        var formData = new FormData();
        formData.append('translationFile', this.csvFile);
        var override;
        if (this.override == true) {
            override = 1;
        }
        else {
            override = 0;
        }
        this.subscriptions['postCsvFile'] = this._adminTranslationService.uploadCsvFileRest(formData, override).subscribe(function (res) {
            _this.fileUploadErrors = new models_1.RestResponse();
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.selectedSection = null;
            _this.selectedModule = null;
            _this.modules = null;
            _this.tableTranslations = [];
            _this.clearCsvFile();
            _this.validateCsvFile();
            _this.getSections();
            _this.getLanguages();
        }, function (err) {
            _this.fileUploadErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Showing modal
     * @author Mario Petrovic
     */
    AdminTranslationCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert);
        switch (modalName) {
            case 'editSection':
                this.sectionDelete = false;
                this.sectionEdit = true;
                this.getEditSection(data);
                break;
            case 'deleteSection':
                this.sectionEdit = false;
                this.sectionDelete = true;
                break;
            case 'editModule':
                this.moduleDelete = false;
                this.moduleEdit = true;
                this.getEditModule(data);
                break;
            case 'deleteModule':
                this.moduleEdit = false;
                this.moduleDelete = true;
                break;
            case 'editTranslation':
                this.translateDelete = false;
                this.translateEdit = true;
                this.getEditTranslation(data);
                break;
            case 'deleteTranslation':
                this.translateEdit = false;
                this.translateDelete = true;
                this.deleteGenericName = data;
                break;
        }
        modal.show();
    };
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    AdminTranslationCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /*--------- NG On Init ---------*/
    AdminTranslationCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        // Variables initialization
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        this.csvValidate = true;
        this.fileUploadErrors = new models_1.RestResponse();
        this.translationUploadErrors = new models_1.RestResponse();
        // Initial methods
        this.getLanguages();
        this.getAvailableLanguages();
        this.getSections();
        this._appService.languageChangeForComponent(this);
    };
    /*--------- NG On Destroy ---------*/
    AdminTranslationCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('csvFileInput'), 
        __metadata('design:type', Object)
    ], AdminTranslationCmp.prototype, "csvFileInput", void 0);
    __decorate([
        core_1.ViewChild('adminTranslationDataTable'), 
        __metadata('design:type', Object)
    ], AdminTranslationCmp.prototype, "dataTable", void 0);
    __decorate([
        core_1.ViewChild('globalFilter'), 
        __metadata('design:type', Object)
    ], AdminTranslationCmp.prototype, "globalFilter", void 0);
    AdminTranslationCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'adminTranslation.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, adminTranslation_service_1.AdminTranslationService, app_service_1.AppService, ng2_translate_1.TranslateService, fileUploadValidator_cmp_1.FileUploadValidator, core_1.ChangeDetectorRef])
    ], AdminTranslationCmp);
    return AdminTranslationCmp;
}());
exports.AdminTranslationCmp = AdminTranslationCmp;
//# sourceMappingURL=adminTranslation.cmp.js.map
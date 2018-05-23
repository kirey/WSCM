import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';

import { Footer } from 'primeng/primeng';

import { TranslateService } from 'ng2-translate';

import { ModalDirective } from 'ng2-bootstrap';

import { AdminTranslationService } from './adminTranslation.service';

import { FileUploadValidator } from '../shared/fileUploadValidator.cmp';

import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';

import { Alert, RestResponse } from '../shared/models';

@Component({
    moduleId: module.id,
    templateUrl: 'adminTranslation.cmp.html',

    encapsulation: ViewEncapsulation.None
})
export class AdminTranslationCmp implements OnInit {

    languages: any;
    tableLanguages: any;

    availableLanguages: any;
    selectedLanguage: any;
    languageKeys: any;
    clickedRow: number;
    newTranslation: boolean;

    sections: string[];
    selectedSection: string;
    modules: string[];
    selectedModule: string;
    translations: any;
    tableTranslations: any[] = [];
    translationsDataUpload: any[] = [];
    translationsUpload: any[] = [];
    uploadTemp: boolean;

    sectionEditingObject: any;
    sectionEdit: boolean;
    sectionDelete: boolean;

    moduleEditingObject: any;
    moduleEdit: boolean;
    moduleDelete: boolean;

    translateEditingObject: any;
    translateTempEditingObject: any;
    translateEdit: boolean;
    translateDelete: boolean;

    deleteGenericName: any;

    subscriptions: Object;
    componentAlert: Alert;

    csvFile: any;
    csvFileName: string;
    csvValidate: boolean;
    override: boolean;

    @ViewChild('csvFileInput')
    csvFileInput: any;

    @ViewChild('adminTranslationDataTable')
    dataTable: any;

    @ViewChild('globalFilter')
    globalFilter: any;

    fileUploadErrors: RestResponse<any>;
    translationUploadErrors: RestResponse<any>;

    /*--------- Constructor ---------*/
    constructor(
        private _utilityService: UtilityService,
        private _adminTranslationService: AdminTranslationService,
        private _appService: AppService,
        private _translateService: TranslateService,
        private _fileUploadValidator: FileUploadValidator,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    /*--------- App logic ---------*/

    /**
     * Load all languages
     * @author Stefan Svrkota
     */
    getLanguages() {
        this.subscriptions['getLanguages'] = this._adminTranslationService.getLanguagesRest().subscribe(
            (res: RestResponse<any>) => {
                this.languages = res.data;
                this.tableLanguages = this._utilityService.copy(this.languages);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Load all languages that can be added
     * @author Stefan Svrkota
     */
    getAvailableLanguages() {
        this.subscriptions['getAvailableLanguages'] = this._adminTranslationService.getAvailableLanguagesRest().subscribe(
            (res: RestResponse<any>) => {
                this.availableLanguages = res.data;
                this.languageKeys = Object.keys(this.availableLanguages);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Add new language
     * @author Stefan Svrkota
     */
    addLanguage(modal: ModalDirective) {
        this.languages.push(this.selectedLanguage);
        for (let i = 0; i < this.languageKeys.length; i++) {
            if (this.languageKeys[i] == this.selectedLanguage) {
                this.languageKeys.splice(i, 1);
                break;
            }
        }
        this.hideModal(modal);
    }

    /**
     * Load all sections
     * @author Stefan Svrkota
     */
    getSections() {
        this.selectedSection = null;

        this.subscriptions['getSections'] = this._adminTranslationService.getSectionsRest().subscribe(
            (res: RestResponse<any>) => {
                this.sections = res.data;
                this.translationsDataUpload = [];
                this.clearFilters();
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Load section for editing
     * @author Stefan Svrkota
     */
    getEditSection(selectedSection: string) {
        this.sectionEditingObject = {
            prefix: 'njamb.',
            edit: selectedSection.replace('njamb.', ''),
            suffix: '.bljab'
        };
    }

    /**
     * Edit selected section
     * @author Stefan Svrkota
     */
    postEditSection(modal: ModalDirective) {
        this.subscriptions['postEditSection'] = this._adminTranslationService.editSectionRest(this.selectedSection, this.sectionEditingObject.prefix + this.sectionEditingObject.edit).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.selectedSection = null;
                this.selectedModule = null;
                this.getSections();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    trackByIndex(index) {
        return index;
    }

    /**
     * Delete selected section
     * @author Stefan Svrkota
     */
    deleteSection(sectionName: string, modal: ModalDirective) {
        this.subscriptions['deleteSection'] = this._adminTranslationService.deleteSectionRest(sectionName).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.sections = null;
                this.selectedSection = null;
                this.modules = null;
                this.selectedModule = null;
                this.tableTranslations = [];
                this.clearFilters();
                this.getSections();

                modal.hide();
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Load modules based on selected section
     * @author Stefan Svrkota
     */
    getModules() {
        this.tableTranslations = [];
        if (this.selectedSection) {
            this.subscriptions['getModules'] = this._adminTranslationService.getModulesRest(this.selectedSection).subscribe(
                (res: RestResponse<any>) => {
                    this.modules = res.data;
                    this.translationsDataUpload = [];
                    this.selectedModule = null;
                    this.clearFilters();
                },
                (err: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                }
            )
        }
    }

    /**
     * Load module for editing
     * @author Stefan Svrkota
     */
    getEditModule(selectedModule: string) {
        let pom = selectedModule.split('.');
        this.moduleEditingObject = {
            prefix: pom[0] + '.' + pom[1] + '.',
            edit: pom[2]
        };
    }

    /**
     * Edit selected module
     * @author Stefan Svrkota
     */
    postEditModule(modal: ModalDirective) {
        this.subscriptions['postEditModule'] = this._adminTranslationService.editModuleRest(this.selectedModule, this.moduleEditingObject.prefix + this.moduleEditingObject.edit).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.selectedModule = null;
                this.getModules();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Delete selected module
     * @author Stefan Svrkota
     */
    deleteModule(moduleName: string, modal: ModalDirective) {
        this.subscriptions['deleteModule'] = this._adminTranslationService.deleteModuleRest(moduleName).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.modules = null;
                this.selectedModule = null;
                this.tableTranslations = [];
                this.getModules();
                this.getSections();

                modal.hide();
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Alter list of translation objects for easier processing in datatable
     * @author Stefan Svrkota
     */
    modifyTranslations(object: any) {

        this.tableTranslations = [];

        for (let i = 0; i < object.length; i++) {

            this.tableTranslations.push({
                genericName: object[i].genericName,
                defaultTranslation: object[i].defaultTranslation
            })

            for (let t = 0; t < this.languages.length; t++) {
                this.tableTranslations[i][this.languages[t]] = "";
            }

            for (let j = 0; j < object[i].kjcResourceBundles.length; j++) {
                for (let k = 0; k < Object.keys(this.tableTranslations[i]).length; k++) {
                    if (object[i].kjcResourceBundles[j].language == Object.keys(this.tableTranslations[i])[k]) {
                        this.tableTranslations[i][Object.keys(this.tableTranslations[i])[k]] = object[i].kjcResourceBundles[j].translation;
                    }
                }
            }
        }
    }

    /**
     * Load translations based on selected section and module
     * @author Stefan Svrkota
     */
    getTranslations() {
        if (this.selectedModule) {
            this.subscriptions['getTranslations'] = this._adminTranslationService.getTranslationsRest(this.selectedModule).subscribe(
                (res: RestResponse<any>) => {
                    this.translations = res.data;
                    this.modifyTranslations(this.translations);
                    this.translationsDataUpload = [];
                    this.clearFilters();
                },
                (err: RestResponse<any>) => {
                    this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                }
            )
        }
    }

    /**
     * Prepare translations for uploading
     * @author Stefan Svrkota
     */
    addUploadTranslation(source: string) {
        if (source == 'sectionAdd') {
            this.translationsDataUpload = [];
            let translations = {};
            for (let i = 0; i < this.languages.length; i++) {
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
            })
        } else if (source == 'moduleAdd') {
            this.translationsDataUpload = [];
            let translations = {};
            for (let i = 0; i < this.languages.length; i++) {
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
            })
        } else if (source == 'keyAdd') {
            let translations = {};
            for (let i = 0; i < this.languages.length; i++) {
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
            })
        }
    }

    /**
     * Upload new translations
     * @author Stefan Svrkota
     */
    uploadTranslations() {
        this.translationsUpload = [];
        if (this.translationsDataUpload.length == 1 && this.translationsDataUpload[0].source == 'sectionAdd') {
            this.translationsUpload.push({
                genericName: this.translationsDataUpload[0].prefix + this.translationsDataUpload[0].section + '.'
                + this.translationsDataUpload[0].moduleAdd + '.' + this.translationsDataUpload[0].keyAdd + this.translationsDataUpload[0].suffix,
                defaultTranslation: this.translationsDataUpload[0].defaultTranslation,
                kjcResourceBundles: []
            })

            for (let i = 0; i < this.languages.length; i++) {
                this.translationsUpload[0].kjcResourceBundles.push({
                    language: Object.keys(this.translationsDataUpload[0].translations)[i],
                    translation: this.translationsDataUpload[0].translations[this.languages[i]]
                })
            }

            this.uploadTemp = true;
        } else if (this.translationsDataUpload.length == 1 && this.translationsDataUpload[0].source == 'moduleAdd') {
            this.translationsUpload.push({
                genericName: this.translationsDataUpload[0].prefix + this.translationsDataUpload[0].moduleAdd + '.'
                + this.translationsDataUpload[0].keyAdd + this.translationsDataUpload[0].suffix,
                defaultTranslation: this.translationsDataUpload[0].defaultTranslation,
                kjcResourceBundles: []
            })

            for (let i = 0; i < this.languages.length; i++) {
                this.translationsUpload[0].kjcResourceBundles.push({
                    language: Object.keys(this.translationsDataUpload[0].translations)[i],
                    translation: this.translationsDataUpload[0].translations[this.languages[i]]
                })
            }

            this.uploadTemp = true;
        } else {
            for (let i = 0; i < this.translationsDataUpload.length; i++) {
                this.translationsUpload.push({
                    genericName: this.translationsDataUpload[i].prefix + this.translationsDataUpload[i].genericName + this.translationsDataUpload[i].suffix,
                    defaultTranslation: this.translationsDataUpload[i].defaultTranslation,
                    kjcResourceBundles: []
                });

                for (let j = 0; j < this.languages.length; j++) {
                    this.translationsUpload[i].kjcResourceBundles.push({
                        language: Object.keys(this.translationsDataUpload[i].translations)[j],
                        translation: this.translationsDataUpload[i].translations[this.languages[j]]
                    })
                }
            }
            this.uploadTemp = false;
        }

        for (let i = 0; i < this.translationsUpload.length; i++) {
            let j = this.translationsUpload[i].kjcResourceBundles.length;
            while (j--) {
                if (this.translationsUpload[i].kjcResourceBundles[j].translation === "" || this.translationsUpload[i].kjcResourceBundles[j].translation == undefined) {
                    this.translationsUpload[i].kjcResourceBundles.splice(j, 1);
                }
            }
        }

        this.subscriptions['uploadTranslations'] = this._adminTranslationService.addTranslationRest(this.translationsUpload).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                if (this.translationsDataUpload.length == 1 && this.uploadTemp) {
                    this.translationsDataUpload = [];
                    this.selectedSection = null;
                    this.selectedModule = null;
                    this.selectedLanguage = null;
                    this.getSections();
                    this.getModules();
                    this.getLanguages();
                } else {
                    this.translationsDataUpload = [];
                    this.selectedLanguage = null;
                    this.getLanguages();
                    this.getTranslations();
                }
                this.translationUploadErrors = new RestResponse();
            },
            (err: RestResponse<any>) => {
                this.translationUploadErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Load translation for editing
     * @author Stefan Svrkota
     */
    getEditTranslation(genericName: string) {
        let translationObject;

        for (let i = 0; i < this.tableTranslations.length; i++) {
            if (this.tableTranslations[i].genericName == genericName) {
                this.translateTempEditingObject = this._utilityService.copy(this.tableTranslations[i]);
                break;
            }
        }
    }

    /**
     * Edit selected translation
     * @author Stefan Svrkota
     */
    postEditTranslation(modal: ModalDirective) {
        this.translateEditingObject = {
            genericName: this.translateTempEditingObject.genericName,
            defaultTranslation: this.translateTempEditingObject.defaultTranslation,
            kjcResourceBundles: []
        }

        for (let i = 0; i < Object.keys(this.translateTempEditingObject).length; i++) {
            if (Object.keys(this.translateTempEditingObject)[i] != "genericName" && Object.keys(this.translateTempEditingObject)[i] != "defaultTranslation") {
                this.translateEditingObject.kjcResourceBundles.push({
                    language: Object.keys(this.translateTempEditingObject)[i],
                    translation: this.translateTempEditingObject[Object.keys(this.translateTempEditingObject)[i]]
                })
            }
        }

        let i = this.translateEditingObject.kjcResourceBundles.length;

        while (i--) {
            if (this.translateEditingObject.kjcResourceBundles[i].translation === "") {
                this.translateEditingObject.kjcResourceBundles.splice(i, 1);
            }
        }

        this.subscriptions['postEditTranslation'] = this._adminTranslationService.editTranslationRest(this.translateEditingObject).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.getTranslations();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Delete selected translation
     * @author Stefan Svrkota
     */
    deleteTranslation(genericName: string, modal: ModalDirective) {
        this.subscriptions['deleteTranslation'] = this._adminTranslationService.deleteTranslationRest(genericName).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                if (this.tableTranslations.length <= 1) {
                    this.selectedSection = null
                    this.sections = null;
                    this.selectedModule = null;
                    this.modules = null;
                    this.tableTranslations = [];
                    this.getSections();
                } else {
                    this.getTranslations();
                }
                this.getLanguages();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Remove row from list for uploading files
     * @author Stefan Svrkota
     */
    deleteRow(i: number) {
        let temp = this._utilityService.copy(this.translationsDataUpload);
        temp.splice(i, 1);
        this.translationsDataUpload = temp;
    }

    /**
     * Check if chosen file is valid
     * @author Stefan Svrkota
     */
    validateCsvFile() {
        if (this.csvFile != null &&
            this._fileUploadValidator.isFileValid(this.csvFile, 'csv')) {
            this.csvValidate = false;
        } else
            this.csvValidate = true;
    }

    /**
     * Store name of chosen file
     * @author Stefan Svrkota
     */
    onChangeCsvFile(event: any): void {
        if (event.target.files[0]) {
            this.csvFile = event.target.files[0];
            this.csvFileName = this.csvFile.name;
        }
        this.validateCsvFile();
    }

    /**
     * Clear file input
     * @author Stefan Svrkota
     */
    clearCsvFile() {
        this.csvFile = null;
        this.csvFileName = null;
        this.csvFileInput.nativeElement.value = "";
        this.fileUploadErrors = new RestResponse();
        this.validateCsvFile();
    }

    clearFilters() {
        this.dataTable.reset();
        this.globalFilter.nativeElement.value = "";
    }

    /**
     * Send translation file
     * @author Stefan Svrkota
     */
    postCsvFile() {

        let formData = new FormData();

        formData.append('translationFile', this.csvFile);

        let override: number;
        if (this.override == true) {
            override = 1;
        } else {
            override = 0;
        }

        this.subscriptions['postCsvFile'] = this._adminTranslationService.uploadCsvFileRest(formData, override).subscribe(
            (res: RestResponse<any>) => {
                this.fileUploadErrors = new RestResponse();
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.selectedSection = null;
                this.selectedModule = null;
                this.modules = null;
                this.tableTranslations = [];
                this.clearCsvFile();
                this.validateCsvFile();
                this.getSections();
                this.getLanguages();
            },
            (err: RestResponse<any>) => {
                this.fileUploadErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Showing modal
     * @author Mario Petrovic
     */
    public showModal(modal: ModalDirective, modalName: string, data?: any) {
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

        // Variables initialization

        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);
        this.csvValidate = true;
        this.fileUploadErrors = new RestResponse();
        this.translationUploadErrors = new RestResponse();

        // Initial methods

        this.getLanguages();
        this.getAvailableLanguages();
        this.getSections();

        this._appService.languageChangeForComponent(this);
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}
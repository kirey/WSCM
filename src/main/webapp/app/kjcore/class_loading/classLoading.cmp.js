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
var classLoading_service_1 = require('./classLoading.service');
var fileUploadValidator_cmp_1 = require('../shared/fileUploadValidator.cmp');
var app_service_1 = require('../shared/services/app.service');
var utility_service_1 = require('../shared/services/utility.service');
var models_1 = require('../shared/models');
var ClassLoadingCmp = (function () {
    /*--------- Constructor --------*/
    function ClassLoadingCmp(_appService, viewContainerRef, _classLoadingService, _fileUploadValidator, _translateService, _utilityService) {
        this._appService = _appService;
        this.viewContainerRef = viewContainerRef;
        this._classLoadingService = _classLoadingService;
        this._fileUploadValidator = _fileUploadValidator;
        this._translateService = _translateService;
        this._utilityService = _utilityService;
        this.pageSizes = [5, 10, 15, 20, 25, 50, 100, 250, 500];
        this.compiledFileError = false;
        this.buttonAnimation = false;
    }
    /*--------- App logic --------*/
    /**
     * Stores .java file and its name in separate variables
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.onChangeJavaFile = function (event) {
        if (event.target.files[0]) {
            this.javaFile = event.target.files[0];
            this.javaFileName = this.javaFile.name;
            if (this.compiledFileName) {
                if (this.javaFileName.split('.')[0] != this.compiledFileName.split('.')[0])
                    this.uploadFilesError = true;
                else
                    this.uploadFilesError = false;
            }
        }
    };
    /**
     * Stores .class file and its name in separate variables
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.onChangeCompiledFile = function (event) {
        if (event.target.files[0]) {
            this.compiledFile = event.target.files[0];
            this.compiledFileName = this.compiledFile.name;
            if (this.javaFileName) {
                if (this.javaFileName.split('.')[0] != this.compiledFileName.split('.')[0])
                    this.uploadFilesError = true;
                else
                    this.uploadFilesError = false;
            }
        }
    };
    /**
     * Stores .class file and its name in separate variables for editing
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.onChangeCompiledFileEdit = function (event) {
        if (event.target.files[0]) {
            this.compiledFileEdit = event.target.files[0];
            this.compiledFileNameEdit = this.compiledFileEdit.name;
            if (this.classEditName == this.compiledFileNameEdit.split('.')[0])
                this.compiledFileError = false;
            else
                this.compiledFileError = true;
        }
    };
    ClassLoadingCmp.prototype.clearFileEdit = function () {
        this.compiledFileEdit = null;
        this.compiledFileInputEdit.nativeElement.value = "";
        this.compiledFileError = null;
    };
    ClassLoadingCmp.prototype.fileByteToArray = function (object) {
        var tempArray = [];
        for (var _i = 0, object_1 = object; _i < object_1.length; _i++) {
            var objectItem = object_1[_i];
            tempArray.push(objectItem);
        }
        return tempArray;
    };
    /**
     * Check if upload form is valid
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.validateUploadForm = function () {
        if (this.category != null &&
            this.javaFile != null &&
            this.compiledFile != null &&
            this._fileUploadValidator.isFileValid(this.javaFile, 'java') &&
            this._fileUploadValidator.isFileValid(this.compiledFile, 'class') &&
            this.javaFileName.split('.')[0] == this.compiledFileName.split('.')[0]) {
            return false;
        }
        else
            return true;
    };
    /**
     * Clear upload form
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.clearFormUpload = function () {
        this.category = this.allCategories[0];
        this.description = null;
        this.javaFile = null;
        this.javaFileName = null;
        this.compiledFile = null;
        this.compiledFileName = null;
        this.uploadFilesError = false;
        this.javaFileInput.nativeElement.value = "";
        this.compiledFileInput.nativeElement.value = "";
        this.uploadFormErrors = new models_1.RestResponse();
    };
    ClassLoadingCmp.prototype.addNewClass = function (modal) {
        var _this = this;
        this.uploadFormErrors = new models_1.RestResponse();
        this.edit = false;
        this.add = true;
        modal.show();
        setTimeout(function () {
            _this.clearFormUpload();
        });
    };
    /**
     * Clear edit form
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.clearFormEdit = function () {
        this.categoryEdit = this.allCategories[0];
        this.descriptionEdit = null;
        this.compiledFileEdit = null;
        this.compiledFileNameEdit = null;
        this.classEditName = null;
        this.compiledFileError = false;
        this.edit = false;
        this.uploadFormErrors = new models_1.RestResponse();
    };
    /**
     * Upload class
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.upload = function (modal) {
        var _this = this;
        var formData = new FormData();
        var kjcClass = {
            description: this.description,
            kjcClassCategories: this.category
        };
        formData.append('javaFile', this.javaFile);
        formData.append('compiledFile', this.compiledFile);
        formData.append('kjcClass', new Blob([JSON.stringify(kjcClass)], {
            type: "application/json"
        }));
        this.subscriptions['upload'] = this._classLoadingService.uploadRest(formData).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.getAllClasses();
            _this.clearFormUpload();
            _this.uploadFormErrors = new models_1.RestResponse();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.uploadFormErrors = err;
        });
    };
    /**
     * Get all categories from database
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.getAllCategories = function () {
        var _this = this;
        this.subscriptions['getAllCategories'] = this._classLoadingService.getAllCategoriesRest().subscribe(function (res) {
            _this.allCategories = res.data;
            _this.category = _this.allCategories[0];
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Get all classes from database
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.getAllClasses = function () {
        var _this = this;
        this.subscriptions['getAllClasses'] = this._classLoadingService.getAllClassesRest().subscribe(function (res) {
            _this.allClasses = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Change class status
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.checkboxChange = function (classObject) {
        var _this = this;
        this.subscriptions['checkboxChange'] = this._classLoadingService.changeStatusRest(classObject.flEnabled, classObject.id).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.getAllClasses();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Change status of all classes
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.checkboxChangeAll = function (event) {
        var _this = this;
        this.subscriptions['checkboxChangeAll'] = this._classLoadingService.changeAllStatusesRest(event).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.getAllClasses();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Delete class
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.deleteClass = function (classObject, modal) {
        var _this = this;
        this.subscriptions['deleteClass'] = this._classLoadingService.deleteClassRest(classObject.kjcPackages.name + '.' + classObject.name).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.getAllClasses();
            _this.hideModal(modal);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Get current values of class that is being edited
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.getEditClass = function (classObject, modal) {
        var _this = this;
        setTimeout(function () {
            _this.clearFileEdit();
        });
        this.editFormErrors = new models_1.RestResponse();
        this.edit;
        this.classEditName = classObject.name;
        this.add = false;
        this.edit = true;
        this.editingObject = classObject;
        this.subscriptions['getEditClass'] = this._classLoadingService.getEditClassRest(classObject.kjcPackages.name + '.' + classObject.name).subscribe(function (res) {
            _this.getEditClassResponse = res.data;
            for (var i = 0; i < _this.allCategories.length; i++) {
                if (_this.allCategories[i].name == _this.getEditClassResponse.kjcClassCategories.name) {
                    _this.categoryEdit = _this.allCategories[i];
                }
            }
            _this.descriptionEdit = _this.getEditClassResponse.description;
            _this._utilityService.setAlert(_this.componentAlert, null);
            modal.show();
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Edit class
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.postEditClass = function (modal) {
        var _this = this;
        var fileList = this.compiledFileInputEdit.nativeElement.files;
        var file = fileList[0];
        var formData = new FormData();
        if (!this.descriptionEdit) {
            this.descriptionEdit = "";
        }
        formData.append('qualifiedClassName', new Blob([this.editingObject.kjcPackages.name + '.' + this.editingObject.name], {
            type: "text/plain"
        }));
        formData.append('compiledFile', file);
        formData.append('description', new Blob([this.descriptionEdit], {
            type: "text/plain"
        }));
        formData.append('kjcCategories', new Blob([JSON.stringify(this.categoryEdit)], {
            type: "application/json"
        }));
        this.subscriptions['postEditClass'] = this._classLoadingService.postEditClassRest(formData).subscribe(function (res) {
            _this.editFormErrors = new models_1.RestResponse();
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            if (file) {
                _this.buttonAnimation = true;
            }
            _this.edit = false;
            _this.classEditName = null;
            _this.clearFormEdit();
            _this.hideModal(modal);
            _this.getAllClasses();
        }, function (err) {
            _this.editFormErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Display modal for class or category delete
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.openDeleteModal = function (object, modal) {
        this.deleteClassObject = object;
        modal.show();
    };
    /**
     * Refresh data table
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.refreshTable = function (table) {
        this.getAllClasses();
        table.globalFilter.value = "";
        table.reset();
    };
    /**
     * JVM
     * @author Stefan Svrkota
     */
    ClassLoadingCmp.prototype.loadClassesIntoJVM = function () {
        var _this = this;
        this.subscriptions['loadClassesIntoJvm'] = this._classLoadingService.enabledClassesInMemoryRest().subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
        this.buttonAnimation = false;
    };
    /**
     * Showing modal
     * @author Mario Petrovic
     */
    ClassLoadingCmp.prototype.showModal = function (modal, modalName, data) {
        this._utilityService.setAlert(this.componentAlert, null);
        this.uploadFormErrors = new models_1.RestResponse();
        switch (modalName) {
            case 'addNewClass':
                this.addNewClass(modal);
                break;
            case 'editClass':
                this.getEditClass(data, modal);
                break;
            case 'deleteClass':
                this.openDeleteModal(data, modal);
                break;
        }
    };
    /**
     * Hide modal based on passed modal directive
     * @author Mario Petrovic
     */
    ClassLoadingCmp.prototype.hideModal = function (modal) {
        modal.hide();
    };
    /*--------- NG On Init ---------*/
    ClassLoadingCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        // Variable initialization
        this.uploadFormErrors = new models_1.RestResponse();
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        this.getAllCategories();
        this.getAllClasses();
        this._appService.languageChangeForComponent(this);
    };
    /*--------- NG On Destroy ---------*/
    ClassLoadingCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('javaFileInput'), 
        __metadata('design:type', Object)
    ], ClassLoadingCmp.prototype, "javaFileInput", void 0);
    __decorate([
        core_1.ViewChild('compiledFileInput'), 
        __metadata('design:type', Object)
    ], ClassLoadingCmp.prototype, "compiledFileInput", void 0);
    __decorate([
        core_1.ViewChild('compiledFileInputEdit'), 
        __metadata('design:type', Object)
    ], ClassLoadingCmp.prototype, "compiledFileInputEdit", void 0);
    ClassLoadingCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'classLoading.cmp.html'
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, core_1.ViewContainerRef, classLoading_service_1.ClassLoadingService, fileUploadValidator_cmp_1.FileUploadValidator, ng2_translate_1.TranslateService, utility_service_1.UtilityService])
    ], ClassLoadingCmp);
    return ClassLoadingCmp;
}());
exports.ClassLoadingCmp = ClassLoadingCmp;
//# sourceMappingURL=classLoading.cmp.js.map
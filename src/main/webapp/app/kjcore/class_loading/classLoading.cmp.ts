import { Component, OnInit, ViewContainerRef, ViewChild, Input } from '@angular/core';

import { TranslateService } from 'ng2-translate';
import { DataTable } from 'primeng/primeng';

import { ClassLoadingService } from './classLoading.service';
import { FileUploadValidator } from '../shared/fileUploadValidator.cmp';

import { AppService } from '../shared/services/app.service';
import { UtilityService } from '../shared/services/utility.service';

import { Alert, RestResponse } from '../shared/models';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    moduleId: module.id,
    templateUrl: 'classLoading.cmp.html'
})
export class ClassLoadingCmp implements OnInit {

    uploadFormErrors: RestResponse<any>;
    editFormErrors: RestResponse<any>;

    allCategories: any;
    category: any;
    description: string;
    javaFile: any;
    javaFileName: string;
    compiledFile: any;
    compiledFileName: string;
    uploadFilesError: boolean;

    pageSizes: number[] = [5, 10, 15, 20, 25, 50, 100, 250, 500];

    allClasses: any;

    edit: boolean;
    add: boolean;
    classEditName: string;
    categoryEdit: any;
    descriptionEdit: string;
    compiledFileEdit: any;
    compiledFileNameEdit: string;
    getEditClassResponse: any;
    deleteClassObject: any;
    editingObject: any;
    compiledFileError: boolean = false;

    subscriptions: Object;
    componentAlert: Alert;

    @ViewChild('javaFileInput')
    javaFileInput: any;

    @ViewChild('compiledFileInput')
    compiledFileInput: any;

    @ViewChild('compiledFileInputEdit')
    compiledFileInputEdit: any;

    buttonAnimation: boolean = false;

    /*--------- Constructor --------*/
    constructor(
        private _appService: AppService,
        private viewContainerRef: ViewContainerRef,
        private _classLoadingService: ClassLoadingService,
        private _fileUploadValidator: FileUploadValidator,
        private _translateService: TranslateService,
        private _utilityService: UtilityService) {
    }

    /*--------- App logic --------*/

    /**
     * Stores .java file and its name in separate variables
     * @author Stefan Svrkota
     */
    onChangeJavaFile(event: any): void {
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
    }

    /**
     * Stores .class file and its name in separate variables
     * @author Stefan Svrkota
     */
    onChangeCompiledFile(event: any): void {
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
    }

    /**
     * Stores .class file and its name in separate variables for editing
     * @author Stefan Svrkota
     */
    onChangeCompiledFileEdit(event: any): void {
        if (event.target.files[0]) {
            this.compiledFileEdit = event.target.files[0];
            this.compiledFileNameEdit = this.compiledFileEdit.name;
            if (this.classEditName == this.compiledFileNameEdit.split('.')[0])
                this.compiledFileError = false;
            else
                this.compiledFileError = true;
        }
    }

    clearFileEdit() {
        this.compiledFileEdit = null;
        this.compiledFileInputEdit.nativeElement.value = "";
        this.compiledFileError = null;
    }

    fileByteToArray(object: any): any {
        let tempArray: any = [];

        for (let objectItem of object) {
            tempArray.push(objectItem);
        }

        return tempArray;
    }

    /**
     * Check if upload form is valid
     * @author Stefan Svrkota
     */
    validateUploadForm(): boolean {
        if (this.category != null &&
            this.javaFile != null &&
            this.compiledFile != null &&
            this._fileUploadValidator.isFileValid(this.javaFile, 'java') &&
            this._fileUploadValidator.isFileValid(this.compiledFile, 'class') &&
            this.javaFileName.split('.')[0] == this.compiledFileName.split('.')[0]) {
            return false
        } else
            return true;
    }

    /**
     * Clear upload form
     * @author Stefan Svrkota
     */
    clearFormUpload(): void {
        this.category = this.allCategories[0];
        this.description = null;
        this.javaFile = null;
        this.javaFileName = null;
        this.compiledFile = null;
        this.compiledFileName = null;
        this.uploadFilesError = false;
        this.javaFileInput.nativeElement.value = "";
        this.compiledFileInput.nativeElement.value = "";
        this.uploadFormErrors = new RestResponse();
    }



    addNewClass(modal: ModalDirective) {
        this.uploadFormErrors = new RestResponse();
        this.edit = false;
        this.add = true;
        modal.show();
        setTimeout(() => {
            this.clearFormUpload();
        });
    }

    /**
     * Clear edit form
     * @author Stefan Svrkota
     */
    clearFormEdit(): void {
        this.categoryEdit = this.allCategories[0];
        this.descriptionEdit = null;
        this.compiledFileEdit = null;
        this.compiledFileNameEdit = null;
        this.classEditName = null;
        this.compiledFileError = false;
        this.edit = false;
        this.uploadFormErrors = new RestResponse();
    }

    /**
     * Upload class
     * @author Stefan Svrkota
     */
    upload(modal: ModalDirective) {
        let formData = new FormData();
        let kjcClass = {
            description: this.description,
            kjcClassCategories: this.category
        }

        formData.append('javaFile', this.javaFile);
        formData.append('compiledFile', this.compiledFile);
        formData.append('kjcClass', new Blob([JSON.stringify(kjcClass)],
            {
                type: "application/json"
            }));

        this.subscriptions['upload'] = this._classLoadingService.uploadRest(formData).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.getAllClasses();
                this.clearFormUpload();
                this.uploadFormErrors = new RestResponse();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.uploadFormErrors = err;
            })
    }

    /**
     * Get all categories from database
     * @author Stefan Svrkota
     */
    getAllCategories() {
        this.subscriptions['getAllCategories'] = this._classLoadingService.getAllCategoriesRest().subscribe(
            (res: RestResponse<any>) => {
                this.allCategories = res.data;
                this.category = this.allCategories[0];
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Get all classes from database
     * @author Stefan Svrkota
     */
    getAllClasses() {
        this.subscriptions['getAllClasses'] = this._classLoadingService.getAllClassesRest().subscribe(
            (res: RestResponse<any>) => {
                this.allClasses = res.data;
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Change class status
     * @author Stefan Svrkota
     */
    checkboxChange(classObject: any) {
        this.subscriptions['checkboxChange'] = this._classLoadingService.changeStatusRest(classObject.flEnabled, classObject.id).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.getAllClasses();
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Change status of all classes
     * @author Stefan Svrkota
     */
    checkboxChangeAll(event: any) {
        this.subscriptions['checkboxChangeAll'] = this._classLoadingService.changeAllStatusesRest(event).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.getAllClasses();
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Delete class
     * @author Stefan Svrkota
     */
    deleteClass(classObject: any, modal: ModalDirective) {
        this.subscriptions['deleteClass'] = this._classLoadingService.deleteClassRest(classObject.kjcPackages.name + '.' + classObject.name).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.getAllClasses();
                this.hideModal(modal);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Get current values of class that is being edited
     * @author Stefan Svrkota
     */
    getEditClass(classObject: any, modal: ModalDirective) {
        setTimeout(() => {
            this.clearFileEdit();
        })
        this.editFormErrors = new RestResponse();
        this.edit
        this.classEditName = classObject.name;
        this.add = false;
        this.edit = true;
        this.editingObject = classObject;

        this.subscriptions['getEditClass'] = this._classLoadingService.getEditClassRest(classObject.kjcPackages.name + '.' + classObject.name).subscribe(
            (res: RestResponse<any>) => {
                this.getEditClassResponse = res.data;
                for (let i = 0; i < this.allCategories.length; i++) {
                    if (this.allCategories[i].name == this.getEditClassResponse.kjcClassCategories.name) {
                        this.categoryEdit = this.allCategories[i];
                    }
                }
                this.descriptionEdit = this.getEditClassResponse.description;
                this._utilityService.setAlert(this.componentAlert, null);
                modal.show();
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Edit class
     * @author Stefan Svrkota
     */
    postEditClass(modal: ModalDirective) {
        let fileList: FileList = this.compiledFileInputEdit.nativeElement.files;
        let file: File = fileList[0];

        let formData = new FormData();

        if (!this.descriptionEdit) {
            this.descriptionEdit = "";
        }

        formData.append('qualifiedClassName', new Blob([this.editingObject.kjcPackages.name + '.' + this.editingObject.name],
            {
                type: "text/plain"
            }));
        formData.append('compiledFile', file);
        formData.append('description', new Blob([this.descriptionEdit],
            {
                type: "text/plain"
            }));
        formData.append('kjcCategories', new Blob([JSON.stringify(this.categoryEdit)],
            {
                type: "application/json"
            }));

        this.subscriptions['postEditClass'] = this._classLoadingService.postEditClassRest(formData).subscribe(
            (res: RestResponse<any>) => {
                this.editFormErrors = new RestResponse();
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                if (file) {
                    this.buttonAnimation = true;
                }
                this.edit = false;
                this.classEditName = null;
                this.clearFormEdit();
                this.hideModal(modal);
                this.getAllClasses();
            },
            (err: RestResponse<any>) => {
                this.editFormErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )
    }

    /**
     * Display modal for class or category delete
     * @author Stefan Svrkota
     */
    openDeleteModal(object: any, modal: ModalDirective) {
        this.deleteClassObject = object;
        modal.show();
    }

    /**
     * Refresh data table
     * @author Stefan Svrkota
     */
    refreshTable(table: DataTable): void {
        this.getAllClasses();
        table.globalFilter.value = "";
        table.reset();
    }

    /**
     * JVM
     * @author Stefan Svrkota
     */
    loadClassesIntoJVM(): void {
        this.subscriptions['loadClassesIntoJvm'] = this._classLoadingService.enabledClassesInMemoryRest().subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            }
        )

        this.buttonAnimation = false;
    }

    /**
     * Showing modal
     * @author Mario Petrovic
     */
    public showModal(modal: ModalDirective, modalName: string, data?: any) {
        this._utilityService.setAlert(this.componentAlert, null);
        this.uploadFormErrors = new RestResponse();

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
        this.uploadFormErrors = new RestResponse();
        this.subscriptions = {};
        this.componentAlert = new Alert(null, true);

        this.getAllCategories();
        this.getAllClasses();

        this._appService.languageChangeForComponent(this);
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}
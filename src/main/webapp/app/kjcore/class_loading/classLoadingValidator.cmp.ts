import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'upload-validator',
    templateUrl: 'classLoadingValidator.cmp.html'
})
export class ClassLoadingValidator implements OnInit {

    constructor() { }

    @Input()
    file: any;

    @Input()
    extension: any;

    extensionError: string;
    fileSizeError: string;

    ngOnInit() { }

    isFileValid(file: any, extension: string): boolean {
        if (file && this.checkExtension(file, extension) && this.checkFileSize)
            return true;
        else
            return false;
    }

    checkExtension(file?: any, extension?: string): boolean {
        if (file) {
            if (file.name.split('.')[1] == extension)
                return true;
            else {
                return false;
            }
        }
        else {
            if (this.file.name.split('.')[1] == this.extension)
                return false;
            else {
                this.extensionError = 'File extension must be .' + '<b>' + this.extension + '</b>';
                return true;
            }
        }
    }

    checkFileSize(file?: any): boolean {
        if (file) {
            if (file.size <= 1048576)
                return true;
            else {
                return false;
            }
        }
        else {
            if (this.file.size <= 1048576)
                return false;
            else {
                this.fileSizeError = 'Maximum file size is <b>1MB</b>';
                return true;
            }
        }
    }
}
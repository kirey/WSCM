import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'upload-validator',
    templateUrl: 'fileUploadValidator.cmp.html'
})
export class FileUploadValidator implements OnInit {

    constructor() { }

    @Input()
    file: any;

    @Input()
    extension: string | string[];

    extensionError: string;
    fileSizeError: string;

    ngOnInit() { }

    isFileValid(file: any, extension: string | string[]): boolean {
        if (file && this.checkExtension(file, extension) && this.checkFileSize)
            return true;
        else
            return false;
    }

    checkExtension(file?: any, extension?: string | string[]): boolean {
        if (typeof this.extension == "string" || typeof extension == "string") {
            if (file) {
                if (file.name.split('.').pop().toLowerCase() == extension.toString().toLowerCase())
                    return true;
                else {
                    return false;
                }
            }
            else {
                if (this.file.name.split('.').pop().toLowerCase() == this.extension.toString().toLowerCase())
                    return false;
                else {
                    this.extensionError = 'File extension must be .' + '<b>' + this.extension.toString().toLowerCase() + '</b>';
                    return true;
                }
            }
        } else {
            if (file) {
                for (let i = 0; i < extension.length; i++) {
                    if (file.name.split('.').pop().toLowerCase() == extension[i].toString().toLowerCase())
                        return true;
                }
                return false;
            }
            else {
                for (let i = 0; i < this.extension.length; i++) {
                    if (this.file.name.split('.').pop().toLowerCase() == this.extension[i].toString().toLowerCase())
                        return false;
                }
                this.extensionError = 'File extension must be one of the following: <b>' + this.extension.join(', ') + '</b>';
                return true;
            }
        }
    }

    checkFileSize(file?: any): boolean {
        if (file) {
            if (file.size <= 3145728)
                return true;
            else {
                return false;
            }
        }
        else {
            if (this.file.size <= 3145728)
                return false;
            else {
                this.fileSizeError = 'Maximum file size is <b>1MB</b>';
                return true;
            }
        }
    }
}
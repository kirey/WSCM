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
var FileUploadValidator = (function () {
    function FileUploadValidator() {
    }
    FileUploadValidator.prototype.ngOnInit = function () { };
    FileUploadValidator.prototype.isFileValid = function (file, extension) {
        if (file && this.checkExtension(file, extension) && this.checkFileSize)
            return true;
        else
            return false;
    };
    FileUploadValidator.prototype.checkExtension = function (file, extension) {
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
        }
        else {
            if (file) {
                for (var i = 0; i < extension.length; i++) {
                    if (file.name.split('.').pop().toLowerCase() == extension[i].toString().toLowerCase())
                        return true;
                }
                return false;
            }
            else {
                for (var i = 0; i < this.extension.length; i++) {
                    if (this.file.name.split('.').pop().toLowerCase() == this.extension[i].toString().toLowerCase())
                        return false;
                }
                this.extensionError = 'File extension must be one of the following: <b>' + this.extension.join(', ') + '</b>';
                return true;
            }
        }
    };
    FileUploadValidator.prototype.checkFileSize = function (file) {
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FileUploadValidator.prototype, "file", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FileUploadValidator.prototype, "extension", void 0);
    FileUploadValidator = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'upload-validator',
            templateUrl: 'fileUploadValidator.cmp.html'
        }), 
        __metadata('design:paramtypes', [])
    ], FileUploadValidator);
    return FileUploadValidator;
}());
exports.FileUploadValidator = FileUploadValidator;
//# sourceMappingURL=fileUploadValidator.cmp.js.map
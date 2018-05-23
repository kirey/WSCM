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
var ClassLoadingValidator = (function () {
    function ClassLoadingValidator() {
    }
    ClassLoadingValidator.prototype.ngOnInit = function () { };
    ClassLoadingValidator.prototype.isFileValid = function (file, extension) {
        if (file && this.checkExtension(file, extension) && this.checkFileSize)
            return true;
        else
            return false;
    };
    ClassLoadingValidator.prototype.checkExtension = function (file, extension) {
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
    };
    ClassLoadingValidator.prototype.checkFileSize = function (file) {
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ClassLoadingValidator.prototype, "file", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ClassLoadingValidator.prototype, "extension", void 0);
    ClassLoadingValidator = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'upload-validator',
            templateUrl: 'classLoadingValidator.cmp.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ClassLoadingValidator);
    return ClassLoadingValidator;
}());
exports.ClassLoadingValidator = ClassLoadingValidator;
//# sourceMappingURL=classLoadingValidator.cmp.js.map
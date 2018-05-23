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
var models_1 = require('../../models');
var ValidationMessagesCmp = (function () {
    /*--------- Constructor --------*/
    function ValidationMessagesCmp(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
    }
    /*--------- NG On Changes ---------*/
    ValidationMessagesCmp.prototype.ngOnChanges = function (changes) {
        this.errorMessages = [];
        if (this.errors && this.inputName) {
            for (var _i = 0, _a = this.errors.errors; _i < _a.length; _i++) {
                var error = _a[_i];
                if (error.fieldName == this.inputName) {
                    this.errorMessages.push(error.errorCode);
                }
            }
        }
        else if (this.errors && !this.inputName) {
            for (var _b = 0, _c = this.errors.errors; _b < _c.length; _b++) {
                var error = _c[_b];
                this.errorMessages.push(error.errorCode);
            }
        }
    };
    /*--------- NG On Init ---------*/
    ValidationMessagesCmp.prototype.ngOnInit = function () {
        this.errorMessages = [];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.RestResponse)
    ], ValidationMessagesCmp.prototype, "errors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ValidationMessagesCmp.prototype, "inputName", void 0);
    ValidationMessagesCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'validation-messages',
            templateUrl: 'validationMessages.cmp.html'
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], ValidationMessagesCmp);
    return ValidationMessagesCmp;
}());
exports.ValidationMessagesCmp = ValidationMessagesCmp;
//# sourceMappingURL=validationMessages.cmp.js.map
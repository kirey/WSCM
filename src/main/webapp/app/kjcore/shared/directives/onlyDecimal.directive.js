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
var OnlyDecimal = (function () {
    function OnlyDecimal(ctrl, eltRef) {
        this.ctrl = ctrl;
        this.eltRef = eltRef;
        this.allowedNegative = false;
    }
    OnlyDecimal.prototype.onEvent = function ($event) {
        var val = this.formatValue(this.ctrl.control.value.toString());
        this.ctrl.control.patchValue(val, { onlySelf: true, emitEvent: false });
        this.ctrl.control.updateValueAndValidity();
    };
    ;
    OnlyDecimal.prototype.formatValue = function (value) {
        //Replaces every other DOT (.) except first one in given string
        //Taken from: http://stackoverflow.com/questions/8140612/remove-all-dots-except-the-first-one-from-a-string
        value = value.replace(/^([^.]*\.)(.*)$/, function (a, b, c) {
            return b + c.replace(/\./g, '');
        });
        this.ctrl.control.errors;
        var newVal = value.toString().replace(/[^0-9.]/g, "");
        if (this.allowedNegative && value.charAt(0) == '-') {
            newVal.replace(/-/g, "");
            newVal = "-" + newVal;
        }
        return newVal;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], OnlyDecimal.prototype, "allowedNegative", void 0);
    __decorate([
        core_1.HostListener('input', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], OnlyDecimal.prototype, "onEvent", null);
    OnlyDecimal = __decorate([
        core_1.Directive({
            selector: '[onlyDecimal]'
        }), 
        __metadata('design:paramtypes', [forms_1.NgControl, core_1.ElementRef])
    ], OnlyDecimal);
    return OnlyDecimal;
}());
exports.OnlyDecimal = OnlyDecimal;
//# sourceMappingURL=onlyDecimal.directive.js.map
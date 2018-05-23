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
var OnlyNumber = (function () {
    function OnlyNumber(ctrl, eltRef) {
        this.ctrl = ctrl;
        this.eltRef = eltRef;
        this.allowedNegative = false;
    }
    OnlyNumber.prototype.onEvent = function ($event) {
        var val = this.ctrl.control.value.toString();
        var newVal = val.replace(/\D+/g, "");
        if (this.allowedNegative && val.charAt(0) == '-') {
            val.replace(/-/g, "");
            newVal = "-" + val;
        }
        if (parseInt(newVal) === NaN)
            newVal = null;
        this.ctrl.control.patchValue(newVal, { onlySelf: true, emitEvent: false });
        this.ctrl.control.updateValueAndValidity();
    };
    ;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], OnlyNumber.prototype, "allowedNegative", void 0);
    __decorate([
        core_1.HostListener('input', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], OnlyNumber.prototype, "onEvent", null);
    OnlyNumber = __decorate([
        core_1.Directive({
            selector: '[onlyNumber]'
        }), 
        __metadata('design:paramtypes', [forms_1.NgControl, core_1.ElementRef])
    ], OnlyNumber);
    return OnlyNumber;
}());
exports.OnlyNumber = OnlyNumber;
//# sourceMappingURL=onlyNumber.directive.js.map
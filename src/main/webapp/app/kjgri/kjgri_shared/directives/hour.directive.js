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
var HourDirective = (function () {
    function HourDirective(ctrl, eltRef) {
        this.ctrl = ctrl;
        this.eltRef = eltRef;
        this.allowedNegative = false;
    }
    HourDirective.prototype.onEvent = function ($event) {
        var val = this.ctrl.control.value;
        if (val > 23) {
            val = val.toString().substr(0, 1);
        }
        if (val < 0 || !val) {
            val = 0;
        }
        this.ctrl.control.patchValue(val, { onlySelf: true, emitEvent: false });
        this.ctrl.control.updateValueAndValidity();
    };
    ;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HourDirective.prototype, "allowedNegative", void 0);
    __decorate([
        core_1.HostListener('input', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], HourDirective.prototype, "onEvent", null);
    HourDirective = __decorate([
        core_1.Directive({
            selector: '[hour]'
        }), 
        __metadata('design:paramtypes', [forms_1.NgControl, core_1.ElementRef])
    ], HourDirective);
    return HourDirective;
}());
exports.HourDirective = HourDirective;
//# sourceMappingURL=hour.directive.js.map
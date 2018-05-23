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
var ShortTextPipe = (function () {
    function ShortTextPipe() {
    }
    ShortTextPipe.prototype.transform = function (value, sliceNumber, sufix) {
        if (value) {
            if (sufix && value.length <= sliceNumber) {
                sufix = '';
            }
            return value.slice(0, sliceNumber) + (sufix ? sufix : '');
        }
        return value;
    };
    ShortTextPipe = __decorate([
        core_1.Pipe({
            name: 'shortText'
        }), 
        __metadata('design:paramtypes', [])
    ], ShortTextPipe);
    return ShortTextPipe;
}());
exports.ShortTextPipe = ShortTextPipe;
//# sourceMappingURL=shortText.pipe.js.map
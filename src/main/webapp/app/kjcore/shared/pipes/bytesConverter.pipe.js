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
var BytesConverterPipe = (function () {
    function BytesConverterPipe() {
    }
    BytesConverterPipe.prototype.transform = function (value) {
        var tempValue = value / 1024;
        if (tempValue < 1) {
            return value + ' B';
        }
        else if (tempValue / 1024 < 1) {
            return (tempValue).toFixed(2) + ' KB';
        }
        else {
            return (tempValue / 1024).toFixed(2) + ' MB';
        }
    };
    BytesConverterPipe = __decorate([
        core_1.Pipe({
            name: 'bytes'
        }), 
        __metadata('design:paramtypes', [])
    ], BytesConverterPipe);
    return BytesConverterPipe;
}());
exports.BytesConverterPipe = BytesConverterPipe;
//# sourceMappingURL=bytesConverter.pipe.js.map
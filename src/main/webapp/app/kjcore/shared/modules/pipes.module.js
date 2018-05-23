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
var bytesConverter_pipe_1 = require('../pipes/bytesConverter.pipe');
var convertTimeout_pipe_1 = require('./../pipes/convertTimeout.pipe');
var shortText_pipe_1 = require("./../pipes/shortText.pipe");
var safeResourceUrl_pipe_1 = require('./../pipes/safeResourceUrl.pipe');
var filterDropdown_pipe_1 = require("./../pipes/filterDropdown.pipe");
var safeStyle_pipe_1 = require("./../pipes/safeStyle.pipe");
var capital_pipe_1 = require('./../pipes/capital.pipe');
var keys_pipe_1 = require('./../pipes/keys.pipe');
var safeHtml_pipe_1 = require('./../pipes/safeHtml.pipe');
var PipesModule = (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        core_1.NgModule({
            imports: [],
            exports: [
                bytesConverter_pipe_1.BytesConverterPipe,
                convertTimeout_pipe_1.ConvertTimeoutPipe,
                shortText_pipe_1.ShortTextPipe,
                safeResourceUrl_pipe_1.SafeResourceUrl,
                filterDropdown_pipe_1.FilterDropdown,
                safeStyle_pipe_1.SafeStylePipe,
                capital_pipe_1.CapitalPipe,
                keys_pipe_1.KeysPipe,
                safeHtml_pipe_1.SafeHtmlPipe
            ],
            declarations: [
                bytesConverter_pipe_1.BytesConverterPipe,
                convertTimeout_pipe_1.ConvertTimeoutPipe,
                shortText_pipe_1.ShortTextPipe,
                safeResourceUrl_pipe_1.SafeResourceUrl,
                filterDropdown_pipe_1.FilterDropdown,
                safeStyle_pipe_1.SafeStylePipe,
                capital_pipe_1.CapitalPipe,
                keys_pipe_1.KeysPipe,
                safeHtml_pipe_1.SafeHtmlPipe
            ],
            providers: [filterDropdown_pipe_1.FilterDropdown],
        }), 
        __metadata('design:paramtypes', [])
    ], PipesModule);
    return PipesModule;
}());
exports.PipesModule = PipesModule;
//# sourceMappingURL=pipes.module.js.map
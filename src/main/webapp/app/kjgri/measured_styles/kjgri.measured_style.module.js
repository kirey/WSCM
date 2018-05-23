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
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var ng2_translate_1 = require('ng2-translate');
var primeng_1 = require('primeng/primeng');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var angular2_color_picker_1 = require('angular2-color-picker');
var lazyLoadDropdown_module_1 = require('../../kjcore/shared/components/lazyLoadDropdown/lazyLoadDropdown.module');
var controlMessages_module_1 = require('../../kjcore/shared/modules/controlMessages.module');
var httpInterceptor_1 = require('../../kjcore/shared/httpInterceptor');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var kjgri_measured_style_routes_1 = require('./kjgri.measured_style.routes');
var utility_module_1 = require('../../kjcore/shared/modules/utility.module');
var kjgri_constants_1 = require('../kjgri.constants');
var kjgri_measured_style_cmp_1 = require('./kjgri.measured_style.cmp');
var kjgri_measured_style_service_1 = require('./kjgri.measured_style.service');
var MeasuredStyleModule = (function () {
    function MeasuredStyleModule() {
    }
    MeasuredStyleModule = __decorate([
        core_1.NgModule({
            imports: [
                utility_module_1.UtilityModule,
                kjgri_measured_style_routes_1.ROUTING,
                lazyLoadDropdown_module_1.LazyLoadDropdownModule,
                primeng_1.DataTableModule,
                primeng_1.SharedModule,
                ng2_bootstrap_1.ModalModule.forRoot(),
                forms_1.ReactiveFormsModule,
                controlMessages_module_1.ControlMessageModule,
                primeng_1.SliderModule,
                primeng_1.AccordionModule,
                primeng_1.CheckboxModule,
                angular2_color_picker_1.ColorPickerModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, kjgri_constants_1.KJGriConstants.TRANSLATION_URL_PREFIX + 'measuredStyle', ''); },
                    deps: [http_1.Http]
                })
            ],
            declarations: [
                kjgri_measured_style_cmp_1.MeasuredStyleCmp
            ],
            providers: [
                kjgri_measured_style_service_1.MeasuredStyleService,
                kjgri_constants_1.KJGriConstants,
                {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions, UtilityService) {
                        return new httpInterceptor_1.HttpInterceptor(backend, defaultOptions, UtilityService);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, utility_service_1.UtilityService]
                }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MeasuredStyleModule);
    return MeasuredStyleModule;
}());
exports.MeasuredStyleModule = MeasuredStyleModule;
//# sourceMappingURL=kjgri.measured_style.module.js.map
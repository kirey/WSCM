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
var ng2_translate_1 = require('ng2-translate');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var primeng_1 = require('primeng/primeng');
var lazyLoadDropdown_module_1 = require('../../kjcore/shared/components/lazyLoadDropdown/lazyLoadDropdown.module');
var hour_directive_1 = require('../kjgri_shared/directives/hour.directive');
var httpInterceptor_1 = require('../../kjcore/shared/httpInterceptor');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var kjgri_home_cmp_1 = require('./kjgri.home.cmp');
var kjgri_home_service_1 = require("./kjgri.home.service");
var kjgri_constants_1 = require('../kjgri.constants');
var utility_module_1 = require('../../kjcore/shared/modules/utility.module');
var kjgri_home_routes_1 = require('./kjgri.home.routes');
/**
 * Module for home page
 * @author Mario Petrovic
 */
var KJGriHomeModule = (function () {
    function KJGriHomeModule() {
    }
    KJGriHomeModule = __decorate([
        core_1.NgModule({
            imports: [
                kjgri_home_routes_1.ROUTING,
                utility_module_1.UtilityModule,
                ng2_bootstrap_1.ModalModule.forRoot(),
                ng2_bootstrap_1.TabsModule.forRoot(),
                ng2_bootstrap_1.TimepickerModule.forRoot(),
                lazyLoadDropdown_module_1.LazyLoadDropdownModule,
                primeng_1.CalendarModule,
                primeng_1.DataTableModule,
                primeng_1.ChartModule,
                primeng_1.SliderModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, kjgri_constants_1.KJGriConstants.TRANSLATION_URL_PREFIX + 'home', ''); },
                    deps: [http_1.Http]
                })
            ],
            declarations: [
                hour_directive_1.HourDirective,
                kjgri_home_cmp_1.KJGriHomeCmp
            ],
            providers: [
                kjgri_home_service_1.KJGriHomeService,
                kjgri_constants_1.KJGriConstants,
                {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions, UtilityService) {
                        return new httpInterceptor_1.HttpInterceptor(backend, defaultOptions, UtilityService);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, utility_service_1.UtilityService]
                }
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], KJGriHomeModule);
    return KJGriHomeModule;
}());
exports.KJGriHomeModule = KJGriHomeModule;
//# sourceMappingURL=kjgri.home.module.js.map
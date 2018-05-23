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
var primeng_1 = require('primeng/primeng');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var ng2_bootstrap_2 = require('ng2-bootstrap');
var ng2_bootstrap_3 = require('ng2-bootstrap');
var classLoading_cmp_1 = require('./classLoading.cmp');
var categories_cmp_1 = require('./categories/categories.cmp');
var categories_service_1 = require('./categories/categories.service');
var classLoading_service_1 = require('./classLoading.service');
var fileUploadValidator_module_1 = require('../shared/modules/fileUploadValidator.module');
var httpInterceptor_1 = require('../shared/httpInterceptor');
var utility_service_1 = require('../shared/services/utility.service');
var utility_module_1 = require('../shared/modules/utility.module');
var classLoading_routes_1 = require('./classLoading.routes');
var controlMessages_module_1 = require('../shared/modules/controlMessages.module');
var constants_1 = require('../constants');
var ClassLoadingModule = (function () {
    function ClassLoadingModule() {
    }
    ClassLoadingModule = __decorate([
        core_1.NgModule({
            imports: [
                primeng_1.DataTableModule,
                primeng_1.CheckboxModule,
                ng2_bootstrap_1.ModalModule.forRoot(),
                ng2_bootstrap_2.TooltipModule.forRoot(),
                ng2_bootstrap_3.TabsModule.forRoot(),
                utility_module_1.UtilityModule,
                classLoading_routes_1.ROUTING,
                controlMessages_module_1.ControlMessageModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, constants_1.Constants.TRANSLATION_URL_PREFIX + 'classLoading', ''); },
                    deps: [http_1.Http]
                }),
                fileUploadValidator_module_1.FileUploadValidatorModule
            ],
            declarations: [
                classLoading_cmp_1.ClassLoadingCmp,
                categories_cmp_1.CategoriesCmp
            ],
            providers: [
                classLoading_service_1.ClassLoadingService,
                categories_service_1.CategoryService,
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
    ], ClassLoadingModule);
    return ClassLoadingModule;
}());
exports.ClassLoadingModule = ClassLoadingModule;
//# sourceMappingURL=classLoading.module.js.map
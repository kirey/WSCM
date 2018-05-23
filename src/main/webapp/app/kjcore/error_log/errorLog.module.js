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
var http_1 = require('@angular/http');
var ng2_translate_1 = require('ng2-translate');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var errorLog_service_1 = require('./errorLog.service');
var errorLog_cmp_1 = require('./errorLog.cmp');
var httpInterceptor_1 = require('../shared/httpInterceptor');
var utility_service_1 = require('../shared/services/utility.service');
var utility_module_1 = require('../shared/modules/utility.module');
var errorLog_routes_1 = require('./errorLog.routes');
var lazyLoadDropdown_module_1 = require('../shared/components/lazyLoadDropdown/lazyLoadDropdown.module');
var primeng_1 = require('primeng/primeng');
var ng2_bootstrap_2 = require('ng2-bootstrap');
var constants_1 = require('../constants');
var ErrorLogModule = (function () {
    function ErrorLogModule() {
    }
    ErrorLogModule = __decorate([
        core_1.NgModule({
            imports: [
                errorLog_routes_1.ROUTING,
                utility_module_1.UtilityModule,
                forms_1.ReactiveFormsModule,
                primeng_1.DataTableModule,
                primeng_1.CalendarModule,
                primeng_1.DropdownModule,
                lazyLoadDropdown_module_1.LazyLoadDropdownModule,
                ng2_bootstrap_2.TooltipModule.forRoot(),
                ng2_bootstrap_1.ModalModule.forRoot(),
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, constants_1.Constants.TRANSLATION_URL_PREFIX + 'errorLog', ''); },
                    deps: [http_1.Http]
                })
            ],
            declarations: [
                errorLog_cmp_1.ErrorLogCmp
            ],
            providers: [
                errorLog_service_1.ErrorLogService,
                {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions, UtilityService) {
                        return new httpInterceptor_1.HttpInterceptor(backend, defaultOptions, UtilityService);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, utility_service_1.UtilityService]
                },
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ErrorLogModule);
    return ErrorLogModule;
}());
exports.ErrorLogModule = ErrorLogModule;
//# sourceMappingURL=errorLog.module.js.map
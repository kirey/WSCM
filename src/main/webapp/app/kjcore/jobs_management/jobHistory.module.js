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
var utility_module_1 = require('../shared/modules/utility.module');
var primeng_1 = require('primeng/primeng');
var ng2_translate_1 = require('ng2-translate');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var httpInterceptor_1 = require('../shared/httpInterceptor');
var utility_service_1 = require('../shared/services/utility.service');
var constants_1 = require('../constants');
var jobHistory_cmp_1 = require('./jobHistory.cmp');
var jobHistory_service_1 = require('./jobHistory.service');
var jobHistory_routes_1 = require('./jobHistory.routes');
var JobHistoryModule = (function () {
    function JobHistoryModule() {
    }
    JobHistoryModule = __decorate([
        core_1.NgModule({
            imports: [
                ng2_bootstrap_1.TooltipModule.forRoot(),
                jobHistory_routes_1.ROUTING,
                utility_module_1.UtilityModule,
                primeng_1.DataTableModule,
                primeng_1.SharedModule,
                primeng_1.ButtonModule,
                primeng_1.CalendarModule,
                ng2_bootstrap_1.ModalModule.forRoot(),
                // This is for translation purpose
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, constants_1.Constants.TRANSLATION_URL_PREFIX + 'jobHistory', ''); },
                    deps: [http_1.Http]
                })
            ],
            declarations: [
                jobHistory_cmp_1.JobHistoryCmp
            ],
            providers: [
                jobHistory_service_1.JobHistoryService,
                // Interceptor is mandatory for http calls
                {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions, UtilityService) {
                        return new httpInterceptor_1.HttpInterceptor(backend, defaultOptions, UtilityService);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, utility_service_1.UtilityService]
                }],
        }), 
        __metadata('design:paramtypes', [])
    ], JobHistoryModule);
    return JobHistoryModule;
}());
exports.JobHistoryModule = JobHistoryModule;
//# sourceMappingURL=jobHistory.module.js.map
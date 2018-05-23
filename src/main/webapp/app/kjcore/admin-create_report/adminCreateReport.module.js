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
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var ng2_translate_1 = require('ng2-translate');
var primeng_1 = require('primeng/primeng');
var adminCreateReport_cmp_1 = require('../admin-create_report/adminCreateReport.cmp');
var adminCreateReport_service_1 = require('../admin-create_report/adminCreateReport.service');
var fileExtensionTrimmer_pipe_1 = require('../shared/pipes/fileExtensionTrimmer.pipe');
var httpInterceptor_1 = require('../shared/httpInterceptor');
var utility_service_1 = require('../shared/services/utility.service');
var adminCreateReport_routes_1 = require('./adminCreateReport.routes');
var utility_module_1 = require('../shared/modules/utility.module');
var constants_1 = require('../constants');
var AdminCreateReportModule = (function () {
    function AdminCreateReportModule() {
    }
    AdminCreateReportModule = __decorate([
        core_1.NgModule({
            imports: [
                ng2_bootstrap_1.TooltipModule.forRoot(),
                utility_module_1.UtilityModule,
                adminCreateReport_routes_1.ROUTING,
                ng2_dragula_1.DragulaModule,
                primeng_1.DropdownModule,
                primeng_1.CheckboxModule,
                primeng_1.RadioButtonModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, constants_1.Constants.TRANSLATION_URL_PREFIX + 'adminCreateReport', ''); },
                    deps: [http_1.Http]
                })
            ],
            declarations: [
                adminCreateReport_cmp_1.AdminCreateReportCmp,
                fileExtensionTrimmer_pipe_1.FileExtensionTrimmer
            ],
            providers: [
                ng2_dragula_1.DragulaService,
                adminCreateReport_service_1.AdminCreateReportService,
                constants_1.Constants,
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
    ], AdminCreateReportModule);
    return AdminCreateReportModule;
}());
exports.AdminCreateReportModule = AdminCreateReportModule;
//# sourceMappingURL=adminCreateReport.module.js.map
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
var primeng_1 = require('primeng/primeng');
var ng2_translate_1 = require('ng2-translate');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var primeng_2 = require('primeng/primeng');
var calendar_module_1 = require('../shared/modules/calendar.module');
var reportManagement_cmp_1 = require('./reportManagement.cmp');
var reportManagement_service_1 = require('./reportManagement.service');
var validation_service_1 = require('../shared/services/validation.service');
var controlMessages_module_1 = require('../shared/modules/controlMessages.module');
var reportFilter_pipe_1 = require('./pipes/reportFilter.pipe');
var httpInterceptor_1 = require('../shared/httpInterceptor');
var utility_service_1 = require('../shared/services/utility.service');
var utility_module_1 = require('../shared/modules/utility.module');
var reportManagement_routes_1 = require('./reportManagement.routes');
var constants_1 = require('../constants');
var ReportManagementModule = (function () {
    function ReportManagementModule() {
    }
    ReportManagementModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.ReactiveFormsModule,
                calendar_module_1.CalendarModule,
                primeng_1.DataScrollerModule,
                primeng_1.GrowlModule,
                primeng_1.MessagesModule,
                ng2_bootstrap_1.ModalModule.forRoot(),
                reportManagement_routes_1.ROUTING,
                utility_module_1.UtilityModule,
                controlMessages_module_1.ControlMessageModule,
                primeng_1.DropdownModule,
                primeng_2.DataTableModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, constants_1.Constants.TRANSLATION_URL_PREFIX + 'reportManagement', ''); },
                    deps: [http_1.Http]
                })
            ],
            declarations: [
                reportManagement_cmp_1.ReportManagementCmp,
                reportFilter_pipe_1.ReportFilterPipe
            ],
            providers: [
                reportManagement_service_1.ReportManagementService,
                validation_service_1.ValidationService,
                forms_1.Validators,
                constants_1.Constants,
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
    ], ReportManagementModule);
    return ReportManagementModule;
}());
exports.ReportManagementModule = ReportManagementModule;
//# sourceMappingURL=reportManagement.module.js.map
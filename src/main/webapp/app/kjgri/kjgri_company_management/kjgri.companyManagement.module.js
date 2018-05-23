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
var angular2_color_picker_1 = require('angular2-color-picker');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var ng2_bootstrap_2 = require('ng2-bootstrap');
var kjgri_companyManagement_cmp_1 = require('./kjgri.companyManagement.cmp');
var kjgri_companyManagement_service_1 = require('./kjgri.companyManagement.service');
var companyManagement_service_1 = require("./../../kjcore/company_management/companyManagement.service");
var httpInterceptor_1 = require('../../kjcore/shared/httpInterceptor');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var controlMessages_module_1 = require('../../kjcore/shared/modules/controlMessages.module');
var lazyLoadDropdown_module_1 = require('../../kjcore/shared/components/lazyLoadDropdown/lazyLoadDropdown.module');
var utility_module_1 = require('../../kjcore/shared/modules/utility.module');
var kjgri_companyManagement_routes_1 = require('./kjgri.companyManagement.routes');
var kjgri_constants_1 = require('../kjgri.constants');
var KJGriCompanyManagementModule = (function () {
    function KJGriCompanyManagementModule() {
    }
    KJGriCompanyManagementModule = __decorate([
        core_1.NgModule({
            imports: [
                utility_module_1.UtilityModule,
                primeng_1.DataTableModule,
                ng2_bootstrap_2.ModalModule.forRoot(),
                ng2_bootstrap_2.TabsModule.forRoot(),
                ng2_bootstrap_2.TooltipModule.forRoot(),
                ng2_bootstrap_1.AccordionModule.forRoot(),
                primeng_1.RadioButtonModule,
                primeng_1.CalendarModule,
                kjgri_companyManagement_routes_1.ROUTING,
                primeng_1.CheckboxModule,
                forms_1.ReactiveFormsModule,
                controlMessages_module_1.ControlMessageModule,
                angular2_color_picker_1.ColorPickerModule,
                lazyLoadDropdown_module_1.LazyLoadDropdownModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, kjgri_constants_1.KJGriConstants.TRANSLATION_URL_PREFIX + 'companyManagement', ''); },
                    deps: [http_1.Http]
                })
            ],
            declarations: [
                kjgri_companyManagement_cmp_1.KJGriCompanyManagementCmp,
            ],
            providers: [
                kjgri_companyManagement_service_1.KJGriCompanyManagementService,
                companyManagement_service_1.CompanyManagementService,
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
    ], KJGriCompanyManagementModule);
    return KJGriCompanyManagementModule;
}());
exports.KJGriCompanyManagementModule = KJGriCompanyManagementModule;
//# sourceMappingURL=kjgri.companyManagement.module.js.map
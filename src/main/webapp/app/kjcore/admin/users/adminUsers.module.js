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
var ng2_bootstrap_1 = require('ng2-bootstrap');
var primeng_1 = require('primeng/primeng');
var ng2_translate_1 = require('ng2-translate');
var httpInterceptor_1 = require('../../shared/httpInterceptor');
var utility_service_1 = require('../../shared/services/utility.service');
var adminUsers_routes_1 = require('./adminUsers.routes');
var utility_module_1 = require('../../shared/modules/utility.module');
var pipes_module_1 = require('../../shared/modules/pipes.module');
var controlMessages_module_1 = require('../../shared/modules/controlMessages.module');
var adminUsers_cmp_1 = require('./adminUsers.cmp');
var adminUsers_service_1 = require('./adminUsers.service');
var companyManagement_service_1 = require('../../company_management/companyManagement.service');
var constants_1 = require('../../constants');
var adminRoles_service_1 = require('./../roles/adminRoles.service');
var AdminUsersModule = (function () {
    function AdminUsersModule() {
    }
    AdminUsersModule = __decorate([
        core_1.NgModule({
            imports: [
                ng2_bootstrap_1.TooltipModule.forRoot(),
                utility_module_1.UtilityModule,
                adminUsers_routes_1.ROUTING,
                primeng_1.DataTableModule,
                primeng_1.MultiSelectModule,
                forms_1.ReactiveFormsModule,
                primeng_1.CalendarModule,
                pipes_module_1.PipesModule,
                primeng_1.CheckboxModule,
                primeng_1.RadioButtonModule,
                primeng_1.DropdownModule,
                ng2_bootstrap_1.ModalModule.forRoot(),
                controlMessages_module_1.ControlMessageModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, constants_1.Constants.TRANSLATION_URL_PREFIX + 'adminUsers', ''); },
                    deps: [http_1.Http]
                })
            ],
            declarations: [
                adminUsers_cmp_1.AdminUsersCmp
            ],
            providers: [
                adminUsers_service_1.AdminUserService,
                adminRoles_service_1.AdminRoleService,
                companyManagement_service_1.CompanyManagementService,
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
    ], AdminUsersModule);
    return AdminUsersModule;
}());
exports.AdminUsersModule = AdminUsersModule;
//# sourceMappingURL=adminUsers.module.js.map
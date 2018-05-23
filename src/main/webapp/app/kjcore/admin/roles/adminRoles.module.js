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
var ng2_bootstrap_2 = require('ng2-bootstrap');
var ng2_translate_1 = require('ng2-translate');
var httpInterceptor_1 = require('../../shared/httpInterceptor');
var utility_service_1 = require('../../shared/services/utility.service');
var adminRoles_routes_1 = require('./adminRoles.routes');
var utility_module_1 = require('../../shared/modules/utility.module');
var pipes_module_1 = require('../../shared/modules/pipes.module');
var controlMessages_module_1 = require('../../shared/modules/controlMessages.module');
var adminRoles_cmp_1 = require('./adminRoles.cmp');
var adminRoles_service_1 = require('./adminRoles.service');
var constants_1 = require('../../constants');
var primeng_1 = require('primeng/primeng');
var AdminRolesModule = (function () {
    function AdminRolesModule() {
    }
    AdminRolesModule = __decorate([
        core_1.NgModule({
            imports: [
                ng2_bootstrap_1.TooltipModule.forRoot(),
                utility_module_1.UtilityModule,
                adminRoles_routes_1.ROUTING,
                primeng_1.DataTableModule,
                forms_1.ReactiveFormsModule,
                pipes_module_1.PipesModule,
                ng2_bootstrap_2.ModalModule.forRoot(),
                controlMessages_module_1.ControlMessageModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, constants_1.Constants.TRANSLATION_URL_PREFIX + 'adminRoles', ''); },
                    deps: [http_1.Http]
                })
            ],
            declarations: [
                adminRoles_cmp_1.AdminRolesCmp
            ],
            providers: [
                adminRoles_service_1.AdminRoleService,
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
    ], AdminRolesModule);
    return AdminRolesModule;
}());
exports.AdminRolesModule = AdminRolesModule;
//# sourceMappingURL=adminRoles.module.js.map
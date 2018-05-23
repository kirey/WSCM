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
var primeng_1 = require('primeng/primeng');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var ng2_translate_1 = require('ng2-translate');
var validationMessages_module_1 = require('../../shared/components/validationMessages/validationMessages.module');
var controlMessages_module_1 = require('../../shared/modules/controlMessages.module');
var utility_module_1 = require('../../shared/modules/utility.module');
var adminEmailConfigs_service_1 = require('./adminEmailConfigs.service');
var utility_service_1 = require('../../shared/services/utility.service');
var validation_service_1 = require('../../shared/services/validation.service');
var adminEmailConfigs_cmp_1 = require('./adminEmailConfigs.cmp');
var httpInterceptor_1 = require('../../shared/httpInterceptor');
var adminEmailConfigs_routes_1 = require('./adminEmailConfigs.routes');
var constants_1 = require('../../constants');
var AdminEmailConfigsModule = (function () {
    function AdminEmailConfigsModule() {
    }
    AdminEmailConfigsModule = __decorate([
        core_1.NgModule({
            imports: [
                adminEmailConfigs_routes_1.ROUTING,
                utility_module_1.UtilityModule,
                primeng_1.InputTextModule,
                primeng_1.ButtonModule,
                primeng_1.MessagesModule,
                primeng_1.DataGridModule,
                primeng_1.DataTableModule,
                ng2_bootstrap_1.ModalModule.forRoot(),
                forms_1.FormsModule,
                controlMessages_module_1.ControlMessageModule,
                forms_1.ReactiveFormsModule,
                validationMessages_module_1.ValidationMessagesModule,
                ng2_bootstrap_1.TooltipModule.forRoot(),
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, constants_1.Constants.TRANSLATION_URL_PREFIX + 'emailConfigs', ''); },
                    deps: [http_1.Http]
                })
            ],
            declarations: [
                adminEmailConfigs_cmp_1.AdminEmailConfigsCmp
            ],
            providers: [adminEmailConfigs_service_1.AdminEmailConfigsService,
                constants_1.Constants,
                validation_service_1.ValidationService,
                {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions, UtilityService) {
                        return new httpInterceptor_1.HttpInterceptor(backend, defaultOptions, UtilityService);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, utility_service_1.UtilityService]
                }],
        }), 
        __metadata('design:paramtypes', [])
    ], AdminEmailConfigsModule);
    return AdminEmailConfigsModule;
}());
exports.AdminEmailConfigsModule = AdminEmailConfigsModule;
//# sourceMappingURL=adminEmailConfigs.module.js.map
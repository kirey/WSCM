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
var kjgri_userPanel_cmp_1 = require('./kjgri.userPanel.cmp');
var kjgri_userPanel_service_1 = require('./kjgri.userPanel.service');
var httpInterceptor_1 = require('../../kjcore/shared/httpInterceptor');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var utility_module_1 = require('../../kjcore/shared/modules/utility.module');
var kjgri_userPanel_routes_1 = require('./kjgri.userPanel.routes');
var kjgri_constants_1 = require('../kjgri.constants');
var UserPanelModule = (function () {
    function UserPanelModule() {
    }
    UserPanelModule = __decorate([
        core_1.NgModule({
            imports: [
                utility_module_1.UtilityModule,
                kjgri_userPanel_routes_1.ROUTING,
                ng2_bootstrap_1.TabsModule.forRoot(),
                // This is for translation purpose
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, kjgri_constants_1.KJGriConstants.TRANSLATION_URL_PREFIX + 'userPanel', ''); },
                    deps: [http_1.Http]
                })
            ],
            declarations: [
                kjgri_userPanel_cmp_1.UserPanelCmp
            ],
            providers: [
                kjgri_userPanel_service_1.UserPanelService,
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
    ], UserPanelModule);
    return UserPanelModule;
}());
exports.UserPanelModule = UserPanelModule;
//# sourceMappingURL=kjgri.userPanel.module.js.map
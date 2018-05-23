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
var adminRoutes_cmp_1 = require('./adminRoutes.cmp');
var adminRoutes_service_1 = require('./adminRoutes.service');
var httpInterceptor_1 = require('../shared/httpInterceptor');
var utility_service_1 = require('../shared/services/utility.service');
var utility_module_1 = require('../shared/modules/utility.module');
var adminRoutes_routes_1 = require('./adminRoutes.routes');
var constants_1 = require('../constants');
var AdminRoutesModule = (function () {
    function AdminRoutesModule() {
    }
    AdminRoutesModule = __decorate([
        core_1.NgModule({
            imports: [
                utility_module_1.UtilityModule,
                primeng_1.DataTableModule,
                ng2_bootstrap_1.ModalModule.forRoot(),
                primeng_1.CheckboxModule,
                ng2_bootstrap_2.TooltipModule.forRoot(),
                adminRoutes_routes_1.ROUTING,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, constants_1.Constants.TRANSLATION_URL_PREFIX + 'adminRoutes', ''); },
                    deps: [http_1.Http]
                })
            ],
            declarations: [
                adminRoutes_cmp_1.AdminRoutesCmp
            ],
            providers: [
                adminRoutes_service_1.AdminRoutesService,
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
    ], AdminRoutesModule);
    return AdminRoutesModule;
}());
exports.AdminRoutesModule = AdminRoutesModule;
//# sourceMappingURL=adminRoutes.module.js.map
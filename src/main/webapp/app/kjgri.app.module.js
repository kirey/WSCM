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
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
// Custom Components
var kjgri_app_cmp_1 = require('./kjgri.app.cmp'); // Main cmp
var kjgri_nav_module_1 = require('./kjgri/kjgri_nav/kjgri.nav.module');
var footer_module_1 = require('./kjcore/footer/footer.module');
var utility_module_1 = require('./kjcore/shared/modules/utility.module');
var auth_service_1 = require('./kjcore/shared/services/auth.service');
var app_service_1 = require('./kjcore/shared/services/app.service');
var appData_service_1 = require('./kjcore/shared/services/appData.service');
var utility_service_1 = require('./kjcore/shared/services/utility.service');
var kjgri_control_panel_service_1 = require('./kjgri/kjgri_shared/kjgri.control_panel.service');
var httpInterceptor_1 = require('./kjcore/shared/httpInterceptor');
var auth_guard_1 = require('./kjcore/auth.guard');
var login_guard_1 = require('./kjcore/login/login.guard');
var kjgri_home_guard_1 = require('./kjgri/kjgri_home/kjgri.home.guard');
var kjgri_constants_1 = require("./kjgri/kjgri.constants");
var app_routes_1 = require('./kjgri/app.routes');
var KJGriAppModule = (function () {
    function KJGriAppModule() {
    }
    KJGriAppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                kjgri_nav_module_1.KJGriNavModule,
                app_routes_1.ROUTING,
                utility_module_1.UtilityModule,
                footer_module_1.FooterModule,
            ],
            declarations: [
                kjgri_app_cmp_1.KJGriAppCmp
            ],
            bootstrap: [kjgri_app_cmp_1.KJGriAppCmp],
            providers: [
                auth_guard_1.AuthGuard,
                login_guard_1.LoginAuthGuard,
                kjgri_home_guard_1.KJGriHomeAuthGuard,
                app_service_1.AppService,
                auth_service_1.AuthService,
                appData_service_1.AppDataService,
                kjgri_constants_1.KJGriConstants,
                kjgri_control_panel_service_1.ControlPanelSharedService,
                {
                    provide: common_1.LocationStrategy,
                    useClass: common_1.HashLocationStrategy
                },
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
    ], KJGriAppModule);
    return KJGriAppModule;
}());
exports.KJGriAppModule = KJGriAppModule;
//# sourceMappingURL=kjgri.app.module.js.map
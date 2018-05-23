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
var kjcore_app_cmp_1 = require('./kjcore.app.cmp'); // Main cmp
var nav_module_1 = require('./kjcore/nav/nav.module');
var footer_module_1 = require('./kjcore/footer/footer.module');
var utility_module_1 = require('./kjcore/shared/modules/utility.module');
var auth_service_1 = require('./kjcore/shared/services/auth.service');
var app_service_1 = require('./kjcore/shared/services/app.service');
var appData_service_1 = require('./kjcore/shared/services/appData.service');
var utility_service_1 = require('./kjcore/shared/services/utility.service');
var httpInterceptor_1 = require('./kjcore/shared/httpInterceptor');
var auth_guard_1 = require('./kjcore/auth.guard');
var login_guard_1 = require('./kjcore/login/login.guard');
var home_guard_1 = require('./kjcore/home/home.guard');
var app_routes_1 = require('./kjcore/app.routes');
var constants_1 = require("./kjcore/constants");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                nav_module_1.NavModule,
                app_routes_1.ROUTING,
                utility_module_1.UtilityModule,
                footer_module_1.FooterModule
            ],
            declarations: [
                kjcore_app_cmp_1.KJCoreAppCmp
            ],
            bootstrap: [kjcore_app_cmp_1.KJCoreAppCmp],
            providers: [
                auth_guard_1.AuthGuard,
                login_guard_1.LoginAuthGuard,
                home_guard_1.HomeAuthGuard,
                app_service_1.AppService,
                auth_service_1.AuthService,
                appData_service_1.AppDataService,
                constants_1.Constants,
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
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=kjcore.app.module.js.map
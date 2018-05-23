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
var utility_service_1 = require("./../../kjcore/shared/services/utility.service");
var router_1 = require('@angular/router');
var Rx_1 = require('rxjs/Rx');
var auth_service_1 = require('./../../kjcore/shared/services/auth.service');
var app_service_1 = require('./../../kjcore/shared/services/app.service');
var LoginAuthGuard = (function () {
    function LoginAuthGuard(_authService, _appService, _utilityService, _router) {
        this._authService = _authService;
        this._appService = _appService;
        this._utilityService = _utilityService;
        this._router = _router;
    }
    LoginAuthGuard.prototype.canActivate = function (route) {
        var _this = this;
        var subject = new Rx_1.Subject();
        this._appService.setRouter(this._router);
        if (Object.keys(route.queryParams).length > 0) {
            this._authService.requestedPageNavigationExtras.queryParams = route.queryParams;
        }
        if (!this._authService.initState && !auth_service_1.AuthService.loginStatus) {
            this._appService.setGlobalLoader(true);
            this._authService.initRest().toPromise().then(function (res) {
                _this._authService.postAuthCheck(res.data);
                subject.next(false);
                app_service_1.AppService.router.navigate([app_service_1.AppService.defaultPage]);
            }, function () {
                _this._authService.handleFailedInitRest(subject, route.url[0].path);
            });
            return subject.asObservable().take(1);
        }
        else {
            //this._appService.postLoginLoad = true;
            return !auth_service_1.AuthService.loginStatus;
        }
    };
    LoginAuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, app_service_1.AppService, utility_service_1.UtilityService, router_1.Router])
    ], LoginAuthGuard);
    return LoginAuthGuard;
}());
exports.LoginAuthGuard = LoginAuthGuard;
//# sourceMappingURL=login.guard.js.map
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
var router_1 = require('@angular/router');
var auth_service_1 = require('./shared/services/auth.service');
var app_service_1 = require('./shared/services/app.service');
var utility_service_1 = require("./shared/services/utility.service");
var Rx_1 = require('rxjs/Rx');
var AuthGuard = (function () {
    function AuthGuard(_authService, _appService, _utilityService, _router) {
        this._authService = _authService;
        this._appService = _appService;
        this._utilityService = _utilityService;
        this._router = _router;
    }
    AuthGuard.prototype.canLoad = function (route) {
        var _this = this;
        this._appService.setRouter(this._router);
        var subject = new Rx_1.Subject();
        var location = this._utilityService.trimCharacter(route.path, '/', true, true);
        if (!auth_service_1.AuthService.loginStatus && !this._authService.initState) {
            if (route.canActivateChild) {
                location = this._utilityService.trimCharacter(window.location.hash.slice(1), '/', true, true);
                location = location != 'login' ? location : auth_service_1.AuthService.redirectUrl;
            }
            auth_service_1.AuthService.redirectUrl = location;
            this._appService.setGlobalLoader(true);
            this._authService.initRest().toPromise().then(function (res) {
                _this._authService.postAuthCheck(res.data);
                var tempRoute = location;
                if (tempRoute == 'login' || tempRoute == 'registration' || tempRoute == 'password_change' || tempRoute == 'confirm_registration') {
                    subject.next(false);
                    app_service_1.AppService.router.navigate([app_service_1.AppService.defaultPage]);
                }
                else {
                    var permissionTemp = _this._authService.checkPermission(auth_service_1.AuthService.redirectUrl);
                    if (permissionTemp) {
                        subject.next(true);
                    }
                    else {
                        subject.next(false);
                        app_service_1.AppService.router.navigate([app_service_1.AppService.defaultPage]);
                    }
                }
            }, function () {
                _this._authService.handleFailedInitRest(subject, location);
            });
            return subject.asObservable().take(1);
        }
        else {
            this._appService.postLoginLoad = true;
            this._authService.requestedPageNavigationExtras.queryParams = {};
            auth_service_1.AuthService.redirectUrl = location;
            var permissionTemp = this._authService.checkPermission(auth_service_1.AuthService.redirectUrl);
            this._appService.currentPageRoute = route.path;
            this._appService.postLoginLoad = permissionTemp;
            return permissionTemp;
        }
    };
    AuthGuard.prototype.canActivateChild = function (route) {
        // if (Object.keys(route.params).length > 0) {
        //   this._authService.requestedPageNavigationExtras.queryParams = route.params;
        // }
        var tempUrlSliced = '';
        var tempUrl = '';
        for (var _i = 0, _a = route.parent.url; _i < _a.length; _i++) {
            var segment = _a[_i];
            tempUrl += '/' + segment.path;
        }
        tempUrl += '/';
        for (var _b = 0, _c = route.url; _b < _c.length; _b++) {
            var segment = _c[_b];
            tempUrl += segment.path;
        }
        tempUrlSliced = this._utilityService.trimCharacter(tempUrl, '/', true, true);
        auth_service_1.AuthService.redirectUrl = tempUrlSliced;
        var permissionTemp = this._authService.checkPermission(tempUrlSliced);
        return permissionTemp;
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, app_service_1.AppService, utility_service_1.UtilityService, router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map
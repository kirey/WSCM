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
var Rx_1 = require('rxjs/Rx');
var auth_service_1 = require('../shared/services/auth.service');
var app_service_1 = require('../shared/services/app.service');
var utility_service_1 = require("./../shared/services/utility.service");
var HomeAuthGuard = (function () {
    function HomeAuthGuard(_authService, _appService, _utilityService, _router) {
        this._authService = _authService;
        this._appService = _appService;
        this._utilityService = _utilityService;
        this._router = _router;
    }
    HomeAuthGuard.prototype.canLoad = function (route) {
        var _this = this;
        // this._authService.requestedPageNavigationExtras.queryParams = {};
        this._appService.setRouter(this._router);
        var subject = new Rx_1.Subject();
        var location = this._utilityService.trimCharacter(window.location.hash.slice(1), '/', true, true);
        if (!this._authService.initState || !auth_service_1.AuthService.loginStatus) {
            this._appService.setGlobalLoader(true);
            this._authService.initRest().toPromise().then(function (res) {
                _this._authService.postAuthCheck(res.data);
                auth_service_1.AuthService.redirectUrl = 'home';
                subject.next(true);
            }, function () {
                _this._authService.handleFailedInitRest(subject, 'home');
            });
            return subject.asObservable().take(1);
        }
        this._appService.postLoginLoad = true;
        if (route.path != location) {
            this._appService.postLoginLoad = false;
        }
        return true;
    };
    HomeAuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, app_service_1.AppService, utility_service_1.UtilityService, router_1.Router])
    ], HomeAuthGuard);
    return HomeAuthGuard;
}());
exports.HomeAuthGuard = HomeAuthGuard;
//# sourceMappingURL=home.guard.js.map
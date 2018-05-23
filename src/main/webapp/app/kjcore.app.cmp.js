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
var app_service_1 = require('./kjcore/shared/services/app.service');
var auth_service_1 = require('./kjcore/shared/services/auth.service');
var KJCoreAppCmp = (function () {
    /*--------- Constructor --------*/
    function KJCoreAppCmp(_appService, _router, _authService, viewContainerRef, _renderer) {
        this._appService = _appService;
        this._router = _router;
        this._authService = _authService;
        this.viewContainerRef = viewContainerRef;
        this._renderer = _renderer;
    }
    /*--------- NG On Init ---------*/
    KJCoreAppCmp.prototype.ngOnInit = function () {
        // Variables initialization
        // Initial methods
        this._appService.setRouter(this._router);
        this._appService.setRenderer(this._renderer);
        this._appService.setBrowserAgent();
    };
    KJCoreAppCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app',
            templateUrl: 'kjcore.app.cmp.html',
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, router_1.Router, auth_service_1.AuthService, core_1.ViewContainerRef, core_1.Renderer])
    ], KJCoreAppCmp);
    return KJCoreAppCmp;
}());
exports.KJCoreAppCmp = KJCoreAppCmp;
//# sourceMappingURL=kjcore.app.cmp.js.map
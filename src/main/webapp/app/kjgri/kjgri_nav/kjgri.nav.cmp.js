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
var ng2_translate_1 = require('ng2-translate');
var kjgri_nav_service_1 = require('./kjgri.nav.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var auth_service_1 = require('../../kjcore/shared/services/auth.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var KJGriNavCmp = (function () {
    /*--------- Constructor --------*/
    function KJGriNavCmp(_translateService, _navService, _appService, _utilityService, _authService, _router) {
        this._translateService = _translateService;
        this._navService = _navService;
        this._appService = _appService;
        this._utilityService = _utilityService;
        this._authService = _authService;
        this._router = _router;
    }
    /*--------- App logic --------*/
    /**
     * Change language on flag click
     * @author Mario Petrovic
     */
    KJGriNavCmp.prototype.changeLanguage = function (lang) {
        this._appService.changeLang(lang);
    };
    /**
     * REST - Login authentication with token returned as data
     * @author Mario Petrovic
     */
    KJGriNavCmp.prototype.logout = function () {
        var _this = this;
        this.logoutLoading = true;
        this._authService.logout().toPromise().then(function (res) {
            auth_service_1.AuthService.clearAuth();
            _this.logoutLoading = false;
            auth_service_1.AuthService.redirectUrl = '';
        }, function (error) {
            _this.logoutLoading = false;
        });
    };
    /**
     * Check if logged in user can see given route
     * @author Nikola Gavric
     */
    KJGriNavCmp.prototype.checkRoute = function (route) {
        return this._authService.userRoutes[route];
    };
    /**
     * Check if given array has a child
     *
     * @param arr MenuItem
     * @author Nikola Gavric
     */
    KJGriNavCmp.prototype.hasChildRoute = function (arr) {
        var _this = this;
        var found;
        arr.dropdown.some(function (obj) {
            return (found = _this._appService.currentPageRoute.includes(obj.route));
        });
        return found;
    };
    /*--------- Utility ---------*/
    /**
     * Match default language for click prevention
     * @author Nikola Gavric
     */
    KJGriNavCmp.prototype.matchDefaultLanguage = function (lang) {
        return lang == this._appService.defaultLanguage;
    };
    /*--------- NG On Init ---------*/
    KJGriNavCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.logoutLoading = false;
        this._translateService.use(this._appService.getStoredLanguage());
        this._appService.navLanguageChanged.subscribe(function (lang) {
            _this._appService.changeLangTranslate(_this._translateService, lang, true);
        });
    };
    KJGriNavCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(null, true);
    };
    KJGriNavCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navigation-menu',
            templateUrl: 'kjgri.nav.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, kjgri_nav_service_1.KJGriNavService, app_service_1.AppService, utility_service_1.UtilityService, auth_service_1.AuthService, router_1.Router])
    ], KJGriNavCmp);
    return KJGriNavCmp;
}());
exports.KJGriNavCmp = KJGriNavCmp;
//# sourceMappingURL=kjgri.nav.cmp.js.map
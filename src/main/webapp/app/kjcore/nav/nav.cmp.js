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
var ng2_translate_1 = require('ng2-translate');
var nav_service_1 = require('./nav.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var auth_service_1 = require('../../kjcore/shared/services/auth.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var NavCmp = (function () {
    /*--------- Constructor --------*/
    function NavCmp(_translateService, _navService, _appService, _utilityService, _authService) {
        this._translateService = _translateService;
        this._navService = _navService;
        this._appService = _appService;
        this._utilityService = _utilityService;
        this._authService = _authService;
    }
    /*--------- App logic --------*/
    /**
     * Change language on flag click
     * @author Mario Petrovic
     */
    NavCmp.prototype.changeLanguage = function (lang) {
        this._appService.changeLang(lang);
    };
    /**
     * REST - Login authentication with token returned as data
     * @author Mario Petrovic
     */
    NavCmp.prototype.logout = function () {
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
     * @author Mario Petrovic
     */
    NavCmp.prototype.checkRoute = function (route) {
        return this._authService.userRoutes[route];
    };
    /*--------- Utility ---------*/
    /**
     * Match default language for click prevention
     * @author Kirey
     */
    NavCmp.prototype.matchDefaultLanguage = function (lang) {
        return lang == this._appService.defaultLanguage;
    };
    /*--------- NG On Init ---------*/
    NavCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.logoutLoading = false;
        this._translateService.use(this._appService.getStoredLanguage());
        this._appService.navLanguageChanged.subscribe(function (lang) {
            _this._appService.changeLangTranslate(_this._translateService, lang, true);
        });
    };
    NavCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(null, true);
    };
    NavCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navigation-menu',
            templateUrl: 'nav.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, nav_service_1.NavService, app_service_1.AppService, utility_service_1.UtilityService, auth_service_1.AuthService])
    ], NavCmp);
    return NavCmp;
}());
exports.NavCmp = NavCmp;
//# sourceMappingURL=nav.cmp.js.map
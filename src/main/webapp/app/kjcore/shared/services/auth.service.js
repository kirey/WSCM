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
var app_service_1 = require('./app.service');
var utility_service_1 = require("./utility.service");
var constants_1 = require("./../../constants");
var AuthService = (function () {
    function AuthService(_appService, _http, _utilityService) {
        this._appService = _appService;
        this._http = _http;
        this._utilityService = _utilityService;
        AuthService.redirectUrl = '';
        this.baseUrl = 'rest/users';
        this.initState = false;
        AuthService.loginStatus = false;
        this.requestedPageNavigationExtras = {};
    }
    /**
     * Get login status
     * @author Kirey
     */
    AuthService.prototype.getLoginStatus = function () {
        return AuthService.loginStatus;
    };
    /**
     * Check if user is authenticated before app loads
     * @author Kirey
     */
    AuthService.prototype.initRest = function () {
        return this._http.get(this.baseUrl + '/userDetails')
            .map(function (res) { return res.json(); });
    };
    /**
     * Handle unsuccessful initial authentication check
     * @author Kirey
     */
    AuthService.prototype.handleFailedInitRest = function (subject, route) {
        this.initState = true;
        this._appService.setGlobalLoader(false);
        var tempPage = route == 'registration' || route == 'password_change' || route == 'confirm_registration' || route == 'activate_user' ? route : 'login';
        subject.next(false);
        app_service_1.AppService.router.navigate([tempPage], this.requestedPageNavigationExtras);
    };
    /**
     * After successful initial authentication check
     * @author Kirey
     */
    AuthService.prototype.postAuthCheck = function (userInfo) {
        this._appService.setGlobalLoader(false);
        //Building and setting app available languages
        this._appService.buildAvailableLanguages(userInfo.languages);
        this._appService.companyCss = userInfo.companyCssPrefix + '/' + userInfo.companyId;
        this._appService.userProfile.companyCss = userInfo.companyCssPrefix + '/' + userInfo.companyId;
        this._appService.userProfile.userName = userInfo.username;
        this._appService.userProfile.companyLogo = constants_1.Constants.LOGO_URL_PREFIX + '/' + userInfo.companyId;
        this._appService.setStoredLanguage(userInfo.defaultLanguage);
        this.userRoutes = this._appService.convertRoutesToObjects(userInfo);
        this._appService.userProfile.roles = this._appService.convertRolesToObject(userInfo.roles);
        this._appService.userProfile.email = userInfo.email;
        this._appService.userProfile.companyId = userInfo.companyId;
        this._appService.setCompanyCSSInit();
        AuthService.loginStatus = true;
        this.initState = true;
    };
    /**
     * REST - Login authentication with token returned as data
     * @author Kirey
     */
    AuthService.prototype.login = function (loginData, code, hashCode) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.baseUrl + '/noAuth/authenticate?pageId=registration&code=' + code + '&hashCode=' + hashCode, JSON.stringify(loginData), options)
            .map(function (res) { return res.json(); })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * REST - Logout from app
     * @author Kirey
     */
    AuthService.prototype.logout = function () {
        var _this = this;
        return this._http.post(this.baseUrl + '/logout', '')
            .map(function (res) { return res.json(); })
            .map(function () {
            _this.userRoutes = {};
            _this._appService.initModuleLoaded = false;
        })
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Clear auth details from app
     * @author Kirey
     */
    AuthService.clearAuth = function () {
        localStorage.removeItem(constants_1.Constants.TOKEN_STORED_NAME);
        AuthService.redirectUrl = "";
        AuthService.loginStatus = false;
        app_service_1.AppService.router.navigate(['login']);
    };
    /**
     * REST - Check permission for current route and user
     * @author Kirey
     */
    AuthService.prototype.checkPermission = function (route) {
        route = this._utilityService.trimPathParameter(route);
        if (this.userRoutes) {
            return !!this.userRoutes[route];
        }
        return false;
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [app_service_1.AppService, http_1.Http, utility_service_1.UtilityService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
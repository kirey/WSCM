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
var forms_1 = require('@angular/forms');
var login_service_1 = require('./login.service');
var app_service_1 = require('./../../kjcore/shared/services/app.service');
var auth_service_1 = require('./../../kjcore/shared/services/auth.service');
var utility_service_1 = require('./../../kjcore/shared/services/utility.service');
var models_1 = require('./models');
var ng2_translate_1 = require('ng2-translate');
var constants_1 = require("../constants");
/**
 * Component for Login page
 * @author Mario Petrovic
 */
var LoginCmp = (function () {
    /*--------- Constructor --------*/
    function LoginCmp(_loginService, _utilityService, _appService, _formBuilder, _authService, _translateService) {
        this._loginService = _loginService;
        this._utilityService = _utilityService;
        this._appService = _appService;
        this._formBuilder = _formBuilder;
        this._authService = _authService;
        this._translateService = _translateService;
    }
    /*--------- App logic --------*/
    /**
     * Get captcha for page
     * @author Stefan Svrkota
     */
    LoginCmp.prototype.getCaptcha = function () {
        var _this = this;
        this._utilityService.getCaptchaRest().toPromise().then(function (res) {
            _this.loginForm.addControl('captcha', new forms_1.FormControl({ value: null, disabled: _this.loginSuccessful }, [forms_1.Validators.required]));
            _this.captchaError = null;
            _this.captchaImage = res.data.imageBase64;
            _this.captchaHashed = res.data.hashedCode;
        }, function (error) {
            auth_service_1.AuthService.clearAuth();
            _this.captchaError = error.message;
            _this.captchaImage = null;
            _this.captchaHashed = null;
        });
    };
    /**
     * REST - Login authentication with token returned as data
     * @author Mario Petrovic
     */
    LoginCmp.prototype.login = function (loginData) {
        var _this = this;
        this.formClicked = true;
        if (loginData.username && loginData.password) {
            this.submitted = false;
            this.loginSuccessful = false;
            var submitData = this._utilityService.copy(this.loginForm.value);
            var captcha = submitData.captcha;
            delete submitData['captcha'];
            this._authService.login(submitData, captcha, this.captchaHashed).toPromise().then(function (res) {
                _this.token = res.data.token;
                _this._utilityService.setToken(_this.token);
                _this.getUserRest();
            }, function (error) {
                auth_service_1.AuthService.clearAuth();
                _this.loginSuccessful = false;
                _this.submitted = true;
            });
        }
    };
    /**
     * REST - Get user information based on token retrived previously
     * @author Mario Petrovic
     */
    LoginCmp.prototype.getUserRest = function () {
        var _this = this;
        this._authService.initRest().toPromise().then(function (res) {
            //Building and setting app available languages
            _this._appService.buildAvailableLanguages(res.data.languages);
            var tempIterator = 0;
            // this.token = this._utilityService.getToken();
            // this._utilityService.removeToken();
            // this.companiesMap = this._utilityService.transformMapToArray(res.data.companies); // brise
            // this.selectedCompany = res.data.activeCompanyId;
            _this._authService.userRoutes = _this._appService.convertRoutesToObjects(res.data);
            _this._appService.userProfile.roles = _this._appService.convertRolesToObject(res.data.roles);
            _this._appService.userProfile.companyLogo = constants_1.Constants.LOGO_URL_PREFIX + '/' + res.data.companyId;
            _this._appService.userProfile.companyCss = res.data.companyCssPrefix + '/' + res.data.companyId;
            _this._appService.userProfile.accountExpiryDate = res.data.accountExpiryDate ? new Date(res.data.accountExpiryDate) : null;
            _this._appService.userProfile.userName = res.data.username;
            _this._appService.userProfile.email = res.data.email;
            _this._appService.userProfile.accountType = res.data.accountType;
            _this._appService.userProfile.companyId = res.data.companyId;
            _this._appService.setStoredLanguage(res.data.defaultLanguage);
            _this.submitted = true;
            _this.loginSuccessful = true;
            _this.companyCssPrefix = res.data.companyCssPrefix;
            // if (this.companiesMap.length < 2) {
            // this.selectCompany(res.data.activeCompanyId, res.data.companyCssPrefix);
            // }
            _this._appService.setCompanyCSS(res.data.companyCssPrefix + '/' + res.data.companyId);
            _this._appService.postLoginLoad = true;
            auth_service_1.AuthService.loginStatus = true;
            app_service_1.AppService.router.navigate([auth_service_1.AuthService.redirectUrl || app_service_1.AppService.defaultPage]);
        }, function (error) {
            auth_service_1.AuthService.clearAuth();
            _this.submitted = true;
            _this.loginSuccessful = false;
        });
    };
    /**
     * Loads generic parameters
     * @author Mario Petrovic
     */
    LoginCmp.prototype.getFrontendGenerics = function () {
        var _this = this;
        this._appService.getFrontendGenericsRest().toPromise().then(function (res) {
            _this._appService.frontendGenerics = res.data;
            if (res.data.captchaOnLogin || !res.data.hasOwnProperty("captchaOnLogin")) {
                _this.getCaptcha();
            }
        });
    };
    /*--------- NgOnInit --------*/
    LoginCmp.prototype.ngOnInit = function () {
        this._appService.pageLoaded('', this, true);
        // Variable initialization
        this.token = '';
        this.loginSuccessful = false;
        this.formClicked = false;
        this.companyCssPrefix = '';
        this._appService.postLoginLoad = false;
        this._appService.initModuleLoaded = false;
        this.loginForm = this._formBuilder.group({
            username: [{ value: null, disabled: this.loginSuccessful }, [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            password: [{ value: null, disabled: this.loginSuccessful }, [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
        });
        // this.companiesMap = [];
        // this.selectedCompany = '';
        this.loginData = new models_1.UserLogin('', '', '');
        // Initial methods
        this.getFrontendGenerics();
    };
    LoginCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'login.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, utility_service_1.UtilityService, app_service_1.AppService, forms_1.FormBuilder, auth_service_1.AuthService, ng2_translate_1.TranslateService])
    ], LoginCmp);
    return LoginCmp;
}());
exports.LoginCmp = LoginCmp;
//# sourceMappingURL=login.cmp.js.map
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
var userPanel_service_1 = require('./userPanel.service');
var utility_service_1 = require('../shared/services/utility.service');
var app_service_1 = require('../shared/services/app.service');
var models_1 = require('../shared/models');
var models_2 = require('./models');
/**
 * Component for user panel
 * @author Mario Petrovic
 */
var UserPanelCmp = (function () {
    /*--------- Constructor ---------*/
    function UserPanelCmp(_utilityService, _userPanelService, _appService, _translateService) {
        this._utilityService = _utilityService;
        this._userPanelService = _userPanelService;
        this._appService = _appService;
        this._translateService = _translateService;
    }
    /*--------- App logic ---------*/
    /**
     * Get captcha for page
     * @author Stefan Svrkota
     */
    UserPanelCmp.prototype.getCaptcha = function () {
        var _this = this;
        this.subscriptions['captcha'] = this._utilityService.getCaptchaRest().subscribe(function (res) {
            if (res.data) {
                _this.captchaImage = res.data.imageBase64;
                _this.captchaHashed = res.data.hashedCode;
            }
        }, function (error) {
            _this.captchaError = error.message;
        });
    };
    /**
     * Get captcha for page
     * @author Stefan Svrkota
     */
    UserPanelCmp.prototype.getCaptcha2 = function () {
        var _this = this;
        this.subscriptions['captcha2'] = this._utilityService.getCaptchaRest().subscribe(function (res) {
            if (res.data) {
                _this.captchaImage2 = res.data.imageBase64;
                _this.captchaHashed2 = res.data.hashedCode;
            }
        }, function (error) {
            _this.captchaError2 = error.message;
        });
    };
    /**
     * Change password for logged user
     * @author Mario Petrovic
     */
    UserPanelCmp.prototype.changePassword = function (userPassword, form) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        var tempUserPassword = this._utilityService.copy(userPassword);
        delete tempUserPassword.confirmPassword;
        this.subscriptions['chagePassword'] = this._userPanelService
            .changePassword(tempUserPassword, this.captcha, this.captchaHashed)._finally(function () {
            _this.captcha = null;
            _this.getCaptcha();
        }).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            form.reset();
            form._submitted = false;
            _this.userPassword = new models_2.UserPassword();
        }, function (err) {
            _this.registrationFormErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
    * Update user data
    * @author Mario Petrovic
    */
    UserPanelCmp.prototype.changeUserData = function (userData) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        var tempLang = this._appService.defaultLanguage;
        this.subscriptions['changeUserData'] = this._userPanelService.
            updateUserData(userData, this.captcha2, this.captchaHashed2)._finally(function () {
            _this.captcha2 = null;
            _this.getCaptcha2();
        }).subscribe(function (res) {
            if (tempLang != userData.defaultLanguage) {
                _this._appService.changeLang(userData.defaultLanguage);
            }
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            _this.userData.password = '';
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Get all languages
     * @author Mario Petrovic
     */
    UserPanelCmp.prototype.getAllLanguages = function () {
        var _this = this;
        this.subscriptions['getAllLanguages'] = this._userPanelService.getAvailableLanguages().subscribe(function (res) {
            for (var i = 0; i < Object.keys(res.data).length; i++) {
                _this.languages.push({
                    languageCode: Object.keys(res.data)[i],
                    languageText: res.data[Object.keys(res.data)[i]]
                });
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    UserPanelCmp.prototype.validateEmail = function (email) {
        if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)) {
            this.emailRegex = false;
        }
        else {
            this.emailRegex = true;
        }
    };
    /*--------- Utility ---------*/
    /**
     * Toggle visibility of password for change data confirmation
     * @author Mario Petrovic
     */
    UserPanelCmp.prototype.changeDataTogglePasswordVisibility = function () {
        this.changeDataPasswordType = this.changeDataPasswordType == 'text' ? 'password' : 'text';
    };
    /**
     * Toggle visibility of password for password change
     * @author Mario Petrovic
     */
    UserPanelCmp.prototype.changePasswordTogglePasswordVisibility = function () {
        this.changePasswordType = this.changePasswordType == 'text' ? 'password' : 'text';
    };
    /**
     * Do a catpcha call on
     * tab swap, not on page load
     * @param event
     */
    UserPanelCmp.prototype.onPasswordTab = function (event) {
        if (!this.tabs.isPasswordTab) {
            this.getCaptcha2();
        }
        for (var _i = 0, _a = Object.keys(this.tabs); _i < _a.length; _i++) {
            var key = _a[_i];
            this.tabs[key] = false;
        }
        this.tabs.isPasswordTab = true;
    };
    /**
     * Do a catpcha call on
     * tab swap, not on page load
     * @param event
     */
    UserPanelCmp.prototype.onUserDataTab = function (event) {
        if (!this.tabs.isUserDataTab) {
            this.getCaptcha2();
        }
        for (var _i = 0, _a = Object.keys(this.tabs); _i < _a.length; _i++) {
            var key = _a[_i];
            this.tabs[key] = false;
        }
        this.tabs.isUserDataTab = true;
    };
    /*--------- NG On Init ---------*/
    UserPanelCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        // Variables initialization
        this.languages = [];
        this.userPassword = new models_2.UserPassword();
        this.captcha = null;
        this.tabs = {
            isPasswordTab: true,
            isUserDataTab: false
        };
        this.subscriptions = {};
        this.componentAlert = new models_1.Alert(null, true);
        this.subscriptions = {};
        this.changeDataPasswordType = 'password';
        this.changePasswordType = 'password';
        this.userData = new models_2.UserData(this._appService.userProfile.email, this._appService.getStoredLanguage());
        // Initial methods
        this.getAllLanguages();
        this.getCaptcha();
        this._appService.languageChangeForComponent(this);
    };
    /*--------- NG On Destroy ---------*/
    UserPanelCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    UserPanelCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'userPanel.cmp.html',
            styleUrls: ['userPanel.cmp.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, userPanel_service_1.UserPanelService, app_service_1.AppService, ng2_translate_1.TranslateService])
    ], UserPanelCmp);
    return UserPanelCmp;
}());
exports.UserPanelCmp = UserPanelCmp;
//# sourceMappingURL=userPanel.cmp.js.map
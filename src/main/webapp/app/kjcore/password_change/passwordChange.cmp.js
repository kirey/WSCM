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
var forms_1 = require('@angular/forms');
var passwordChange_service_1 = require('./passwordChange.service');
var app_service_1 = require('../shared/services/app.service');
var utility_service_1 = require('../shared/services/utility.service');
var models_1 = require('./models');
var models_2 = require('../shared/models');
var ng2_translate_1 = require('ng2-translate');
/**
 * Component for Password change page
 * @author Mario Petrovic
 */
var PasswordChangeCmp = (function () {
    /*--------- Constructor --------*/
    function PasswordChangeCmp(_passwordChangeService, _utilityService, _appService, _activatedRoute, _translateService) {
        this._passwordChangeService = _passwordChangeService;
        this._utilityService = _utilityService;
        this._appService = _appService;
        this._activatedRoute = _activatedRoute;
        this._translateService = _translateService;
    }
    /*--------- App logic --------*/
    /**
     * Retrieve values for user and populate form with data
     * @author Mario Petrovic
     */
    PasswordChangeCmp.prototype.retrieveUserDetails = function (mailHash) {
        var _this = this;
        this.subscriptions['retrieveUserDetails'] = this._passwordChangeService.getUserDetailsRest(mailHash).subscribe(function (res) {
            _this.requestState = true;
            _this.enterEmailForm.setValue({
                email: res.data.email,
            });
            _this._utilityService.setAlert(_this.componentAlert);
            _this._utilityService.getCaptchaRest().subscribe(function (res) {
                _this.captcha = res.data;
            });
        }, function (err) {
            _this.requestState = false;
            _this._utilityService.setAlert(_this.componentAlert, err.errors[0].errorCode, err.statusCode);
        });
    };
    /**
     * Send REST request for forgotten password to initate the steps for password change
     * @author Mario Petrovic
     */
    PasswordChangeCmp.prototype.forgotPasswordRequest = function (email) {
        var _this = this;
        this.subscriptions['forgotPasswordRequest'] = this._passwordChangeService.forgotPasswordRequestRest(email).subscribe(function (res) {
            _this.emailErrors = null;
            _this.requestState = true;
            _this._utilityService.setAlert(_this.componentAlert);
            _this._utilityService.getCaptchaRest().subscribe(function (res) {
                _this.captcha = res.data;
            });
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.emailErrors = err;
        });
    };
    /**
     * Submit password change form
     * @author Mario Petrovic
     */
    PasswordChangeCmp.prototype.changePasswordSubmit = function (form) {
        var _this = this;
        clearTimeout(this.redirectTimeout);
        var passwordChange = new models_1.PasswordChange(form.value.password, form.value.mailHashSecret, form.value.captcha, this.captcha.hashedCode);
        this.subscriptions['changePasswordSubmit'] = this._passwordChangeService.changePasswordSubmitRest(passwordChange).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, 'Password successfully changed.<br/> You will be redirected to Login page.', res.statusCode);
            _this.redirectTimeout = setTimeout(function () {
                app_service_1.AppService.router.navigate(['login']);
            }, 4000);
            _this.passwordChanged = true;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.passwordChanged = false;
            _this.formErrors = err;
            _this.subscriptions['getCaptcha'] = _this._utilityService.getCaptchaRest().subscribe(function (res) {
                _this.captcha = res.data;
                form.setValue({
                    captcha: '',
                    password: form.value.password,
                    confirmPassword: form.value.confirmPassword,
                    mailHashSecret: form.value.mailHashSecret
                });
            });
        });
    };
    /**
     * Toggle visibility of password input fields
     * @author Mario Petrovic
     */
    PasswordChangeCmp.prototype.togglePasswordVisibility = function () {
        this.passwordType = this.passwordType == 'text' ? 'password' : 'text';
    };
    /**
     * Retrieve captcha for form validation
     * @author Mario Petrovic
     */
    PasswordChangeCmp.prototype.getCaptcha = function () {
        var _this = this;
        this.subscriptions['getCaptcha'] = this._utilityService.getCaptchaRest().subscribe(function (res) {
            _this.captcha = res.data;
        });
    };
    /*--------- NG On Init ---------*/
    PasswordChangeCmp.prototype.ngOnInit = function () {
        var _this = this;
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this, true);
        // Variable initialization
        this.componentAlert = new models_2.Alert(null, true);
        this.requestState = false;
        this.subscriptions = {};
        this.captcha = new models_2.Captcha();
        this.formErrors = new models_2.RestResponse();
        this.emailErrors = new models_2.RestResponse();
        this.passwordType = 'password';
        this.passwordChanged = false;
        // Costruct methods
        this._activatedRoute.queryParams.subscribe(function (params) {
            if (params['mailHash']) {
                _this.retrieveUserDetails(params['mailHash']);
            }
            else {
                _this.requestState = false;
            }
        });
    };
    /*--------- NG On Destroy ---------*/
    PasswordChangeCmp.prototype.ngOnDestroy = function () {
        clearTimeout(this.redirectTimeout);
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('enterEmailForm'), 
        __metadata('design:type', forms_1.NgForm)
    ], PasswordChangeCmp.prototype, "enterEmailForm", void 0);
    PasswordChangeCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'passwordChange.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [passwordChange_service_1.PasswordChangeService, utility_service_1.UtilityService, app_service_1.AppService, router_1.ActivatedRoute, ng2_translate_1.TranslateService])
    ], PasswordChangeCmp);
    return PasswordChangeCmp;
}());
exports.PasswordChangeCmp = PasswordChangeCmp;
//# sourceMappingURL=passwordChange.cmp.js.map
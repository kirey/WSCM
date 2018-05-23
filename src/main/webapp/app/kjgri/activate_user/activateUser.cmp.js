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
var activateUser_service_1 = require('./activateUser.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var models_1 = require('./models');
var models_2 = require('../../kjcore/shared/models');
var ng2_translate_1 = require('ng2-translate');
/**
 * Component for Password change page
 * @author Mario Petrovic
 */
var ActivateUserCmp = (function () {
    /*--------- Constructor --------*/
    function ActivateUserCmp(_activateUserService, _utilityService, _appService, _activatedRoute, _translateService) {
        this._activateUserService = _activateUserService;
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
    ActivateUserCmp.prototype.retrieveUserDetails = function (mailHash) {
        var _this = this;
        this.subscriptions['retrieveUserDetails'] = this._activateUserService.getUserDetailsRest(mailHash).subscribe(function (res) {
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
            _this._appService.getRouter().navigate(['activate_user']);
            _this._utilityService.setAlert(_this.componentAlert, err.errors[0].errorCode, err.statusCode);
        });
    };
    /**
     * Send REST request for reactivating procedure
     * @author Mario Petrovic
     */
    ActivateUserCmp.prototype.activateUserRequest = function (email) {
        var _this = this;
        this.subscriptions['activateUserRequest'] = this._activateUserService.activateUserRequestRest(email).subscribe(function (res) {
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
     * Submit activation form
     * @author Mario Petrovic
     */
    ActivateUserCmp.prototype.activateUserSubmit = function (form) {
        var _this = this;
        clearTimeout(this.redirectTimeout);
        var activateUser = new models_1.ActivateUser(form.value.password, form.value.mailHashSecret, form.value.captcha, this.captcha.hashedCode);
        this.subscriptions['activateUserSubmit'] = this._activateUserService.activateUserSubmitRest(activateUser).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, 'User successuflly activated.<br/> You will be redirected to Login page.', res.statusCode);
            _this.redirectTimeout = setTimeout(function () {
                app_service_1.AppService.router.navigate(['login']);
            }, 4000);
            _this.userActivated = true;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
            _this.userActivated = false;
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
    ActivateUserCmp.prototype.togglePasswordVisibility = function () {
        this.passwordType = this.passwordType == 'text' ? 'password' : 'text';
    };
    /*--------- NG On Init ---------*/
    ActivateUserCmp.prototype.ngOnInit = function () {
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
        this.userActivated = false;
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
    /**
     * Retrieve captcha for form validation
     * @author Mario Petrovic
     */
    ActivateUserCmp.prototype.getCaptcha = function () {
        var _this = this;
        this.subscriptions['getCaptcha'] = this._utilityService.getCaptchaRest().subscribe(function (res) {
            _this.captcha = res.data;
        });
    };
    /*--------- NG On Destroy ---------*/
    ActivateUserCmp.prototype.ngOnDestroy = function () {
        clearTimeout(this.redirectTimeout);
        this._appService.refreshEmitters(this.subscriptions);
    };
    __decorate([
        core_1.ViewChild('enterEmailForm'), 
        __metadata('design:type', forms_1.NgForm)
    ], ActivateUserCmp.prototype, "enterEmailForm", void 0);
    ActivateUserCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'activateUser.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [activateUser_service_1.ActivateUserService, utility_service_1.UtilityService, app_service_1.AppService, router_1.ActivatedRoute, ng2_translate_1.TranslateService])
    ], ActivateUserCmp);
    return ActivateUserCmp;
}());
exports.ActivateUserCmp = ActivateUserCmp;
//# sourceMappingURL=activateUser.cmp.js.map
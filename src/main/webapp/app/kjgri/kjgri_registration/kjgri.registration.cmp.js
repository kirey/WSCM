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
var ng2_translate_1 = require('ng2-translate');
var validation_service_1 = require('../../kjcore/shared/services/validation.service');
var kjgri_registration_service_1 = require('./kjgri.registration.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var app_service_1 = require('../../kjcore/shared/services/app.service');
var models_1 = require('../../kjcore/shared/models');
/**
 * Component for Registration page
 * @author Stefan Svrkota
 */
var RegistrationCmp = (function () {
    /*--------- Constructor ---------*/
    function RegistrationCmp(formBuilder, _utilityService, _registrationService, _appService, _translateService) {
        this.formBuilder = formBuilder;
        this._utilityService = _utilityService;
        this._registrationService = _registrationService;
        this._appService = _appService;
        this._translateService = _translateService;
    }
    /*--------- App logic ---------*/
    /**
     * Get languages
     * @author Stefan Svrkota
     */
    RegistrationCmp.prototype.getLanguages = function () {
        var _this = this;
        this._registrationService.getLanguagesRest().subscribe(function (res) {
            for (var i = 0; i < Object.keys(res.data).length; i++) {
                _this.languages.push({
                    languageCode: Object.keys(res.data)[i],
                    languageText: res.data[Object.keys(res.data)[i]]
                });
            }
        }, function (error) {
        });
    };
    /**
     * Get captcha for page
     * @author Stefan Svrkota
     */
    RegistrationCmp.prototype.getCaptcha = function () {
        var _this = this;
        this._utilityService.getCaptchaRest().subscribe(function (res) {
            _this.captchaImage = res.data.imageBase64;
            _this.captchaHashed = res.data.hashedCode;
        }, function (error) {
            _this.captchaError = error.message;
        });
    };
    /**
     * Register user
     * @author Stefan Svrkota
     */
    RegistrationCmp.prototype.submit = function (form) {
        var _this = this;
        var submitData = this._utilityService.copy(form.value);
        var captcha = submitData.captcha;
        delete submitData['captcha'];
        delete submitData['confirmPassword'];
        this._registrationService.registerRest(submitData, captcha, this.captchaHashed).subscribe(function (res) {
            _this.registered = true;
            _this._utilityService.setAlert(_this.registrationAlert, res.message + "<p><a class='pointer-cursor' href='#/login'>Login</a></p>", res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.registrationAlert, err.message, err.statusCode, err.errors);
            _this.registrationFormErrors = err;
            _this.getCaptcha();
        });
    };
    /**
     * Toggle visibility of passwords
     * @author Stefan Svrkota
     */
    RegistrationCmp.prototype.togglePassword = function () {
        this.showPassword = !this.showPassword;
        if (this.showPassword) {
            this.password = "text";
        }
        else {
            this.password = "password";
        }
    };
    /**
     * Validating password and confirm password
     * @author Stefan Svrkota
     */
    RegistrationCmp.prototype.checkPasswords = function (password, confirmPassword) {
        if (password.length > 0 && confirmPassword.length > 0 && password != "" && confirmPassword != "") {
            if (password != confirmPassword) {
                this.passwordMismatch = true;
            }
            else {
                this.passwordMismatch = false;
            }
        }
        else {
            this.passwordMismatch = false;
        }
    };
    /*--------- NG On Init ---------*/
    RegistrationCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this, true);
        // Variables initialization
        this.languages = [];
        this.showPassword = false;
        this.password = "password";
        this.registrationAlert = new models_1.Alert(null, true);
        this.form = this.formBuilder.group({
            firstName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(40)]],
            lastName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(40)]],
            username: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            confirmPassword: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]],
            email: ['', [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator(), forms_1.Validators.maxLength(255)]],
            defaultLanguage: ['', [forms_1.Validators.required]],
            securityNumber: ['', [forms_1.Validators.maxLength(50)]],
            captcha: ['', [forms_1.Validators.required]]
        });
        // Initial methods
        this.getCaptcha();
        this.getLanguages();
    };
    RegistrationCmp.prototype.ngOnDestroy = function () {
        clearTimeout(this.loginRedirectTimeout);
    };
    RegistrationCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'kjgri.registration.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, utility_service_1.UtilityService, kjgri_registration_service_1.RegistrationService, app_service_1.AppService, ng2_translate_1.TranslateService])
    ], RegistrationCmp);
    return RegistrationCmp;
}());
exports.RegistrationCmp = RegistrationCmp;
//# sourceMappingURL=kjgri.registration.cmp.js.map
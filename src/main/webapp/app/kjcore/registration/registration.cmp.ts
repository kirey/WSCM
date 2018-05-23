import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { TranslateService } from 'ng2-translate';

import { ValidationService } from '../shared/services/validation.service';

import { RegistrationService } from './registration.service';

import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';

import { Alert, RestResponse, Captcha } from '../shared/models';

/**
 * Component for Registration page
 * @author Stefan Svrkota
 */
@Component({
    moduleId: module.id,
    templateUrl: 'registration.cmp.html',

    encapsulation: ViewEncapsulation.None
})
export class RegistrationCmp implements OnInit {

    form: FormGroup;
    captchaImage: string;
    captchaHashed: string;
    captchaError: string;
    languages: any;
    showPassword: boolean;
    password: string;
    registered: boolean;
    passwordMismatch: boolean;

    loginRedirectTimeout: any;

    registrationAlert: Alert;

    registrationFormErrors: RestResponse<any>;

    /*--------- Constructor ---------*/
    constructor(
        private formBuilder: FormBuilder,
        private _utilityService: UtilityService,
        private _registrationService: RegistrationService,
        private _appService: AppService,
        private _translateService: TranslateService
    ) { }

    /*--------- App logic ---------*/

    /**
     * Get languages
     * @author Stefan Svrkota
     */
    getLanguages() {
        this._registrationService.getLanguagesRest().subscribe(
            (res: RestResponse<any>) => {
                for (let i = 0; i < Object.keys(res.data).length; i++) {
                    this.languages.push({
                        languageCode: Object.keys(res.data)[i],
                        languageText: res.data[Object.keys(res.data)[i]]
                    })
                }
            },
            (error: RestResponse<any>) => {
            }
        )
    }

    /**
     * Get captcha for page
     * @author Stefan Svrkota
     */
    getCaptcha() {
        this._utilityService.getCaptchaRest().subscribe(
            (res: RestResponse<any>) => {
                this.captchaImage = res.data.imageBase64;
                this.captchaHashed = res.data.hashedCode;
            },
            (error: RestResponse<any>) => {
                this.captchaError = error.message;
            }
        )
    }

    /**
     * Register user
     * @author Stefan Svrkota
     */
    submit(form: FormGroup) {
        let submitData = this._utilityService.copy(form.value);
        let captcha = submitData.captcha;
        delete submitData['captcha'];
        delete submitData['confirmPassword'];

        this._registrationService.registerRest(submitData, captcha, this.captchaHashed).subscribe(
            (res: RestResponse<any>) => {
                this.registered = true;
                this._utilityService.setAlert(this.registrationAlert, res.message + "<p><a class='pointer-cursor' href='#/login'>Login</a></p>", res.statusCode);
            },
            (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.registrationAlert, err.message, err.statusCode, err.errors);
                this.registrationFormErrors = err;
                this.getCaptcha();
            }
        )
    }

    /**
     * Toggle visibility of passwords
     * @author Stefan Svrkota
     */
    togglePassword() {
        this.showPassword = !this.showPassword;
        if (this.showPassword) {
            this.password = "text";
        } else {
            this.password = "password";
        }
    }

    /**
     * Validating password and confirm password
     * @author Stefan Svrkota
     */
    checkPasswords(password: string, confirmPassword: string) {
        if (password.length > 0 && confirmPassword.length > 0 && password != "" && confirmPassword != "") {
            if (password != confirmPassword) {
                this.passwordMismatch = true;
            } else {
                this.passwordMismatch = false;
            }
        } else {
            this.passwordMismatch = false;
        }
    }


    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this, true);

        // Variables initialization
        this.languages = [];
        this.showPassword = false;
        this.password = "password";

        this.registrationAlert = new Alert(null, true);

        this.form = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.maxLength(40)]],
            lastName: ['', [Validators.required, Validators.maxLength(40)]],
            username: ['', [Validators.required, Validators.maxLength(255)]],
            password: ['', [Validators.required, Validators.maxLength(255)]],
            confirmPassword: ['', [Validators.required, Validators.maxLength(255)]],
            email: ['', [Validators.required, ValidationService.emailValidator(), Validators.maxLength(255)]],
            defaultLanguage: ['', [Validators.required]],
            securityNumber: ['', [Validators.maxLength(50)]],
            captcha: ['', [Validators.required]]
        });

        // Initial methods
        this.getCaptcha();
        this.getLanguages();
    }

    ngOnDestroy() {
        clearTimeout(this.loginRedirectTimeout);
    }
}
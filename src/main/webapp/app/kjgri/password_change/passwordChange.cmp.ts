import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { PasswordChangeService } from './passwordChange.service';

import { PasswordChange } from './models';

import { TranslateService } from 'ng2-translate';
import { RestResponse, Captcha, Alert } from '../../kjcore/shared/models';
import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';

/**
 * Component for Password change page
 * @author Mario Petrovic
 */
@Component({
    moduleId: module.id,
    templateUrl: 'passwordChange.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class PasswordChangeCmp implements OnInit {
    @ViewChild('enterEmailForm') enterEmailForm: NgForm;
    subscriptions: Object;
    componentAlert: Alert;
    requestState: boolean;
    passwordChanged: boolean;

    captcha: Captcha;
    passwordType: string;

    formErrors: RestResponse<any>;
    emailErrors: RestResponse<any>;

    redirectTimeout: any;

    /*--------- Constructor --------*/
    constructor(
        private _passwordChangeService: PasswordChangeService,
        private _utilityService: UtilityService,
        private _appService: AppService,
        private _activatedRoute: ActivatedRoute,
        private _translateService: TranslateService) { }

    /*--------- App logic --------*/
    /**
     * Retrieve values for user and populate form with data
     * @author Mario Petrovic
     */
    retrieveUserDetails(mailHash: string): void {
        this.subscriptions['retrieveUserDetails'] = this._passwordChangeService.getUserDetailsRest(mailHash).subscribe(
            (res: RestResponse<any>) => {
                this.requestState = true;
                this.enterEmailForm.setValue(
                    {
                        email: res.data.email,
                    }
                );
                this._utilityService.setAlert(this.componentAlert);
                this._utilityService.getCaptchaRest().subscribe((res: RestResponse<any>) => {
                    this.captcha = res.data;
                });
            }, (err: RestResponse<any>) => {
                this.requestState = false;
                this._utilityService.setAlert(this.componentAlert, err.errors[0].errorCode, err.statusCode);
            }
        )
    }

    /**
     * Send REST request for forgotten password to initate the steps for password change
     * @author Mario Petrovic
     */
    forgotPasswordRequest(username: string): void {
        this.subscriptions['forgotPasswordRequest'] = this._passwordChangeService.forgotPasswordRequestRest(username).subscribe(
            (res: RestResponse<any>) => {
                this.emailErrors = null;
                this.requestState = true;
                this._utilityService.setAlert(this.componentAlert);
                this._utilityService.getCaptchaRest().subscribe((res: RestResponse<any>) => {
                    this.captcha = res.data;
                });
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
                this.emailErrors = err;
            }
        )
    }

    /**
     * Submit password change form 
     * @author Mario Petrovic
     */
    changePasswordSubmit(form: NgForm): void {
        clearTimeout(this.redirectTimeout);
        let passwordChange: PasswordChange = new PasswordChange(
            form.value.password, form.value.mailHashSecret, form.value.captcha, this.captcha.hashedCode
        );

        this.subscriptions['changePasswordSubmit'] = this._passwordChangeService.changePasswordSubmitRest(passwordChange).subscribe((res: RestResponse<any>) => {
            this._utilityService.setAlert(this.componentAlert, 'Password successfully changed.<br/> You will be redirected to Login page.', res.statusCode);
            this.redirectTimeout = setTimeout(() => {
                AppService.router.navigate(['login']);
            }, 4000);
            this.passwordChanged = true;
        }, (err: RestResponse<any>) => {
            this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            this.passwordChanged = false;
            this.formErrors = err;

            this.subscriptions['getCaptcha'] = this._utilityService.getCaptchaRest().subscribe((res: RestResponse<any>) => {
                this.captcha = res.data;
                form.setValue({
                    captcha: '',
                    password: form.value.password,
                    confirmPassword: form.value.confirmPassword,
                    mailHashSecret: form.value.mailHashSecret
                });
            });
        });
    }

    /**
     * Toggle visibility of password input fields 
     * @author Mario Petrovic
     */
    togglePasswordVisibility() {
        this.passwordType = this.passwordType == 'text' ? 'password' : 'text';
    }

    /**
     * Retrieve captcha for form validation 
     * @author Mario Petrovic
     */
    getCaptcha(): void {
        this.subscriptions['getCaptcha'] = this._utilityService.getCaptchaRest().subscribe((res: RestResponse<any>) => {
            this.captcha = res.data;
        });
    }


    /*--------- NG On Init ---------*/
    public ngOnInit(): void {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this, true);

        // Variable initialization
        this.componentAlert = new Alert(null, true);
        this.requestState = false;
        this.subscriptions = {};
        this.captcha = new Captcha();

        this.formErrors = new RestResponse();
        this.emailErrors = new RestResponse();

        this.passwordType = 'password';
        this.passwordChanged = false;

        // Costruct methods
        this._activatedRoute.queryParams.subscribe(params => {
            if (params['mailHash']) {
                this.retrieveUserDetails(params['mailHash']);
            } else {
                this.requestState = false;
            }
        });
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        clearTimeout(this.redirectTimeout);
        this._appService.refreshEmitters(this.subscriptions);
    }
}
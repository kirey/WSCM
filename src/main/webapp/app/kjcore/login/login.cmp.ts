import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { LoginService } from './login.service';

import { AppService } from './../../kjcore/shared/services/app.service';
import { AuthService } from './../../kjcore/shared/services/auth.service';
import { UtilityService } from './../../kjcore/shared/services/utility.service';

import { UserInfo, Language, RestResponse } from './../../kjcore/shared/models';
import { UserLogin } from './models';
import { UserProfile } from "./../../kjcore/shared/models/userProfile.model";

import { TranslateService } from 'ng2-translate';

import { Constants } from "../constants";

/**
 * Component for Login page
 * @author Mario Petrovic
 */
@Component({
    moduleId: module.id,
    templateUrl: 'login.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class LoginCmp implements OnInit {
    submitted: boolean;
    loginData: UserLogin;
    captchaImage: string;
    captchaHashed: string;
    captchaError: string;
    loginForm: FormGroup;

    token: string;

    loginSuccessful: boolean;
    formClicked: boolean;

    // selectedCompany: any;
    // companiesMap: any[];

    companyCssPrefix: string;

    private errorMessage: string;

    /*--------- Constructor --------*/
    constructor(
        private _loginService: LoginService,
        private _utilityService: UtilityService,
        private _appService: AppService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _translateService: TranslateService) { }

    /*--------- App logic --------*/
    /**
     * Get captcha for page
     * @author Stefan Svrkota
     */
    getCaptcha() {
        this._utilityService.getCaptchaRest().toPromise().then(
            (res: RestResponse<any>) => {
                this.loginForm.addControl('captcha', new FormControl({value: null, disabled: this.loginSuccessful}, [Validators.required]));
                this.captchaError = null;
                this.captchaImage = res.data.imageBase64;
                this.captchaHashed = res.data.hashedCode;
            },
            (error: RestResponse<any>) => {
                AuthService.clearAuth();
                this.captchaError = error.message;
                this.captchaImage = null;
                this.captchaHashed = null;
            }
        )
    }

    /**
     * REST - Login authentication with token returned as data
     * @author Mario Petrovic
     */
    login(loginData: UserLogin): void {
        this.formClicked = true;

        if (loginData.username && loginData.password) {
            this.submitted = false;
            this.loginSuccessful = false;
            
            let submitData = this._utilityService.copy(this.loginForm.value);
            let captcha = submitData.captcha;
            delete submitData['captcha'];

            this._authService.login(submitData, captcha, this.captchaHashed).toPromise().then(
                (res: RestResponse<any>) => {
                    this.token = res.data.token;
                    this._utilityService.setToken(this.token);

                    this.getUserRest();
                }, error => {
                    AuthService.clearAuth();
                    this.loginSuccessful = false;
                    this.submitted = true;
                });
        }
    }

    /**
     * REST - Get user information based on token retrived previously
     * @author Mario Petrovic
     */
    getUserRest(): any {
        this._authService.initRest().toPromise().then((res: RestResponse<any>) => {
            //Building and setting app available languages
            this._appService.buildAvailableLanguages(res.data.languages);

            let tempIterator = 0;

            // this.token = this._utilityService.getToken();
            // this._utilityService.removeToken();

            // this.companiesMap = this._utilityService.transformMapToArray(res.data.companies); // brise

            // this.selectedCompany = res.data.activeCompanyId;
            this._authService.userRoutes = this._appService.convertRoutesToObjects(res.data);
            this._appService.userProfile.roles = this._appService.convertRolesToObject(res.data.roles);
            this._appService.userProfile.companyLogo = Constants.LOGO_URL_PREFIX + '/' + res.data.companyId;
            this._appService.userProfile.companyCss = res.data.companyCssPrefix + '/' + res.data.companyId;

            this._appService.userProfile.accountExpiryDate = res.data.accountExpiryDate ? new Date(res.data.accountExpiryDate) : null;
            this._appService.userProfile.userName = res.data.username;
            this._appService.userProfile.email = res.data.email;
            this._appService.userProfile.accountType = res.data.accountType;
            this._appService.userProfile.companyId = res.data.companyId;
            this._appService.setStoredLanguage(res.data.defaultLanguage);

            this.submitted = true;
            this.loginSuccessful = true;

            this.companyCssPrefix = res.data.companyCssPrefix;

            // if (this.companiesMap.length < 2) {
            // this.selectCompany(res.data.activeCompanyId, res.data.companyCssPrefix);
            // }


            this._appService.setCompanyCSS(res.data.companyCssPrefix + '/' + res.data.companyId);

            this._appService.postLoginLoad = true;
            AuthService.loginStatus = true;
            AppService.router.navigate([AuthService.redirectUrl || AppService.defaultPage]);


        }, error => {
            AuthService.clearAuth();
            this.submitted = true;
            this.loginSuccessful = false;
        });
    }

    /**
     * Loads generic parameters
     * @author Mario Petrovic
     */
    getFrontendGenerics() {
        this._appService.getFrontendGenericsRest().toPromise().then(
            (res: RestResponse<any>) => {
                this._appService.frontendGenerics = res.data;
                if(res.data.captchaOnLogin || !res.data.hasOwnProperty("captchaOnLogin")) {
                    this.getCaptcha();
                }
            }
        )
    }

    /*--------- NgOnInit --------*/
    ngOnInit(): void {
        this._appService.pageLoaded('', this, true);

        // Variable initialization
        this.token = '';
        this.loginSuccessful = false;

        this.formClicked = false;

        this.companyCssPrefix = '';

        this._appService.postLoginLoad = false;
        this._appService.initModuleLoaded = false;

        this.loginForm = this._formBuilder.group({
            username: [{value: null, disabled: this.loginSuccessful}, [Validators.required, Validators.maxLength(255)]],
            password: [{value: null, disabled: this.loginSuccessful}, [Validators.required, Validators.maxLength(255)]],
        });

        // this.companiesMap = [];
        // this.selectedCompany = '';

        this.loginData = new UserLogin('', '', '');

        // Initial methods
        this.getFrontendGenerics();
    }
}
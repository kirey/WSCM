import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { TranslateService } from 'ng2-translate';

import { UserPanelService } from './kjgri.userPanel.service';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';

import { RestResponse, Alert } from '../../kjcore/shared/models';
import { UserData, UserPassword } from './models';

/**
 * Component for user panel
 * @author Mario Petrovic
 */
@Component({
    moduleId: module.id,
    templateUrl: 'kjgri.userPanel.cmp.html',
    styleUrls: ['kjgri.userPanel.cmp.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserPanelCmp implements OnInit {
    userPassword: UserPassword;
    userData: UserData;
    originalUserData: UserData;

    componentAlert: Alert;
    subscriptions: Object;

    changeDataPasswordType: string;

    changePasswordType: string;

    languages: any[];

    langOptions: any;

    emailRegex: boolean;

    registrationFormErrors: any;

    captcha: string;
    captchaImage: string;
    captchaHashed: string;
    captchaError: string;

    captcha2: string;
    captchaImage2: string;
    captchaHashed2: string;
    captchaError2: string;

    tabs: any;
    strength: any;

    /*--------- Constructor ---------*/
    constructor(
        private _utilityService: UtilityService,
        private _userPanelService: UserPanelService,
        private _appService: AppService,
        private _translateService: TranslateService
    ) { }

    /*--------- App logic ---------*/
    /**
     * Get captcha for page
     * @author Stefan Svrkota
     */
    getCaptcha() {
        this.subscriptions['captcha'] = this._utilityService.getCaptchaRest().subscribe(
            (res: RestResponse<any>) => {
                if(res.data) {
                    this.captchaImage = res.data.imageBase64;
                    this.captchaHashed = res.data.hashedCode;
                }
            },
            (error: RestResponse<any>) => {
                this.captchaError = error.message;
            }
        )
    }

    /**
     * Get captcha for page
     * @author Stefan Svrkota
     */
    getCaptcha2() {
        this.subscriptions['captcha2'] = this._utilityService.getCaptchaRest().subscribe(
            (res: RestResponse<any>) => {
                if(res.data) {
                    this.captchaImage2 = res.data.imageBase64;
                    this.captchaHashed2 = res.data.hashedCode;
                }
            },
            (error: RestResponse<any>) => {
                this.captchaError2 = error.message;
            }
        )
    }
    
    /**
     * Change password for logged user
     * @author Mario Petrovic
     */
    changePassword(userPassword: UserPassword, form: any): void {
        this._utilityService.setAlert(this.componentAlert);

        let tempUserPassword = this._utilityService.copy(userPassword);
        delete tempUserPassword.confirmPassword;

        this.subscriptions['chagePassword'] = this._userPanelService
            .changePassword(tempUserPassword, this.captcha, this.captchaHashed)._finally(() => {
                this.captcha = null;
                this.getCaptcha();
            }).subscribe(
            (res: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                form.reset()
                form._submitted = false;
                this.userPassword = new UserPassword();
            }, (err: RestResponse<any>) => {
                this.registrationFormErrors = err;
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            });
    }

    /**
    * Update user data
    * @author Mario Petrovic
    */
    changeUserData(userData: UserData): void {
        this._utilityService.setAlert(this.componentAlert);
        let tempLang = this._appService.defaultLanguage;

        this.subscriptions['changeUserData'] = this._userPanelService.
            updateUserData(userData, this.captcha2, this.captchaHashed2)._finally(() => {
                this.captcha2 = null;
                this.getCaptcha2();
            }).subscribe((res: RestResponse<any>) => {
                if (tempLang != userData.defaultLanguage) {
                    this._appService.changeLang(userData.defaultLanguage);
                }
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
                this.userData.password = '';
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode, err.errors);
            });
    }

    /**
     * Get all languages 
     * @author Mario Petrovic
     */
    getAllLanguages(): void {
        this.subscriptions['getAllLanguages'] = this._userPanelService.getAvailableLanguages().subscribe(
            (res: RestResponse<any>) => {
                for (let i = 0; i < Object.keys(res.data).length; i++) {
                    this.languages.push({
                        languageCode: Object.keys(res.data)[i],
                        languageText: res.data[Object.keys(res.data)[i]]
                    })
                }
            }, (err: RestResponse<any>) => {
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            });
    }

    validateEmail(email: string) {
        if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)) {
            this.emailRegex = false;
        } else {
            this.emailRegex = true;
        }
    }

    /*--------- Utility ---------*/
    /**
     * Toggle visibility of password for change data confirmation 
     * @author Mario Petrovic
     */
    changeDataTogglePasswordVisibility() {
        this.changeDataPasswordType = this.changeDataPasswordType == 'text' ? 'password' : 'text';
    }

    /**
     * Toggle visibility of password for password change 
     * @author Mario Petrovic
     */
    changePasswordTogglePasswordVisibility() {
        this.changePasswordType = this.changePasswordType == 'text' ? 'password' : 'text';
    }
    /**
     * Do a catpcha call on
     * tab swap, not on page load
     * @param event 
     */
    onPasswordTab(event: any) {
        if(!this.tabs.isPasswordTab) {
            this.getCaptcha2();
        }
        for(let key of Object.keys(this.tabs)) {
            this.tabs[key] = false;
        }
        this.tabs.isPasswordTab = true;
    }

    /**
     * Do a catpcha call on
     * tab swap, not on page load
     * @param event 
     */
    onUserDataTab(event: any) {
        if(!this.tabs.isUserDataTab) {
            this.getCaptcha2();
        }
        for(let key of Object.keys(this.tabs)) {
            this.tabs[key] = false;
        }
        this.tabs.isUserDataTab = true;
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        // Variables initialization
        this.languages = [];
        this.userPassword = new UserPassword();
        this.captcha = null;
        this.tabs = {
            isPasswordTab: true,
            isUserDataTab: false
        };

        this.subscriptions = {};

        this.componentAlert = new Alert(null, true);
        this.subscriptions = {};

        this.changeDataPasswordType = 'password';
        this.changePasswordType = 'password';

        this.userData = new UserData(this._appService.userProfile.email, this._appService.getStoredLanguage());
        // Initial methods
        this.getAllLanguages();
        this.getCaptcha();

        this._appService.languageChangeForComponent(this);
    }

    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}
import { Component, Inject, EventEmitter, Renderer } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { TranslateService } from 'ng2-translate';

import { UtilityService } from '../../shared/services/utility.service';
import { AuthService } from './auth.service';

import { UserInfo, UserProfile, Language, ApplicationData } from '../models';

import { Constants } from "./../../constants";

/**
 * App service with shared values and methods on global scope of the app
 * @author Mario Petrovic
 */
@Injectable()
export class AppService {
    private defaultAppTitle: string;
    defaultLanguage: string;
    defaultLanguageName: string;
    availableLanguages: Language[];
    userProfile: UserProfile;
    static defaultPage: string;
    initModuleLoaded: boolean;

    postLoginLoad: boolean;

    currentPageRoute: string;

    languageChanged = new EventEmitter();
    navLanguageChanged = new EventEmitter();

    globalLoaderCounter: number;
    static localLoaderCounter: number;

    static router: Router;

    static renderer: Renderer;

    browserUserAgent: Object;

    companyCss: string;
    applicationData: ApplicationData;

    frontendGenerics: any;

    constructor(
        private _http: Http,
        private _title: Title,
        private _utilityService: UtilityService
    ) {
        this.defaultAppTitle = '';
        this.defaultLanguage = this.getStoredLanguage() || 'en_US';
        this.defaultLanguageName = '';
        this.userProfile = new UserProfile();
        this.initModuleLoaded = false;

        this.postLoginLoad = false;

        this.globalLoaderCounter = 0;
        AppService.localLoaderCounter = 0;

        this.currentPageRoute = '';
        this.companyCss = '';
        this.applicationData = new ApplicationData();
        this.applicationData.applicationLogoUrl = Constants.FILE_URL_PREFIX + '?key=frontend.images.applicationImage';
        this.applicationData.serviceProviderLogoUrl = Constants.FILE_URL_PREFIX + '?key=frontend.images.serviceProviderImage';

        AppService.defaultPage = 'home';
        this.browserUserAgent = {};
        this.frontendGenerics = {};
    }

    /**
     * Set default app language
     * @author Mario Petrovic
     */
    getStoredLanguage(): string {
        return localStorage.getItem('default_lang');
    }

    /**
     * Set default app language
     * @author Mario Petrovic
     */
    setStoredLanguage(lang: string): void {
        this.defaultLanguage = lang;

        for (let langItem of this.availableLanguages) {
            if (langItem.languageCode == lang) {
                this.defaultLanguageName = langItem.languageName;
            }
        }

        localStorage.setItem('default_lang', lang);
    }

    /**
     * Removes default app language
     * @author Mario Petrovic
     */
    removeStoredLanguage(): void {
        this.defaultLanguage = 'en_US';
        localStorage.removeItem('default_lang');
    }

    /**
     * Set router from component for interceptor 
     * @author Mario Petrovic
     */
    setRouter(router: Router): void {
        AppService.router = router;
    }

    /**
     * Set renderer from component for interceptor 
     * @author Stefan Svrkota
     */
    setRenderer(renderer: Renderer): void {
        AppService.renderer = renderer;
    }

    /**
     * Get rest queue count
     * @author Mario Petrovic
     */
    getRouter(): Router {
        return AppService.router;
    }

    /**
     * Set company css
     * @author Mario Petrovic
     */
    setCompanyCSS(url: string): void {
        this.companyCss = url;
    }

    /**
     * Set company css after initial authentication is successful
     * @author Mario Petrovic
     */
    setCompanyCSSInit(): void {
        this.companyCss = null;
        setTimeout(() => {
            this.companyCss = this.userProfile.companyCss;
        });
    }

    /**
     * Method to be executed when page is loaded 
     * @author Mario Petrovic
     */
    pageLoaded(titleKey: string, context: any, isOutOfAuth?: boolean): void {
        // Activate translation on page init (Optional)
        if (context && context._translateService) {
            context._translateService.use(this.getStoredLanguage()).toPromise().then(
                (res: any) => {
                    // Translate title of the page
                    let header = 'NO TRANSLATION';
                    let titleKeyTemp = titleKey || 'mainHeader';

                    MAINLOOP: for (let key of Object.keys(res)) {
                        let regExpCondition = new RegExp("\\b" + titleKeyTemp + "\\b").test(key);
                        if (regExpCondition) {
                            header = res[key];
                            break MAINLOOP;
                        }
                    }

                    this._title.setTitle(this.defaultAppTitle + header);
                });
        } else {
            this._title.setTitle(this.defaultAppTitle + titleKey);
        }

        this.currentPageRoute = AppService.router.url;

        this.postLoginLoad = false;
        // AppService.restQueue(false, 0);



        if (!isOutOfAuth) {
            // this._utilityService.setInitCompanyCSS();
            this.initModuleLoaded = true;
        }
    }

    /**
     * Method for initiating subscriber for translation change listening and calling custom code after language is changed in app
     * @author Mario Petrovic
     */
    languageChangeForComponent(context: any, callback?: any) {
        this.languageChanged.subscribe(lang => {
            this.changeLangTranslate(context._translateService, lang);

            if (callback) {
                callback.call();
            }
        });
    }

    /**
     * Change language and emmit change
     * @author Mario Petrovic
     */
    changeLang(lang: string): void {
        this.setGlobalLoader(true);
        this.changeLangRest(lang).toPromise().then(() => {
            this.setStoredLanguage(lang);
            this.defaultLanguage = lang;
            this.setGlobalLoader(false);

            this.navLanguageChanged.emit(lang);
        }, error => {
            this.setGlobalLoader(false);

        })
    }

    /**
     * Change languge by using translate reference from component with give lang
     * @author Mario Petrovic
     */
    changeLangTranslate(translate: TranslateService, lang: string, navigation?: boolean): void {
        if (navigation) {
            this.setGlobalLoader(true);
        }
        translate.use(lang).subscribe(
            (res: any) => {
                if (navigation) {
                    this.setGlobalLoader(false);
                    this.languageChanged.emit(lang);
                } else {
                    // Translate title of the page
                    let header = 'NO TRANSLATION';

                    MAINLOOP: for (let key of Object.keys(res)) {
                        if (key.indexOf('mainHeader') != -1) {
                            header = res[key];
                            break MAINLOOP;
                        }
                    }

                    this._title.setTitle(this.defaultAppTitle + header);
                }
            });
    }

    /**
     * Unsubscribe from event emitters onDestroy component
     * @author Mario Petrovic
     */
    refreshEmitters(subscriptions?: any, refreshNav?: boolean): void {
        this.languageChanged.unsubscribe();

        this.languageChanged = new EventEmitter();

        if (subscriptions) {
            for (let subscription of Object.keys(subscriptions)) {
                if (subscriptions[subscription]) {
                    subscriptions[subscription].unsubscribe();
                }
            }
        }

        if (refreshNav) {
            this.navLanguageChanged.unsubscribe();
            this.navLanguageChanged = new EventEmitter();
        }

        if (!refreshNav) {
            AppService.restQueue(false, 0);
        }
    }

    /**
     * Change language - REST
     * @author Mario Petrovic
     */
    private changeLangRest(lang: string): Observable<any> {
        return this._http.get('rest/translation/languages/' + lang);
    }

    /**
     * Converting retrieved routes from init or getUser to array of routes
     * @author Mario Petrovic
     */
    convertRoutesToObjects(userInfo: UserInfo): Object {
        let routes: Object = {};

        for (let route of userInfo.userRoutes) {
            routes[route.url] = true;
        }

        return routes;
    }

    /**
     * Handle global loader count
     * @author Mario Petrovic
     */
    setGlobalLoader(increment: boolean): void {
        if (increment) {
            this.globalLoaderCounter++;
        } else {
            this.globalLoaderCounter--;
        }
    }

    /**
     * Increment or decrement rest queue
     * @author Mario Petrovic
     */
    static restQueue(increment: boolean, value?: number): void {
        if (value || Number.isInteger(value)) {
            AppService.localLoaderCounter = value;
        } else {
            if (increment) {
                AppService.localLoaderCounter++;
            } else {
                AppService.localLoaderCounter--;
            }
        }
    }

    /**
     * Get rest queue count
     * @author Mario Petrovic
     */
    getRestQueue(): number {
        return AppService.localLoaderCounter;
    }

    /**
     * Converting roles from array to object
     * @author Mario Petrovic
     */
    convertRolesToObject(roles: string[]): Object {
        let rolesObject: Object = {};

        for (let role of roles) {
            rolesObject[role] = true;
        }

        return rolesObject;
    }

    convertBase64ToBlob(base64String: string, type?: string) {
        let byteCharacters = atob(base64String);

        let byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        let blob = new Blob([byteArray], {type: type});

        return blob;
    }

    /**
     * This method decoding an encoded byte array into byte characters string
     * @author Ciprian Dorofte
     */
    decodeData(encodeData: any) {
        return atob(encodeData);
    }

    /**
     * This method extract the extension from a file name even if file name contain dots
     * @author Ciprian Dorofte
     */
    extractExtensionFromFileName(fileName: string): string {
        let regex = /(?:\.([^.]+))?$/;
        let extension = regex.exec(fileName)[1];
        return extension;
    }

    /**
     * Sets available languages for 
     * logged in user
     * @author Nikola Gavric
     */
    setAvailableLanguages(availableLanguages: Language[]): void {
        this.availableLanguages = availableLanguages;
    }

    /**
     * Determines which browser is being used
     * @author Stefan Svrkota
     */
    setBrowserAgent() {
        if (navigator.userAgent.indexOf("Chrome") != -1) {
            this.browserUserAgent['Chrome'] = true;
        } else if (navigator.userAgent.indexOf("Opera") != -1) {
            this.browserUserAgent['Opera'] = true;
        } else if (navigator.userAgent.indexOf(".NET") != -1) {
            this.browserUserAgent['IE'] = true;
        } else if (navigator.userAgent.indexOf("Edge") != -1) {
            this.browserUserAgent['Edge'] = true;
        } else if (navigator.userAgent.indexOf("Firefox") != -1) {
            this.browserUserAgent['Firefox'] = true;
        } else if (navigator.userAgent.indexOf("Safari") != -1) {
            this.browserUserAgent['Safari'] = true;
        } else {
            this.browserUserAgent = "unknown";
        }
    }

    /**
     * Determines if passed browsers exist
     * @author Stefan Svrkota
     */
    checkBrowsers(browsers: string[]): boolean {
        for (let i of browsers) {
            if (this.browserUserAgent[i]) {
                return true;
            }
        }
        return false;
    }

    /**
     * Determines if user has authority
     * @author Nikola Gavric
     */
    public isAuthorised(roleNames: string[] | string): boolean {
        if (typeof roleNames == "string") {
            return this.userProfile.roles.hasOwnProperty(roleNames) && this.userProfile.roles[roleNames];
        } else {
            for (let i of roleNames) {
                if (this.userProfile.roles.hasOwnProperty(i) && this.userProfile.roles[i]) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Builds and sets available languages
     * for currently logged in user
     * @author Nikola Gavric
     */
    buildAvailableLanguages(availableLanguages: any[]): void {
        //Initializing temp array of available languages
        let temp: Language[] = [];
        //Iterating through available objects
        for (let key in availableLanguages) {
            //Creating and adding new language to the array
            temp.push(new Language(key, availableLanguages[key]));
        }
        //Setting available languages for the whole app
        this.availableLanguages = temp;
    }

    /**
     * Rest GET call for getting content visibility object
     * @author Stefan Svrkota
     */
    getFrontendGenericsRest(): Observable<any> {
        return this._http.get('rest/users/noAuth/frontendGenerics')
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    }

    /**
     * Returns frontend generic value
     * @author Mario Petrovic
     */
    getFrontendGeneric(genericKey: string, defaultValue?: any): any {
        return !!this.frontendGenerics && this.frontendGenerics[genericKey] !== undefined ? this.frontendGenerics[genericKey] : defaultValue;
    }
}
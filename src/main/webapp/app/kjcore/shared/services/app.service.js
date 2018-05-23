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
var core_2 = require('@angular/core');
var http_1 = require('@angular/http');
var platform_browser_1 = require('@angular/platform-browser');
var utility_service_1 = require('../../shared/services/utility.service');
var models_1 = require('../models');
var constants_1 = require("./../../constants");
/**
 * App service with shared values and methods on global scope of the app
 * @author Mario Petrovic
 */
var AppService = (function () {
    function AppService(_http, _title, _utilityService) {
        this._http = _http;
        this._title = _title;
        this._utilityService = _utilityService;
        this.languageChanged = new core_1.EventEmitter();
        this.navLanguageChanged = new core_1.EventEmitter();
        this.defaultAppTitle = '';
        this.defaultLanguage = this.getStoredLanguage() || 'en_US';
        this.defaultLanguageName = '';
        this.userProfile = new models_1.UserProfile();
        this.initModuleLoaded = false;
        this.postLoginLoad = false;
        this.globalLoaderCounter = 0;
        AppService.localLoaderCounter = 0;
        this.currentPageRoute = '';
        this.companyCss = '';
        this.applicationData = new models_1.ApplicationData();
        this.applicationData.applicationLogoUrl = constants_1.Constants.FILE_URL_PREFIX + '?key=frontend.images.applicationImage';
        this.applicationData.serviceProviderLogoUrl = constants_1.Constants.FILE_URL_PREFIX + '?key=frontend.images.serviceProviderImage';
        AppService.defaultPage = 'home';
        this.browserUserAgent = {};
        this.frontendGenerics = {};
    }
    /**
     * Set default app language
     * @author Mario Petrovic
     */
    AppService.prototype.getStoredLanguage = function () {
        return localStorage.getItem('default_lang');
    };
    /**
     * Set default app language
     * @author Mario Petrovic
     */
    AppService.prototype.setStoredLanguage = function (lang) {
        this.defaultLanguage = lang;
        for (var _i = 0, _a = this.availableLanguages; _i < _a.length; _i++) {
            var langItem = _a[_i];
            if (langItem.languageCode == lang) {
                this.defaultLanguageName = langItem.languageName;
            }
        }
        localStorage.setItem('default_lang', lang);
    };
    /**
     * Removes default app language
     * @author Mario Petrovic
     */
    AppService.prototype.removeStoredLanguage = function () {
        this.defaultLanguage = 'en_US';
        localStorage.removeItem('default_lang');
    };
    /**
     * Set router from component for interceptor
     * @author Mario Petrovic
     */
    AppService.prototype.setRouter = function (router) {
        AppService.router = router;
    };
    /**
     * Set renderer from component for interceptor
     * @author Stefan Svrkota
     */
    AppService.prototype.setRenderer = function (renderer) {
        AppService.renderer = renderer;
    };
    /**
     * Get rest queue count
     * @author Mario Petrovic
     */
    AppService.prototype.getRouter = function () {
        return AppService.router;
    };
    /**
     * Set company css
     * @author Mario Petrovic
     */
    AppService.prototype.setCompanyCSS = function (url) {
        this.companyCss = url;
    };
    /**
     * Set company css after initial authentication is successful
     * @author Mario Petrovic
     */
    AppService.prototype.setCompanyCSSInit = function () {
        var _this = this;
        this.companyCss = null;
        setTimeout(function () {
            _this.companyCss = _this.userProfile.companyCss;
        });
    };
    /**
     * Method to be executed when page is loaded
     * @author Mario Petrovic
     */
    AppService.prototype.pageLoaded = function (titleKey, context, isOutOfAuth) {
        var _this = this;
        // Activate translation on page init (Optional)
        if (context && context._translateService) {
            context._translateService.use(this.getStoredLanguage()).toPromise().then(function (res) {
                // Translate title of the page
                var header = 'NO TRANSLATION';
                var titleKeyTemp = titleKey || 'mainHeader';
                MAINLOOP: for (var _i = 0, _a = Object.keys(res); _i < _a.length; _i++) {
                    var key = _a[_i];
                    var regExpCondition = new RegExp("\\b" + titleKeyTemp + "\\b").test(key);
                    if (regExpCondition) {
                        header = res[key];
                        break MAINLOOP;
                    }
                }
                _this._title.setTitle(_this.defaultAppTitle + header);
            });
        }
        else {
            this._title.setTitle(this.defaultAppTitle + titleKey);
        }
        this.currentPageRoute = AppService.router.url;
        this.postLoginLoad = false;
        // AppService.restQueue(false, 0);
        if (!isOutOfAuth) {
            // this._utilityService.setInitCompanyCSS();
            this.initModuleLoaded = true;
        }
    };
    /**
     * Method for initiating subscriber for translation change listening and calling custom code after language is changed in app
     * @author Mario Petrovic
     */
    AppService.prototype.languageChangeForComponent = function (context, callback) {
        var _this = this;
        this.languageChanged.subscribe(function (lang) {
            _this.changeLangTranslate(context._translateService, lang);
            if (callback) {
                callback.call();
            }
        });
    };
    /**
     * Change language and emmit change
     * @author Mario Petrovic
     */
    AppService.prototype.changeLang = function (lang) {
        var _this = this;
        this.setGlobalLoader(true);
        this.changeLangRest(lang).toPromise().then(function () {
            _this.setStoredLanguage(lang);
            _this.defaultLanguage = lang;
            _this.setGlobalLoader(false);
            _this.navLanguageChanged.emit(lang);
        }, function (error) {
            _this.setGlobalLoader(false);
        });
    };
    /**
     * Change languge by using translate reference from component with give lang
     * @author Mario Petrovic
     */
    AppService.prototype.changeLangTranslate = function (translate, lang, navigation) {
        var _this = this;
        if (navigation) {
            this.setGlobalLoader(true);
        }
        translate.use(lang).subscribe(function (res) {
            if (navigation) {
                _this.setGlobalLoader(false);
                _this.languageChanged.emit(lang);
            }
            else {
                // Translate title of the page
                var header = 'NO TRANSLATION';
                MAINLOOP: for (var _i = 0, _a = Object.keys(res); _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (key.indexOf('mainHeader') != -1) {
                        header = res[key];
                        break MAINLOOP;
                    }
                }
                _this._title.setTitle(_this.defaultAppTitle + header);
            }
        });
    };
    /**
     * Unsubscribe from event emitters onDestroy component
     * @author Mario Petrovic
     */
    AppService.prototype.refreshEmitters = function (subscriptions, refreshNav) {
        this.languageChanged.unsubscribe();
        this.languageChanged = new core_1.EventEmitter();
        if (subscriptions) {
            for (var _i = 0, _a = Object.keys(subscriptions); _i < _a.length; _i++) {
                var subscription = _a[_i];
                if (subscriptions[subscription]) {
                    subscriptions[subscription].unsubscribe();
                }
            }
        }
        if (refreshNav) {
            this.navLanguageChanged.unsubscribe();
            this.navLanguageChanged = new core_1.EventEmitter();
        }
        if (!refreshNav) {
            AppService.restQueue(false, 0);
        }
    };
    /**
     * Change language - REST
     * @author Mario Petrovic
     */
    AppService.prototype.changeLangRest = function (lang) {
        return this._http.get('rest/translation/languages/' + lang);
    };
    /**
     * Converting retrieved routes from init or getUser to array of routes
     * @author Mario Petrovic
     */
    AppService.prototype.convertRoutesToObjects = function (userInfo) {
        var routes = {};
        for (var _i = 0, _a = userInfo.userRoutes; _i < _a.length; _i++) {
            var route = _a[_i];
            routes[route.url] = true;
        }
        return routes;
    };
    /**
     * Handle global loader count
     * @author Mario Petrovic
     */
    AppService.prototype.setGlobalLoader = function (increment) {
        if (increment) {
            this.globalLoaderCounter++;
        }
        else {
            this.globalLoaderCounter--;
        }
    };
    /**
     * Increment or decrement rest queue
     * @author Mario Petrovic
     */
    AppService.restQueue = function (increment, value) {
        if (value || Number.isInteger(value)) {
            AppService.localLoaderCounter = value;
        }
        else {
            if (increment) {
                AppService.localLoaderCounter++;
            }
            else {
                AppService.localLoaderCounter--;
            }
        }
    };
    /**
     * Get rest queue count
     * @author Mario Petrovic
     */
    AppService.prototype.getRestQueue = function () {
        return AppService.localLoaderCounter;
    };
    /**
     * Converting roles from array to object
     * @author Mario Petrovic
     */
    AppService.prototype.convertRolesToObject = function (roles) {
        var rolesObject = {};
        for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
            var role = roles_1[_i];
            rolesObject[role] = true;
        }
        return rolesObject;
    };
    AppService.prototype.convertBase64ToBlob = function (base64String, type) {
        var byteCharacters = atob(base64String);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: type });
        return blob;
    };
    /**
     * This method decoding an encoded byte array into byte characters string
     * @author Ciprian Dorofte
     */
    AppService.prototype.decodeData = function (encodeData) {
        return atob(encodeData);
    };
    /**
     * This method extract the extension from a file name even if file name contain dots
     * @author Ciprian Dorofte
     */
    AppService.prototype.extractExtensionFromFileName = function (fileName) {
        var regex = /(?:\.([^.]+))?$/;
        var extension = regex.exec(fileName)[1];
        return extension;
    };
    /**
     * Sets available languages for
     * logged in user
     * @author Nikola Gavric
     */
    AppService.prototype.setAvailableLanguages = function (availableLanguages) {
        this.availableLanguages = availableLanguages;
    };
    /**
     * Determines which browser is being used
     * @author Stefan Svrkota
     */
    AppService.prototype.setBrowserAgent = function () {
        if (navigator.userAgent.indexOf("Chrome") != -1) {
            this.browserUserAgent['Chrome'] = true;
        }
        else if (navigator.userAgent.indexOf("Opera") != -1) {
            this.browserUserAgent['Opera'] = true;
        }
        else if (navigator.userAgent.indexOf(".NET") != -1) {
            this.browserUserAgent['IE'] = true;
        }
        else if (navigator.userAgent.indexOf("Edge") != -1) {
            this.browserUserAgent['Edge'] = true;
        }
        else if (navigator.userAgent.indexOf("Firefox") != -1) {
            this.browserUserAgent['Firefox'] = true;
        }
        else if (navigator.userAgent.indexOf("Safari") != -1) {
            this.browserUserAgent['Safari'] = true;
        }
        else {
            this.browserUserAgent = "unknown";
        }
    };
    /**
     * Determines if passed browsers exist
     * @author Stefan Svrkota
     */
    AppService.prototype.checkBrowsers = function (browsers) {
        for (var _i = 0, browsers_1 = browsers; _i < browsers_1.length; _i++) {
            var i = browsers_1[_i];
            if (this.browserUserAgent[i]) {
                return true;
            }
        }
        return false;
    };
    /**
     * Determines if user has authority
     * @author Nikola Gavric
     */
    AppService.prototype.isAuthorised = function (roleNames) {
        if (typeof roleNames == "string") {
            return this.userProfile.roles.hasOwnProperty(roleNames) && this.userProfile.roles[roleNames];
        }
        else {
            for (var _i = 0, roleNames_1 = roleNames; _i < roleNames_1.length; _i++) {
                var i = roleNames_1[_i];
                if (this.userProfile.roles.hasOwnProperty(i) && this.userProfile.roles[i]) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Builds and sets available languages
     * for currently logged in user
     * @author Nikola Gavric
     */
    AppService.prototype.buildAvailableLanguages = function (availableLanguages) {
        //Initializing temp array of available languages
        var temp = [];
        //Iterating through available objects
        for (var key in availableLanguages) {
            //Creating and adding new language to the array
            temp.push(new models_1.Language(key, availableLanguages[key]));
        }
        //Setting available languages for the whole app
        this.availableLanguages = temp;
    };
    /**
     * Rest GET call for getting content visibility object
     * @author Stefan Svrkota
     */
    AppService.prototype.getFrontendGenericsRest = function () {
        return this._http.get('rest/users/noAuth/frontendGenerics')
            .map(utility_service_1.UtilityService.handleSuccess)
            .catch(utility_service_1.UtilityService.handleError);
    };
    /**
     * Returns frontend generic value
     * @author Mario Petrovic
     */
    AppService.prototype.getFrontendGeneric = function (genericKey, defaultValue) {
        return !!this.frontendGenerics && this.frontendGenerics[genericKey] !== undefined ? this.frontendGenerics[genericKey] : defaultValue;
    };
    AppService = __decorate([
        core_2.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, platform_browser_1.Title, utility_service_1.UtilityService])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map
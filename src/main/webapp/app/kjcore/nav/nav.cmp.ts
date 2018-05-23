import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { TranslateService } from 'ng2-translate';

import { NavService } from './nav.service';

import { AppService } from '../../kjcore/shared/services/app.service';
import { AuthService } from '../../kjcore/shared/services/auth.service';
import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { Language } from '../../kjcore/shared/models';

@Component({
    moduleId: module.id,
    selector: 'navigation-menu',
    templateUrl: 'nav.cmp.html',
    encapsulation: ViewEncapsulation.None
})

export class NavCmp implements OnInit {
    bRouteChanged: boolean;
    logoutLoading: boolean;

    /*--------- Constructor --------*/
    constructor(
        private _translateService: TranslateService,
        private _navService: NavService,
        private _appService: AppService,
        private _utilityService: UtilityService,
        private _authService: AuthService) { }

    /*--------- App logic --------*/
    /**
     * Change language on flag click
     * @author Mario Petrovic
     */
    changeLanguage(lang: string): void {
        this._appService.changeLang(lang);
    }

    /**
     * REST - Login authentication with token returned as data
     * @author Mario Petrovic
     */
    logout(): void {
        this.logoutLoading = true;
        this._authService.logout().toPromise().then(res => {
            AuthService.clearAuth();
            this.logoutLoading = false;
            AuthService.redirectUrl = '';
        }, error => {
            this.logoutLoading = false;
        })
    }

    /**
     * Check if logged in user can see given route
     * @author Mario Petrovic
     */
    checkRoute(route: string): boolean {
        return this._authService.userRoutes[route];
    }

    /*--------- Utility ---------*/
    /**
     * Match default language for click prevention
     * @author Kirey
     */
    matchDefaultLanguage(lang: string): boolean {
        return lang == this._appService.defaultLanguage;
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        this.logoutLoading = false;

        this._translateService.use(this._appService.getStoredLanguage());

        this._appService.navLanguageChanged.subscribe(lang => {
            this._appService.changeLangTranslate(this._translateService, lang, true);
        });
    }

    ngOnDestroy(): void {
        this._appService.refreshEmitters(null, true);
    }
}
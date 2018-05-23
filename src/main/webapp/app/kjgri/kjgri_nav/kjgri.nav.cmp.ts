import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from 'ng2-translate';

import { KJGriNavService } from './kjgri.nav.service';

import { AppService } from '../../kjcore/shared/services/app.service';
import { AuthService } from '../../kjcore/shared/services/auth.service';
import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { Language } from '../../kjcore/shared/models';
import { MenuItem } from './models';

@Component({
    moduleId: module.id,
    selector: 'navigation-menu',
    templateUrl: 'kjgri.nav.cmp.html',
    encapsulation: ViewEncapsulation.None
})

export class KJGriNavCmp implements OnInit {
    bRouteChanged: boolean;
    logoutLoading: boolean;

    /*--------- Constructor --------*/
    constructor(
        private _translateService: TranslateService,
        private _navService: KJGriNavService,
        private _appService: AppService,
        private _utilityService: UtilityService,
        private _authService: AuthService,
        private _router: Router) { }

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
     * @author Nikola Gavric
     */
    checkRoute(route: string): boolean {
        return this._authService.userRoutes[route];
    }

    /**
     * Check if given array has a child
     * 
     * @param arr MenuItem
     * @author Nikola Gavric
     */
    hasChildRoute(arr: MenuItem): boolean {
        let found: boolean;

        arr.dropdown.some((obj) => {
            return (found = this._appService.currentPageRoute.includes(obj.route));
        });

        return found;
    }

    /*--------- Utility ---------*/
    /**
     * Match default language for click prevention
     * @author Nikola Gavric
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
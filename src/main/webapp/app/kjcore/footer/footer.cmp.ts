import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { TranslateService } from 'ng2-translate';

import { AppService } from '../shared/services/app.service';
import { AuthService } from '../shared/services/auth.service';
import { UtilityService } from '../shared/services/utility.service';

import { Language } from './../shared/models';

@Component({
    moduleId: module.id,
    selector: 'footer-menu',
    templateUrl: 'footer.cmp.html',
    encapsulation: ViewEncapsulation.None
})

export class FooterCmp implements OnInit {

    /*--------- Constructor --------*/
    constructor(
        // private _translateService: TranslateService,
        private _appService: AppService,
        private _utilityService: UtilityService,
        private _authService: AuthService) {}
    
    /*--------- App logic --------*/

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // this._translateService.use(this._appService.getStoredLanguage());

        // this._appService.navLanguageChanged.subscribe(lang => {
        //     this._appService.changeLangTranslate(this._translateService, lang, true);
        // });
    }

    ngOnDestroy(): void {
        this._appService.refreshEmitters(null, true);
    }
}
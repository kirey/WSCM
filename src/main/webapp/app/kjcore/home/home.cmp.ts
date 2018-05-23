import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AppService } from '../shared/services/app.service';

import { TranslateService } from 'ng2-translate';

@Component({
    moduleId: module.id,
    templateUrl: 'home.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class HomeCmp implements OnInit {
    
    /*--------- Constructor --------*/
    constructor(
        private _appService: AppService,
        private _translateService: TranslateService) { }

    /*--------- App logic --------*/


    /*--------- NG On Init ---------*/
    public ngOnInit(): void {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        this._appService.languageChangeForComponent(this);
        // Variable initialization
    }
}
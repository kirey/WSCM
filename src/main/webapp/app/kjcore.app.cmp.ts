import { Component, OnInit, ViewContainerRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from './kjcore/shared/services/app.service';
import { AuthService } from './kjcore/shared/services/auth.service';

import { UserInfo, RestResponse } from './kjcore/shared/models';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'kjcore.app.cmp.html',
})

export class KJCoreAppCmp implements OnInit {
    static initState: boolean;


    /*--------- Constructor --------*/
    constructor(
        private _appService: AppService,
        private _router: Router,
        private _authService: AuthService,
        private viewContainerRef: ViewContainerRef,
        private _renderer: Renderer) { }

    

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Variables initialization

        // Initial methods
        this._appService.setRouter(this._router);
        this._appService.setRenderer(this._renderer);
        

        this._appService.setBrowserAgent();
    }
}
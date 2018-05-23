import { Component, OnInit, Input } from '@angular/core';

import { AppService } from '../../services/app.service';

@Component({
    moduleId: module.id,
    selector: 'global-loader',
    templateUrl: 'globalLoader.cmp.html'
})
export class GlobalLoaderCmp implements OnInit {
    @Input() loaderCounter: number;
    @Input() loadingMessage: string;

    @Input() position: string;

    /*--------- Constructor --------*/
    constructor(
        private _appService: AppService
    ) {
        this.loaderCounter = 0;
        this.loadingMessage = '';
    }

    /*--------- NG On Init ---------*/
    ngOnInit() { }
}
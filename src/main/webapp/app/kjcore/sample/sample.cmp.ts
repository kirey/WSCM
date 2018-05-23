import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { TranslateService } from 'ng2-translate';

import { SampleService } from './sample.service';

import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';

import { Alert, RestResponse } from "./../shared/models";

/*
Certain utility methods are located inside UtilityService. Additional utilities can be added if neccessery. These utilities will help the rest of developers to use them in different locations of app. Take for example method "copy()"

If you want to share some data in different components of the app, use AppService for that purpose, because it is a singleton in scope of app
UtilityService is a singleton in scope of each Component

*/

@Component({
    moduleId: module.id,
    templateUrl: 'sample.cmp.html',

    encapsulation: ViewEncapsulation.None
})
export class SampleCmp implements OnInit {
    componentAlert: Alert;

    subscribers: any;

    /*--------- Constructor ---------*/
    constructor(
        private _utilityService: UtilityService,
        private _sampleService: SampleService,
        private _appService: AppService,
        private _translateService: TranslateService
    ) { }

    /*--------- App logic ---------*/
    
    loadSomething(): void {
        this.subscribers = this._sampleService.getSomethingRest().subscribe(
            (res: RestResponse<any>) => {
                // Fill alert with success message
                this._utilityService.setAlert(this.componentAlert, res.message, res.statusCode);
            },
            (err: RestResponse<any>) => {
                // Fill alert with error message
                this._utilityService.setAlert(this.componentAlert, err.message, err.statusCode);
            }
        )
    }


    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this); // This method is mandatory for purpose of executing translation and setting initial states of certain variables

        // Variables initialization
        this.subscribers = {};
        this.componentAlert = new Alert(null, true);
    }


    // OnDestroy is mandatory for purpose of unsubscribing of subscribed HTTP calls located in this.subscribers variable
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscribers);
    }
}
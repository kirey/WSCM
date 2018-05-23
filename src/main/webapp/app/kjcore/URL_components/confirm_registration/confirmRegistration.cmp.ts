import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConfirmRegistrationService } from './confirmRegistration.service';

import { AppService } from '../../shared/services/app.service';
import { UtilityService } from '../../shared/services/utility.service';

import { Alert, RestResponse } from '../../shared/models';

/**
 * Component for Confirm registration call
 * @author Mario Petrovic
 */
@Component({
    moduleId: module.id,
    templateUrl: 'confirmRegistration.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class ConfirmRegistrationCmp implements OnInit {
    subscriptions: Object;
    confirmRegistrationAlert: Alert;

    /*--------- Constructor --------*/
    constructor(
        private _passwordChangeService: ConfirmRegistrationService,
        private _appService: AppService,
        private _activatedRoute: ActivatedRoute,
        private _utilityService: UtilityService) { }

    /*--------- App logic --------*/


    /*--------- NG On Init ---------*/
    public ngOnInit(): void {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', null, true);

        // Variable initialization
        this.subscriptions = {};
        this.confirmRegistrationAlert = new Alert(null, true);

        // Costruct methods
        this._activatedRoute.queryParams.subscribe(params => {
            if (params['mailHash']) {
                this.subscriptions['confirmRegistration'] = this._passwordChangeService.confirmRegistration(params['mailHash']).subscribe(
                    (res: RestResponse<any>) => {
                        setTimeout(() => {
                            AppService.router.navigate(['login']);
                        }, 2000);
                    }, (err: RestResponse<any>) => {
                        this._utilityService.setAlert(this.confirmRegistrationAlert, err.errors[0].errorCode + "<p><a class='pointer-cursor' href='#/login'>Login</a></p>", err.statusCode);
                    }
                );
            } else {
                AppService.router.navigate(['login']);
            }
        })
    }


    /*--------- NG On Destroy ---------*/
    ngOnDestroy(): void {
        this._appService.refreshEmitters(this.subscriptions);
    }
}
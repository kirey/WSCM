import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

import { AppService } from '../../kjcore/shared/services/app.service';
import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { Alert, RestResponse } from '../../kjcore/shared/models';

import { KJGriLandingService } from './kjgri.landing.service';

import { KJGriConstants } from "../kjgri.constants";

declare let jQuery: any;

@Component({
    moduleId: module.id,
    templateUrl: 'kjgri.landing.cmp.html'
})
export class KJGriLandingCmp implements OnInit {

    subscriptions: any;

    /*--------- Constructor --------*/
    constructor(private _utilityService: UtilityService,
        private _changeDetectionRef: ChangeDetectorRef,
        private _appService: AppService,
        private _landingService: KJGriLandingService,
        private _constants: KJGriConstants) { }

    /**
     * Loading all necessary stuff
     * @author Nikola Gavric
     */
    public loadData() {
        //Navigation color change upon scroll
        jQuery('.box-full_size').scroll(function (currentPos) {
            var navHeight = 20;
            if (jQuery('.box-full_size').scrollTop() > navHeight) {
                jQuery('nav').addClass('affix');
            } else {
                jQuery('nav').removeClass('affix');
            }
        });
        jQuery('.carousel').carousel({
            interval: 5000
        });
    }

    public scrollTo(elemName?: string) {
        var container = jQuery('.box-full_size'),
            scrollTo = jQuery('#' + elemName);

        // Or you can animate the scrolling:
        if (elemName) {
            container.animate({
                scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
            });
        } else {
            container.animate({
                scrollTop: container.offset().top
            })
        }
        return false;
    }

    /*--------- NG On Init ---------*/
    //@hasAny()
    ngOnInit() {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);

        //Setting initial submit value
        //Loading view data
        this.loadData();

        this._appService.languageChangeForComponent(this);
    }

    ngOnDestroy() { // On destroy
        this._appService.refreshEmitters(this.subscriptions);
    }
}
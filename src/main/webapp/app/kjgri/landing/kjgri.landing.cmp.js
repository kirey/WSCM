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
var app_service_1 = require('../../kjcore/shared/services/app.service');
var utility_service_1 = require('../../kjcore/shared/services/utility.service');
var kjgri_landing_service_1 = require('./kjgri.landing.service');
var kjgri_constants_1 = require("../kjgri.constants");
var KJGriLandingCmp = (function () {
    /*--------- Constructor --------*/
    function KJGriLandingCmp(_utilityService, _changeDetectionRef, _appService, _landingService, _constants) {
        this._utilityService = _utilityService;
        this._changeDetectionRef = _changeDetectionRef;
        this._appService = _appService;
        this._landingService = _landingService;
        this._constants = _constants;
    }
    /**
     * Loading all necessary stuff
     * @author Nikola Gavric
     */
    KJGriLandingCmp.prototype.loadData = function () {
        //Navigation color change upon scroll
        jQuery('.box-full_size').scroll(function (currentPos) {
            var navHeight = 20;
            if (jQuery('.box-full_size').scrollTop() > navHeight) {
                jQuery('nav').addClass('affix');
            }
            else {
                jQuery('nav').removeClass('affix');
            }
        });
        jQuery('.carousel').carousel({
            interval: 5000
        });
    };
    KJGriLandingCmp.prototype.scrollTo = function (elemName) {
        var container = jQuery('.box-full_size'), scrollTo = jQuery('#' + elemName);
        // Or you can animate the scrolling:
        if (elemName) {
            container.animate({
                scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
            });
        }
        else {
            container.animate({
                scrollTop: container.offset().top
            });
        }
        return false;
    };
    /*--------- NG On Init ---------*/
    //@hasAny()
    KJGriLandingCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this);
        //Setting initial submit value
        //Loading view data
        this.loadData();
        this._appService.languageChangeForComponent(this);
    };
    KJGriLandingCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    KJGriLandingCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'kjgri.landing.cmp.html'
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, core_1.ChangeDetectorRef, app_service_1.AppService, kjgri_landing_service_1.KJGriLandingService, kjgri_constants_1.KJGriConstants])
    ], KJGriLandingCmp);
    return KJGriLandingCmp;
}());
exports.KJGriLandingCmp = KJGriLandingCmp;
//# sourceMappingURL=kjgri.landing.cmp.js.map
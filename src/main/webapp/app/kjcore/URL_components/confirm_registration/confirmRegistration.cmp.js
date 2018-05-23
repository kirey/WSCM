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
var router_1 = require('@angular/router');
var confirmRegistration_service_1 = require('./confirmRegistration.service');
var app_service_1 = require('../../shared/services/app.service');
var utility_service_1 = require('../../shared/services/utility.service');
var models_1 = require('../../shared/models');
/**
 * Component for Confirm registration call
 * @author Mario Petrovic
 */
var ConfirmRegistrationCmp = (function () {
    /*--------- Constructor --------*/
    function ConfirmRegistrationCmp(_passwordChangeService, _appService, _activatedRoute, _utilityService) {
        this._passwordChangeService = _passwordChangeService;
        this._appService = _appService;
        this._activatedRoute = _activatedRoute;
        this._utilityService = _utilityService;
    }
    /*--------- App logic --------*/
    /*--------- NG On Init ---------*/
    ConfirmRegistrationCmp.prototype.ngOnInit = function () {
        var _this = this;
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', null, true);
        // Variable initialization
        this.subscriptions = {};
        this.confirmRegistrationAlert = new models_1.Alert(null, true);
        // Costruct methods
        this._activatedRoute.queryParams.subscribe(function (params) {
            if (params['mailHash']) {
                _this.subscriptions['confirmRegistration'] = _this._passwordChangeService.confirmRegistration(params['mailHash']).subscribe(function (res) {
                    setTimeout(function () {
                        app_service_1.AppService.router.navigate(['login']);
                    }, 2000);
                }, function (err) {
                    _this._utilityService.setAlert(_this.confirmRegistrationAlert, err.errors[0].errorCode + "<p><a class='pointer-cursor' href='#/login'>Login</a></p>", err.statusCode);
                });
            }
            else {
                app_service_1.AppService.router.navigate(['login']);
            }
        });
    };
    /*--------- NG On Destroy ---------*/
    ConfirmRegistrationCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscriptions);
    };
    ConfirmRegistrationCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'confirmRegistration.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [confirmRegistration_service_1.ConfirmRegistrationService, app_service_1.AppService, router_1.ActivatedRoute, utility_service_1.UtilityService])
    ], ConfirmRegistrationCmp);
    return ConfirmRegistrationCmp;
}());
exports.ConfirmRegistrationCmp = ConfirmRegistrationCmp;
//# sourceMappingURL=confirmRegistration.cmp.js.map
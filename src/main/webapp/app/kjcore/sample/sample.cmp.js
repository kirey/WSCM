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
var ng2_translate_1 = require('ng2-translate');
var sample_service_1 = require('./sample.service');
var utility_service_1 = require('../shared/services/utility.service');
var app_service_1 = require('../shared/services/app.service');
var models_1 = require("./../shared/models");
/*
Certain utility methods are located inside UtilityService. Additional utilities can be added if neccessery. These utilities will help the rest of developers to use them in different locations of app. Take for example method "copy()"

If you want to share some data in different components of the app, use AppService for that purpose, because it is a singleton in scope of app
UtilityService is a singleton in scope of each Component

*/
var SampleCmp = (function () {
    /*--------- Constructor ---------*/
    function SampleCmp(_utilityService, _sampleService, _appService, _translateService) {
        this._utilityService = _utilityService;
        this._sampleService = _sampleService;
        this._appService = _appService;
        this._translateService = _translateService;
    }
    /*--------- App logic ---------*/
    SampleCmp.prototype.loadSomething = function () {
        var _this = this;
        this.subscribers = this._sampleService.getSomethingRest().subscribe(function (res) {
            // Fill alert with success message
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            // Fill alert with error message
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode);
        });
    };
    /*--------- NG On Init ---------*/
    SampleCmp.prototype.ngOnInit = function () {
        // Initital method to be executed when page loads
        this._appService.pageLoaded('', this); // This method is mandatory for purpose of executing translation and setting initial states of certain variables
        // Variables initialization
        this.subscribers = {};
        this.componentAlert = new models_1.Alert(null, true);
    };
    // OnDestroy is mandatory for purpose of unsubscribing of subscribed HTTP calls located in this.subscribers variable
    SampleCmp.prototype.ngOnDestroy = function () {
        this._appService.refreshEmitters(this.subscribers);
    };
    SampleCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'sample.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, sample_service_1.SampleService, app_service_1.AppService, ng2_translate_1.TranslateService])
    ], SampleCmp);
    return SampleCmp;
}());
exports.SampleCmp = SampleCmp;
//# sourceMappingURL=sample.cmp.js.map
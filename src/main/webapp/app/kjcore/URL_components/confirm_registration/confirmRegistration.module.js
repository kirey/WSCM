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
var confirmRegistration_cmp_1 = require('./confirmRegistration.cmp');
var confirmRegistration_service_1 = require('./confirmRegistration.service');
var utility_module_1 = require('../../shared/modules/utility.module');
var confirmRegistration_routes_1 = require('./confirmRegistration.routes');
var ConfirmRegistrationModule = (function () {
    function ConfirmRegistrationModule() {
    }
    ConfirmRegistrationModule = __decorate([
        core_1.NgModule({
            imports: [
                confirmRegistration_routes_1.ROUTING,
                utility_module_1.UtilityModule,
            ],
            declarations: [
                confirmRegistration_cmp_1.ConfirmRegistrationCmp
            ],
            providers: [
                confirmRegistration_service_1.ConfirmRegistrationService,
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], ConfirmRegistrationModule);
    return ConfirmRegistrationModule;
}());
exports.ConfirmRegistrationModule = ConfirmRegistrationModule;
//# sourceMappingURL=confirmRegistration.module.js.map
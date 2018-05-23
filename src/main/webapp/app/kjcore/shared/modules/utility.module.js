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
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var utility_service_1 = require('../../shared/services/utility.service');
var pipes_module_1 = require('../modules/pipes.module');
var globalLoader_module_1 = require('../components/global_loader/globalLoader.module');
var phoneInput_module_1 = require('../components/phoneInput/phoneInput.module');
var equalValidator_directive_1 = require('../directives/equalValidator.directive');
var onlyNumber_directive_1 = require('../directives/onlyNumber.directive');
var onlyDecimal_directive_1 = require('../directives/onlyDecimal.directive');
var ifRole_directive_1 = require('../directives/ifRole.directive');
var ifBrowser_directive_1 = require('../directives/ifBrowser.directive');
var ifRoute_directive_1 = require('../directives/ifRoute.directive');
var ifRouteNot_directive_1 = require('../directives/ifRouteNot.directive');
var validationMessages_module_1 = require('../../shared/components/validationMessages/validationMessages.module');
var passwordStrength_cmp_1 = require('../components/passwordStrength/passwordStrength.cmp');
var UtilityModule = (function () {
    function UtilityModule() {
    }
    UtilityModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                pipes_module_1.PipesModule,
                globalLoader_module_1.GlobalLoaderModule,
                ng2_bootstrap_1.AlertModule.forRoot(),
                validationMessages_module_1.ValidationMessagesModule,
                phoneInput_module_1.PhoneInputModule
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                pipes_module_1.PipesModule,
                globalLoader_module_1.GlobalLoaderModule,
                ng2_bootstrap_1.AlertModule,
                equalValidator_directive_1.EqualValidator,
                onlyNumber_directive_1.OnlyNumber,
                onlyDecimal_directive_1.OnlyDecimal,
                validationMessages_module_1.ValidationMessagesModule,
                ifRole_directive_1.IfRoleDirective,
                ifBrowser_directive_1.IfBrowserDirective,
                ifRoute_directive_1.IfRouteDirective,
                ifRouteNot_directive_1.IfNoRouteDirective,
                phoneInput_module_1.PhoneInputModule,
                passwordStrength_cmp_1.PasswordStrength
            ],
            declarations: [
                equalValidator_directive_1.EqualValidator,
                onlyNumber_directive_1.OnlyNumber,
                onlyDecimal_directive_1.OnlyDecimal,
                ifRole_directive_1.IfRoleDirective,
                ifBrowser_directive_1.IfBrowserDirective,
                ifRoute_directive_1.IfRouteDirective,
                ifRouteNot_directive_1.IfNoRouteDirective,
                passwordStrength_cmp_1.PasswordStrength
            ],
            providers: [
                // Router,
                platform_browser_1.Title,
                utility_service_1.UtilityService,
                common_1.DatePipe
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], UtilityModule);
    return UtilityModule;
}());
exports.UtilityModule = UtilityModule;
//# sourceMappingURL=utility.module.js.map
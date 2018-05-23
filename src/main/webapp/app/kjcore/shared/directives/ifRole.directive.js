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
var app_service_1 = require('./../services/app.service');
var IfRoleDirective = (function () {
    function IfRoleDirective(templateRef, viewContainer, _appService) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this._appService = _appService;
    }
    IfRoleDirective.prototype.ngOnInit = function () {
        if (this.roleName.constructor === Array) {
            for (var _i = 0, _a = this.roleName; _i < _a.length; _i++) {
                var r = _a[_i];
                if (this._appService.userProfile.roles.hasOwnProperty(r) && this._appService.userProfile.roles[r]) {
                    this.render = true;
                    break;
                }
                else {
                    this.render = false;
                }
            }
        }
        else if (this.roleName.constructor === String) {
            if (this._appService.userProfile.roles.hasOwnProperty(String(this.roleName)) && this._appService.userProfile.roles[String(this.roleName)]) {
                this.render = true;
            }
            else {
                this.render = false;
            }
        }
        if (this.render) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }
    };
    __decorate([
        core_1.Input("ifRole"), 
        __metadata('design:type', Object)
    ], IfRoleDirective.prototype, "roleName", void 0);
    IfRoleDirective = __decorate([
        core_1.Directive({ selector: '[ifRole]' }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, app_service_1.AppService])
    ], IfRoleDirective);
    return IfRoleDirective;
}());
exports.IfRoleDirective = IfRoleDirective;
//# sourceMappingURL=ifRole.directive.js.map
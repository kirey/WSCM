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
var IfRouteDirective = (function () {
    function IfRouteDirective(templateRef, viewContainer, _appService) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this._appService = _appService;
    }
    IfRouteDirective.prototype.ngOnInit = function () {
        if (this.routeName.constructor === Array) {
            for (var _i = 0, _a = this.routeName; _i < _a.length; _i++) {
                var r = _a[_i];
                if (this._appService.getRouter().url == r) {
                    this.render = true;
                    break;
                }
                else {
                    this.render = false;
                }
            }
        }
        else if (this.routeName.constructor === String) {
            if (this._appService.getRouter().url == this.routeName) {
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
        core_1.Input("ifRoute"), 
        __metadata('design:type', Object)
    ], IfRouteDirective.prototype, "routeName", void 0);
    IfRouteDirective = __decorate([
        core_1.Directive({ selector: '[ifRoute]' }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, app_service_1.AppService])
    ], IfRouteDirective);
    return IfRouteDirective;
}());
exports.IfRouteDirective = IfRouteDirective;
//# sourceMappingURL=ifRoute.directive.js.map
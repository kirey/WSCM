import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppService } from './../services/app.service';

@Directive({ selector: '[ifRole]' })
export class IfRoleDirective {

    @Input("ifRole") roleName: string[] | string;

    render: boolean;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private _appService: AppService) {
    }

    ngOnInit() {
        if (this.roleName.constructor === Array) {
            for (let r of this.roleName) {
                if (this._appService.userProfile.roles.hasOwnProperty(r) && this._appService.userProfile.roles[r]) {
                    this.render = true;
                    break;
                } else {
                    this.render = false;
                }
            }
        } else if (this.roleName.constructor === String) {
            if (this._appService.userProfile.roles.hasOwnProperty(String(this.roleName)) && this._appService.userProfile.roles[String(this.roleName)]) {
                this.render = true;
            } else {
                this.render = false;
            }
        }

        if (this.render) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
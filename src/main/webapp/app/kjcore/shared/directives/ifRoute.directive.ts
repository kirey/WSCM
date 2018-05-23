import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppService } from './../services/app.service';

@Directive({ selector: '[ifRoute]' })
export class IfRouteDirective {

    @Input("ifRoute") routeName: string[] | string;

    render: boolean;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private _appService: AppService) {
    }

    ngOnInit() {
        if (this.routeName.constructor === Array) {
            for (let r of this.routeName) {
                if (this._appService.getRouter().url == r) {
                    this.render = true;
                    break;
                } else {
                    this.render = false;
                }
            }
        } else if (this.routeName.constructor === String) {
            if (this._appService.getRouter().url == this.routeName) {
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
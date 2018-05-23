import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppService } from './../services/app.service';

@Directive({ selector: '[ifBrowser]' })
export class IfBrowserDirective {

    @Input("ifBrowser") browsers: string[] | string;

    render: boolean;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private _appService: AppService) {
    }

    ngOnInit() {
        if (this.browsers.constructor === Array) {
            for (let i of this.browsers) {
                if (this._appService.browserUserAgent[i]) {
                    this.render = true;
                    break;
                } else {
                    this.render = false;
                }
            }
        } else if (this.browsers.constructor === String) {
            if (this._appService.browserUserAgent[String(this.browsers)]) {
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
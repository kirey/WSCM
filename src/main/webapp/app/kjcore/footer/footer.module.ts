import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { DropdownModule } from 'ng2-bootstrap';

import { FooterCmp } from './footer.cmp';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';

import { UtilityModule } from '../shared/modules/utility.module';

import { Constants } from '../constants';

@NgModule({
    imports: [
        UtilityModule,
        RouterModule,
        DropdownModule.forRoot(),
        // TranslateModule.forRoot({
        //     provide: TranslateLoader,
        //     useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'footer', ''),
        //     deps: [Http]
        // })
    ],
    exports: [FooterCmp],
    declarations: [
        FooterCmp
    ],
    providers: [
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                UtilityService: UtilityService) =>
                new HttpInterceptor(backend, defaultOptions, UtilityService),
            deps: [XHRBackend, RequestOptions, UtilityService]
        }
    ],
})
export class FooterModule { }
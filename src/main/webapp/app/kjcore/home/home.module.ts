import { NgModule } from '@angular/core';

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { HttpInterceptor } from '../shared/httpInterceptor';

import { UtilityService } from '../shared/services/utility.service';

import { HomeCmp } from './home.cmp';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { Constants } from '../constants';

import { UtilityModule } from '../shared/modules/utility.module';
import { ROUTING } from './home.routes';

@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'home', ''),
            deps: [Http]
        })
    ],
    declarations: [
        HomeCmp,
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

export class HomeModule { }

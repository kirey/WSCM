import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { UtilityModule } from '../shared/modules/utility.module';
import { ROUTING } from './generics.routes';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';

import { Constants } from '../constants';

import { DataTableModule, InputMaskModule, SharedModule, CalendarModule, CheckboxModule } from 'primeng/primeng';
import { ModalModule } from 'ng2-bootstrap';

import {GenericsCmp} from './generics.cmp';
import {GenericsService} from './generics.service';

@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        DataTableModule,
        CalendarModule,
        CheckboxModule,
        ModalModule.forRoot(),
        InputMaskModule,
        SharedModule,
        // This is for translation purpose
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'generics', ''),
            deps: [Http]
        })
    ],
    declarations: [
        GenericsCmp
    ],
    providers: [
        GenericsService,
         // Interceptor is mandatory for http calls
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                UtilityService: UtilityService) =>
                new HttpInterceptor(backend, defaultOptions, UtilityService),
            deps: [XHRBackend, RequestOptions, UtilityService]
        }],
})

export class GenericsModule { }

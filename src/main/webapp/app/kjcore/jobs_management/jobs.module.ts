import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { JobsComponent } from './jobs.cmp';
import { JobsService } from './jobs.service';
import { ROUTING } from './jobs.routes';

import { UtilityModule } from '../shared/modules/utility.module';


import { DataTableModule, SharedModule, ButtonModule, InputTextModule } from 'primeng/primeng';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';

import { Constants } from '../constants';

@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        DataTableModule,
        SharedModule,
        InputTextModule,
        ButtonModule,
        // This is for translation purpose
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'jobs', ''),
            deps: [Http]
        })
    ],
    declarations: [
        JobsComponent,
    ],
    providers: [
        JobsService,
        Constants,
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

export class JobsModule { }

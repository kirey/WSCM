import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { UtilityModule } from '../shared/modules/utility.module';

import { DataTableModule, DialogModule, SharedModule, ButtonModule, CalendarModule } from 'primeng/primeng';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { TooltipModule, ModalModule } from 'ng2-bootstrap';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';

import { Constants } from '../constants';

import { JobHistoryCmp } from './jobHistory.cmp';
import { JobHistoryService } from './jobHistory.service';
import { ROUTING } from './jobHistory.routes';

@NgModule({
    imports: [
        TooltipModule.forRoot(),
        ROUTING,
        UtilityModule,
        DataTableModule,
        SharedModule,
        ButtonModule,
        CalendarModule,
        ModalModule.forRoot(),
        // This is for translation purpose
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'jobHistory', ''),
            deps: [Http]
        })
    ],
    declarations: [
        JobHistoryCmp
    ],
    providers: [
        JobHistoryService,
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

export class JobHistoryModule { }

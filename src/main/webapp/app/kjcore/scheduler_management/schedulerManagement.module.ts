import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { SchedulerManagementCmp } from './schedulerManagement.cmp';
import { SchedulerManagementService } from './schedulerManagement.service';

import { ROUTING } from './schedulerManagement.routes';

import { UtilityModule } from '../shared/modules/utility.module';

import { DataTableModule, CalendarModule, SharedModule, ButtonModule, InputTextModule, RadioButtonModule } from 'primeng/primeng';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { TooltipModule, ModalModule } from 'ng2-bootstrap';

import { ValidationMessagesModule } from '../shared/components/validationMessages/validationMessages.module';

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
        CalendarModule,
        RadioButtonModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        ValidationMessagesModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'schedulerManagement', ''),
            deps: [Http]
        })
    ],
    declarations: [
        SchedulerManagementCmp,
    ],
    providers: [
        SchedulerManagementService,
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

export class SchedulerManagementModule { }

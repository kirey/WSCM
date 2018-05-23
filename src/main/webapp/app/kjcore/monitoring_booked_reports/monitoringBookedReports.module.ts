import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { ModalModule } from 'ng2-bootstrap';

import { MonitoringBookedReportsService } from './monitoringBookedReports.service';
import { MonitoringBookedReportsCmp } from './monitoringBookedReports.cmp';
import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';

import { UtilityModule } from '../shared/modules/utility.module';
import { ROUTING } from './monitoringBookedReports.routes';

import { LazyLoadDropdownModule } from '../shared/components/lazyLoadDropdown/lazyLoadDropdown.module';

import { DataTableModule, CalendarModule, DropdownModule } from 'primeng/primeng';
import { TooltipModule } from 'ng2-bootstrap';

import { Constants } from '../constants';

@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        ReactiveFormsModule,
        DataTableModule,
        CalendarModule,
        DropdownModule,
        LazyLoadDropdownModule,
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'monitoringBookedReports', ''),
            deps: [Http]
        })
    ],
    declarations: [
        MonitoringBookedReportsCmp
    ],
    providers: [
        MonitoringBookedReportsService,
        Constants,
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                UtilityService: UtilityService) =>
                new HttpInterceptor(backend, defaultOptions, UtilityService),
            deps: [XHRBackend, RequestOptions, UtilityService]
        },
    ]
})

export class MonitoringBookedReportsModule { }
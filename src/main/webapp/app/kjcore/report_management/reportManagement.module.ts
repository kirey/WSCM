import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { DataScrollerModule, GrowlModule, MessagesModule, SelectButtonModule, DropdownModule } from 'primeng/primeng';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { ModalModule } from 'ng2-bootstrap';
import { DataTableModule } from 'primeng/primeng';
import { CalendarModule } from '../shared/modules/calendar.module';

import { ReportManagementCmp } from './reportManagement.cmp';
import { ReportManagementService } from './reportManagement.service';

import { ValidationService } from '../shared/services/validation.service';
import { ControlMessageModule } from '../shared/modules/controlMessages.module';

import { ReportFilterPipe } from './pipes/reportFilter.pipe';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';

import { UtilityModule } from '../shared/modules/utility.module';
import { ROUTING } from './reportManagement.routes';

import { Constants } from '../constants';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CalendarModule,
        DataScrollerModule,
        GrowlModule,
        MessagesModule,
        ModalModule.forRoot(),
        ROUTING,
        UtilityModule,
        ControlMessageModule,
        DropdownModule,
        DataTableModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'reportManagement', ''),
            deps: [Http]
        })
    ],
    declarations: [
        ReportManagementCmp,
        ReportFilterPipe
    ],
    providers: [
        ReportManagementService,
        ValidationService,
        Validators,
        Constants,
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

export class ReportManagementModule { }

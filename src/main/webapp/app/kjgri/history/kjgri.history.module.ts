import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { DataTableModule, SharedModule, SliderModule, AccordionModule, CheckboxModule, CalendarModule, RadioButtonModule, ChartModule } from 'primeng/primeng';
import { ModalModule } from 'ng2-bootstrap';

import { LazyLoadDropdownModule } from '../../kjcore/shared/components/lazyLoadDropdown/lazyLoadDropdown.module';
import { ControlMessageModule } from '../../kjcore/shared/modules/controlMessages.module';

import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';
import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { ROUTING } from './kjgri.history.routes';
import { UtilityModule } from '../../kjcore/shared/modules/utility.module';

import { KJGriConstants } from '../kjgri.constants';

import { AdminRoleService } from '../../kjcore/admin/roles/adminRoles.service';

import { KJGriHistoryCmp } from './kjgri.history.cmp';
import { KJGriHistoryService } from './kjgri.history.service';

@NgModule({
    imports: [
        UtilityModule,
        ROUTING,
        LazyLoadDropdownModule,
        DataTableModule,
        SharedModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        ControlMessageModule,
        SliderModule,
        AccordionModule,
        CheckboxModule,
        CalendarModule,
        RadioButtonModule,
        ChartModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, KJGriConstants.TRANSLATION_URL_PREFIX + 'history', ''),
            deps: [Http]
        })
    ],
    declarations: [
        KJGriHistoryCmp
    ],
    providers: [
        KJGriHistoryService,
        KJGriConstants,
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                UtilityService: UtilityService) =>
                new HttpInterceptor(backend, defaultOptions, UtilityService),
            deps: [XHRBackend, RequestOptions, UtilityService]
        }
    ]
})
export class KJGriHistoryModule { }
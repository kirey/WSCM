import { NgModule } from '@angular/core';

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { ModalModule, TabsModule, TimepickerModule } from 'ng2-bootstrap';
import { DataTableModule, ChartModule, SliderModule, CalendarModule } from 'primeng/primeng';

import { LazyLoadDropdownModule } from '../../kjcore/shared/components/lazyLoadDropdown/lazyLoadDropdown.module';
import { HourDirective } from '../kjgri_shared/directives/hour.directive';

import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';

import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { KJGriHomeCmp } from './kjgri.home.cmp';
import { KJGriHomeService } from "./kjgri.home.service";

import { KJGriConstants } from '../kjgri.constants';

import { UtilityModule } from '../../kjcore/shared/modules/utility.module';
import { ROUTING } from './kjgri.home.routes';

/**
 * Module for home page
 * @author Mario Petrovic
 */
@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TimepickerModule.forRoot(),
        LazyLoadDropdownModule,
        CalendarModule,
        DataTableModule,
        ChartModule,
        SliderModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, KJGriConstants.TRANSLATION_URL_PREFIX + 'home', ''),
            deps: [Http]
        })
    ],
    declarations: [
        HourDirective,
        KJGriHomeCmp
    ],
    providers: [
        KJGriHomeService,
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
    ],
})

export class KJGriHomeModule { }

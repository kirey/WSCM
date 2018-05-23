import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { DataTableModule, CheckboxModule } from 'primeng/primeng';
import { ModalModule } from 'ng2-bootstrap';
import { TooltipModule } from 'ng2-bootstrap';

import { AdminRoutesCmp } from './adminRoutes.cmp';
import { AdminRoutesService } from './adminRoutes.service';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';

import { UtilityModule } from '../shared/modules/utility.module';
import { ROUTING } from './adminRoutes.routes';


import { Constants } from '../constants';

@NgModule({
    imports: [
        UtilityModule,
        DataTableModule,
        ModalModule.forRoot(),
        CheckboxModule,
        TooltipModule.forRoot(),
        ROUTING,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'adminRoutes', ''),
            deps: [Http]
        })
    ],
    declarations: [
        AdminRoutesCmp
    ],
    providers: [
        AdminRoutesService,
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
export class AdminRoutesModule { }

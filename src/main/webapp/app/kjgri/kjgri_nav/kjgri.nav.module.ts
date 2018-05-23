import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { DropdownModule } from 'ng2-bootstrap';

import { KJGriNavCmp } from './kjgri.nav.cmp';
import { KJGriNavService } from './kjgri.nav.service';

import { RoutesFilterPipe } from './pipes/routesFilter.pipe';

import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';
import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';

import { UtilityModule } from '../../kjcore/shared/modules/utility.module';

import { KJGriConstants } from '../kjgri.constants';

@NgModule({
    imports: [
        UtilityModule,
        RouterModule,
        DropdownModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, KJGriConstants.TRANSLATION_URL_PREFIX + 'navigation', ''),
            deps: [Http]
        })
    ],
    exports: [KJGriNavCmp],
    declarations: [
        KJGriNavCmp,
        RoutesFilterPipe
    ],
    providers: [
        KJGriNavService,
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
export class KJGriNavModule { }

import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
//import { CarouselModule } from 'ng2-bootstrap';

import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';
import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { ROUTING } from './kjgri.landing.routes';
import { UtilityModule } from '../../kjcore/shared/modules/utility.module';

import { KJGriConstants } from '../kjgri.constants';

import { AdminRoleService } from '../../kjcore/admin/roles/adminRoles.service';

import { KJGriLandingCmp } from './kjgri.landing.cmp';
import { KJGriLandingService } from './kjgri.landing.service';

@NgModule({
    imports: [
        UtilityModule,
        ROUTING,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, KJGriConstants.TRANSLATION_URL_PREFIX + 'landing', ''),
            deps: [Http]
        })
    ],
    declarations: [
        KJGriLandingCmp
    ],
    providers: [
        KJGriLandingService,
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
export class KJGriLandingModule { }
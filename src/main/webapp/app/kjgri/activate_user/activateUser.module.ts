import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { ActivateUserCmp } from './activateUser.cmp';
import { ActivateUserService } from './activateUser.service';

import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';
import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';

import { UtilityModule } from '../../kjcore/shared/modules/utility.module';
import { ROUTING } from './activateUser.routes';

import { KJGriConstants } from "./../kjgri.constants";

@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, KJGriConstants.TRANSLATION_URL_PREFIX_NO_AUTH + 'activateUser', ''),
            deps: [Http]
        })
    ],
    declarations: [
        ActivateUserCmp
    ],
    providers: [
        ActivateUserService,
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

export class ActivateUserModule { }

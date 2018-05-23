import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { ControlMessageModule } from '../../kjcore/shared/modules/controlMessages.module';

import { RegistrationCmp } from './kjgri.registration.cmp';
import { RegistrationService } from './kjgri.registration.service';

import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';
import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { UtilityModule } from '../../kjcore/shared/modules/utility.module';
import { ROUTING } from './kjgri.registration.routes';

import { KJGriConstants } from "./../kjgri.constants";

@NgModule({
    imports: [
        UtilityModule,
        ROUTING,
        ReactiveFormsModule,
        ControlMessageModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, KJGriConstants.TRANSLATION_URL_PREFIX_NO_AUTH + 'registration', ''),
            deps: [Http]
        })
    ],
    declarations: [
        RegistrationCmp
    ],
    providers: [
        RegistrationService,
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
export class RegistrationModule { }

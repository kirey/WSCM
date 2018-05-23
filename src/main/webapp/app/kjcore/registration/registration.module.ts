import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { ControlMessageModule } from '../shared/modules/controlMessages.module';

import { RegistrationCmp } from './registration.cmp';
import { RegistrationService } from './registration.service';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';

import { UtilityModule } from '../shared/modules/utility.module';
import { ROUTING } from './registration.routes';

import { Constants } from "./../constants";

@NgModule({
    imports: [
        UtilityModule,
        ROUTING,
        ReactiveFormsModule,
        ControlMessageModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX_NO_AUTH + 'registration', ''),
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

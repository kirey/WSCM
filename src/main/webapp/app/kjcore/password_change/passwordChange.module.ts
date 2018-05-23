import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { PasswordChangeCmp } from './passwordChange.cmp';
import { PasswordChangeService } from './passwordChange.service';

import { ControlMessageModule } from '../shared/modules/controlMessages.module';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';

import { UtilityModule } from '../shared/modules/utility.module';
import { ROUTING } from './passwordChange.routes';

import { Constants } from "./../constants";

@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX_NO_AUTH + 'passwordChange', ''),
            deps: [Http]
        })
    ],
    declarations: [
        PasswordChangeCmp
    ],
    providers: [
        PasswordChangeService,
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

export class PasswordChangeModule { }

import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { LoginService } from './login.service';

import { LoginCmp } from './login.cmp';

import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';

import { UtilityModule } from '../../kjcore/shared/modules/utility.module';
import { ROUTING } from './login.routes';

import { Constants } from "../constants";

@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX_NO_AUTH + 'login', ''),
            deps: [Http]
        })
    ],
    declarations: [
        LoginCmp
    ],
    providers: [
        LoginService,
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
    ]
})
export class LoginModule { }

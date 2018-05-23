import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { PasswordChangeCmp } from './kjgri.passwordChange.cmp';
import { PasswordChangeService } from './kjgri.passwordChange.service';
import { ROUTING } from './kjgri.passwordChange.routes';
import { KJGriConstants } from '../kjgri.constants';
import { UtilityModule } from '../../kjcore/shared/modules/utility.module';
import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';
import { UtilityService } from '../../kjcore/shared/services/utility.service';

@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, KJGriConstants.TRANSLATION_URL_PREFIX_NO_AUTH + 'passwordChange', ''),
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

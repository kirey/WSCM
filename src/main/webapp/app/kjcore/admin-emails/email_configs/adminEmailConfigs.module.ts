import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTableModule, DataGridModule, InputTextModule, ButtonModule, MessagesModule } from 'primeng/primeng';
import { ModalModule, TooltipModule } from 'ng2-bootstrap';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { ValidationMessagesModule } from '../../shared/components/validationMessages/validationMessages.module';
import { ControlMessageModule } from '../../shared/modules/controlMessages.module';
import { UtilityModule } from '../../shared/modules/utility.module';

import { AdminEmailConfigsService } from './adminEmailConfigs.service';
import { UtilityService } from '../../shared/services/utility.service';
import { ValidationService } from '../../shared/services/validation.service';

import { AdminEmailConfigsCmp } from './adminEmailConfigs.cmp';

import { HttpInterceptor } from '../../shared/httpInterceptor';

import { ROUTING } from './adminEmailConfigs.routes';

import { Constants } from '../../constants';


@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
        InputTextModule,
        ButtonModule,
        MessagesModule,
        DataGridModule,
        DataTableModule,
        ModalModule.forRoot(),
        FormsModule,
        ControlMessageModule,
        ReactiveFormsModule,
        ValidationMessagesModule,
        TooltipModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'emailConfigs', ''),
            deps: [Http]
        })
    ],
    declarations: [
        AdminEmailConfigsCmp
    ],
    providers: [AdminEmailConfigsService,
        Constants,
        ValidationService,
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                UtilityService: UtilityService) =>
                new HttpInterceptor(backend, defaultOptions, UtilityService),
            deps: [XHRBackend, RequestOptions, UtilityService]
        }],
})
export class AdminEmailConfigsModule { }
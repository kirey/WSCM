import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule, ModalModule } from 'ng2-bootstrap';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { DataTableModule, DataGridModule, InputTextModule, DialogModule, PanelModule, PaginatorModule } from 'primeng/primeng';

import { ControlMessageModule } from '../../shared/modules/controlMessages.module';
import { UtilityModule } from '../../shared/modules/utility.module';
import { ValidationMessagesModule } from '../../shared/components/validationMessages/validationMessages.module';

import { UtilityService } from '../../shared/services/utility.service';
import { AdminEmailTemplateService } from './adminEmailTemplate.service';

import { AdminEmailTemplateCmp } from './adminEmailTemplate.cmp';

import { HttpInterceptor } from '../../shared/httpInterceptor';

import { ROUTING } from './adminEmailTemplate.routes';

import { Constants } from '../../constants';


@NgModule({
    imports: [
        TooltipModule.forRoot(),
        UtilityModule,
        ROUTING,
        DataTableModule,
        InputTextModule,
        DialogModule,
        DataGridModule,
        PanelModule,
        PaginatorModule,
        ModalModule.forRoot(),
        ValidationMessagesModule,
        ControlMessageModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'emailTemplates', ''),
            deps: [Http]
        })
    ],
    declarations: [
        AdminEmailTemplateCmp
    ],
    providers: [
        Constants,
        AdminEmailTemplateService,
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
export class AdminEmailTemplateModule { }
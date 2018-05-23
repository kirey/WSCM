import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { CheckboxModule } from 'primeng/primeng';
import { ColorPickerModule } from 'angular2-color-picker';

import { DataTableModule } from 'primeng/primeng';
import { TabsModule, ModalModule, TooltipModule } from 'ng2-bootstrap';

import { CompanyManagementCmp } from './companyManagement.cmp';
import { CompanyManagementService } from './companyManagement.service';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';
import { ControlMessageModule } from '../shared/modules/controlMessages.module';

import { UtilityModule } from '../shared/modules/utility.module';

import { ROUTING } from './companyManagement.routes';

import { Constants } from '../constants';

@NgModule({
    imports: [
        UtilityModule,
        DataTableModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        ROUTING,
        CheckboxModule,
        ReactiveFormsModule,
        ControlMessageModule,
        ColorPickerModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'companyManagement', ''),
            deps: [Http]
        })
    ],
    declarations: [
        CompanyManagementCmp,
    ],
    providers: [
        CompanyManagementService,
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
export class CompanyManagementModule { }

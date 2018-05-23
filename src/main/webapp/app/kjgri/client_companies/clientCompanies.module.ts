import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { CheckboxModule } from 'primeng/primeng';
import { ColorPickerModule } from 'angular2-color-picker';
import { AccordionModule } from 'ng2-bootstrap';

import { DataTableModule } from 'primeng/primeng';
import { ModalModule, TooltipModule } from 'ng2-bootstrap';

import { RadioButtonModule } from 'primeng/primeng';

import { ClientCompaniesCmp } from './clientCompanies.cmp';
import { ClientCompaniesService } from './clientCompanies.service';

import { CompanyManagementService } from "./../../kjcore/company_management/companyManagement.service";

import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';
import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { ControlMessageModule } from '../../kjcore/shared/modules/controlMessages.module';

import { UtilityModule } from '../../kjcore/shared/modules/utility.module';

import { ROUTING } from './clientCompanies.routes';

import { KJGriConstants } from '../kjgri.constants';

@NgModule({
    imports: [
        UtilityModule,
        DataTableModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        ROUTING,
        CheckboxModule,
        ReactiveFormsModule,
        ControlMessageModule,
        ColorPickerModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, KJGriConstants.TRANSLATION_URL_PREFIX + 'clientCompanies', ''),
            deps: [Http]
        })
    ],
    declarations: [
        ClientCompaniesCmp,
    ],
    providers: [
        ClientCompaniesService,
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
export class ClientCompaniesModule { }

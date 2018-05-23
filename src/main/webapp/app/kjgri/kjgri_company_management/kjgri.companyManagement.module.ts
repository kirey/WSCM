import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { CheckboxModule, CalendarModule, DataTableModule, RadioButtonModule } from 'primeng/primeng';
import { ColorPickerModule } from 'angular2-color-picker';
import { AccordionModule } from 'ng2-bootstrap';

import { TabsModule, ModalModule, TooltipModule } from 'ng2-bootstrap';

import { KJGriCompanyManagementCmp } from './kjgri.companyManagement.cmp';
import { KJGriCompanyManagementService } from './kjgri.companyManagement.service';

import { CompanyManagementService } from "./../../kjcore/company_management/companyManagement.service";

import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';
import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { ControlMessageModule } from '../../kjcore/shared/modules/controlMessages.module';
import { LazyLoadDropdownModule } from '../../kjcore/shared/components/lazyLoadDropdown/lazyLoadDropdown.module';

import { UtilityModule } from '../../kjcore/shared/modules/utility.module';

import { ROUTING } from './kjgri.companyManagement.routes';

import { KJGriConstants } from '../kjgri.constants';

@NgModule({
    imports: [
        UtilityModule,
        DataTableModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        AccordionModule.forRoot(),
        RadioButtonModule,
        CalendarModule,
        ROUTING,
        CheckboxModule,
        ReactiveFormsModule,
        ControlMessageModule,
        ColorPickerModule,
        LazyLoadDropdownModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, KJGriConstants.TRANSLATION_URL_PREFIX + 'companyManagement', ''),
            deps: [Http]
        })
    ],
    declarations: [
        KJGriCompanyManagementCmp,
    ],
    providers: [
        KJGriCompanyManagementService,
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
export class KJGriCompanyManagementModule { }

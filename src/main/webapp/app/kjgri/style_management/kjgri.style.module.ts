import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { DataTableModule, SharedModule, SliderModule, AccordionModule, CheckboxModule, DropdownModule } from 'primeng/primeng';
import { ModalModule, TabsModule } from 'ng2-bootstrap';
import { ColorPickerModule } from 'angular2-color-picker';

import { LazyLoadDropdownModule } from '../../kjcore/shared/components/lazyLoadDropdown/lazyLoadDropdown.module';
import { ControlMessageModule } from '../../kjcore/shared/modules/controlMessages.module';

import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';
import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { ROUTING } from './kjgri.style.routes';
import { UtilityModule } from '../../kjcore/shared/modules/utility.module';

import { KJGriConstants } from '../kjgri.constants';

import { AdminRoleService } from '../../kjcore/admin/roles/adminRoles.service';

import { StyleManagementCmp } from './kjgri.style.cmp';
import { StyleManagementService } from './kjgri.style.service';

@NgModule({
    imports: [
        UtilityModule,
        ROUTING,
        LazyLoadDropdownModule,
        DataTableModule,
        SharedModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        ReactiveFormsModule,
        ControlMessageModule,
        SliderModule,
        AccordionModule,
        CheckboxModule,
        ColorPickerModule,
        DropdownModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, KJGriConstants.TRANSLATION_URL_PREFIX + 'styleManagement', ''),
            deps: [Http]
        })
    ],
    declarations: [
        StyleManagementCmp
    ],
    providers: [
        StyleManagementService,
        KJGriConstants,
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
export class StyleManagementModule { }
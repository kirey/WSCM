import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { DataTableModule, SharedModule, SliderModule, AccordionModule, CheckboxModule, DropdownModule } from 'primeng/primeng';
import { ModalModule } from 'ng2-bootstrap';
import { ColorPickerModule } from 'angular2-color-picker';

import { LazyLoadDropdownModule } from '../../kjcore/shared/components/lazyLoadDropdown/lazyLoadDropdown.module';
import { ControlMessageModule } from '../../kjcore/shared/modules/controlMessages.module';

import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';
import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { ROUTING } from './kjgri.package.routes';
import { UtilityModule } from '../../kjcore/shared/modules/utility.module';

import { KJGriConstants } from '../kjgri.constants';

import { AdminRoleService } from '../../kjcore/admin/roles/adminRoles.service';

import { PackageManagementCmp } from './kjgri.package.cmp';
import { PackageManagementService } from './kjgri.package.service';

@NgModule({
    imports: [
        UtilityModule,
        ROUTING,
        LazyLoadDropdownModule,
        DataTableModule,
        SharedModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        ControlMessageModule,
        AccordionModule,
        DropdownModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, KJGriConstants.TRANSLATION_URL_PREFIX + 'packageManagement', ''),
            deps: [Http]
        })
    ],
    declarations: [
        PackageManagementCmp
    ],
    providers: [
        PackageManagementService,
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
export class PackageManagementModule { }
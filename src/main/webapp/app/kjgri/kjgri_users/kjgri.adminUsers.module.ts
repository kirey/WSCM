import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TooltipModule, ModalModule } from 'ng2-bootstrap';
import { DataTableModule, MultiSelectModule, CalendarModule, CheckboxModule, RadioButtonModule, DropdownModule } from 'primeng/primeng';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';
import { UtilityService } from '../../kjcore/shared/services/utility.service';
import { AppService } from '../../kjcore/shared/services/app.service';

import { ROUTING } from './kjgri.adminUsers.routes';
import { UtilityModule } from '../../kjcore/shared/modules/utility.module';
import { PipesModule } from '../../kjcore/shared/modules/pipes.module';
import { ConvertTimeoutPipe } from '../../kjcore/shared/pipes/convertTimeout.pipe';
import { ControlMessageModule } from '../../kjcore/shared/modules/controlMessages.module';

import { KJGriAdminUsersCmp } from './kjgri.adminUsers.cmp';
import { KJGriAdminUserService } from './kjgri.adminUsers.service';
import { CompanyManagementService } from '../../kjcore/company_management/companyManagement.service';

import { KJGriConstants } from '../kjgri.constants';
import { LazyLoadDropdownModule } from '../../kjcore/shared/components/lazyLoadDropdown/lazyLoadDropdown.module';

import { AdminRoleService } from './../../kjcore/admin/roles/adminRoles.service';

@NgModule({
    imports: [
        TooltipModule.forRoot(),
        UtilityModule,
        ROUTING,
        DataTableModule,
        MultiSelectModule,
        ReactiveFormsModule,
        CalendarModule,
        PipesModule,
        CheckboxModule,
        RadioButtonModule,
        DropdownModule,
        ModalModule.forRoot(),
        ControlMessageModule,
        LazyLoadDropdownModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, KJGriConstants.TRANSLATION_URL_PREFIX + 'adminUsers', ''),
            deps: [Http]
        })
    ],
    declarations: [
        KJGriAdminUsersCmp
    ],
    providers: [
        KJGriAdminUserService,
        AdminRoleService,
        CompanyManagementService,
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
export class KJGriAdminUsersModule { }
import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TooltipModule, ModalModule } from 'ng2-bootstrap';
import { DataTableModule, MultiSelectModule, CalendarModule, CheckboxModule, RadioButtonModule, DropdownModule } from 'primeng/primeng';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { HttpInterceptor } from '../../shared/httpInterceptor';
import { UtilityService } from '../../shared/services/utility.service';
import { AppService } from '../../shared/services/app.service';

import { ROUTING } from './adminUsers.routes';
import { UtilityModule } from '../../shared/modules/utility.module';
import { PipesModule } from '../../shared/modules/pipes.module';
import { ConvertTimeoutPipe } from '../../shared/pipes/convertTimeout.pipe';
import { ControlMessageModule } from '../../shared/modules/controlMessages.module';

import { AdminUsersCmp } from './adminUsers.cmp';
import { AdminUserService } from './adminUsers.service';
import { CompanyManagementService } from '../../company_management/companyManagement.service';

import { Constants } from '../../constants';


import { AdminRoleService } from './../roles/adminRoles.service';

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
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'adminUsers', ''),
            deps: [Http]
        })
    ],
    declarations: [
        AdminUsersCmp
    ],
    providers: [
        AdminUserService,
        AdminRoleService,
        CompanyManagementService,
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
export class AdminUsersModule { }
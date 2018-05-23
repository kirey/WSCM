import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TooltipModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { HttpInterceptor } from '../../shared/httpInterceptor';
import { UtilityService } from '../../shared/services/utility.service';
import { AppService } from '../../shared/services/app.service';

import { ROUTING } from './adminRoles.routes';
import { UtilityModule } from '../../shared/modules/utility.module';
import { PipesModule } from '../../shared/modules/pipes.module';
import { ControlMessageModule } from '../../shared/modules/controlMessages.module';

import { AdminRolesCmp } from './adminRoles.cmp';
import { AdminRoleService } from './adminRoles.service';

import { Constants } from '../../constants';

import { DataTableModule } from 'primeng/primeng';


@NgModule({
    imports: [
        TooltipModule.forRoot(),
        UtilityModule,
        ROUTING,
        DataTableModule,
        ReactiveFormsModule,
        PipesModule,
        ModalModule.forRoot(),
        ControlMessageModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'adminRoles', ''),
            deps: [Http]
        })
    ],
    declarations: [
        AdminRolesCmp
    ],
    providers: [
        AdminRoleService,
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
export class AdminRolesModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { Http, XHRBackend, RequestOptions } from '@angular/http';

// Custom Components
import { KJGriAppCmp } from './kjgri.app.cmp'; // Main cmp
import { KJGriNavModule } from './kjgri/kjgri_nav/kjgri.nav.module';
import { FooterModule } from './kjcore/footer/footer.module';

import { UtilityModule } from './kjcore/shared/modules/utility.module';

import { AuthService } from './kjcore/shared/services/auth.service';

import { AppService } from './kjcore/shared/services/app.service';
import { AppDataService } from './kjcore/shared/services/appData.service';
import { UtilityService } from './kjcore/shared/services/utility.service';
import { ControlPanelSharedService } from './kjgri/kjgri_shared/kjgri.control_panel.service';
import { ControlPanelService } from './kjgri/control_panel/control_panel.service';

import { HttpInterceptor } from './kjcore/shared/httpInterceptor';

import { AuthGuard } from './kjcore/auth.guard';
import { LoginAuthGuard } from './kjcore/login/login.guard';
import { KJGriHomeAuthGuard } from './kjgri/kjgri_home/kjgri.home.guard';

import { KJGriConstants } from "./kjgri/kjgri.constants";

import { ROUTING } from './kjgri/app.routes';

@NgModule({
    imports: [
        BrowserModule,
        KJGriNavModule,
        ROUTING,
        UtilityModule,
        FooterModule,
    ],
    declarations: [
        KJGriAppCmp
    ],
    bootstrap: [KJGriAppCmp],
    providers: [
        AuthGuard,
        LoginAuthGuard,
        KJGriHomeAuthGuard,
        AppService,
        AuthService,
        AppDataService,
        KJGriConstants,
        ControlPanelSharedService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
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

export class KJGriAppModule { }
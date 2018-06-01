import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { Http, XHRBackend, RequestOptions } from '@angular/http';

// Custom Components
import { KJCoreAppCmp } from './kjcore.app.cmp'; // Main cmp
import { NavModule } from './kjcore/nav/nav.module';
import { FooterModule } from './kjcore/footer/footer.module';


import { UtilityModule } from './kjcore/shared/modules/utility.module';

import { AuthService } from './kjcore/shared/services/auth.service';

import { AppService } from './kjcore/shared/services/app.service';
import { AppDataService } from './kjcore/shared/services/appData.service';
import { UtilityService } from './kjcore/shared/services/utility.service';

import { HttpInterceptor } from './kjcore/shared/httpInterceptor';

import { AuthGuard } from './kjcore/auth.guard';
import { LoginAuthGuard } from './kjcore/login/login.guard';
import { HomeAuthGuard } from './kjcore/home/home.guard';

import { ROUTING } from './kjcore/app.routes';

import { Constants } from "./kjcore/constants";

@NgModule({
    imports: [
        BrowserModule,
        NavModule,
        ROUTING,
        UtilityModule,
        FooterModule
    ],
    declarations: [
        KJCoreAppCmp
    ],
    bootstrap: [KJCoreAppCmp],
    providers: [
        AuthGuard,
        LoginAuthGuard,
        HomeAuthGuard,
        AppService,
        AuthService,
        AppDataService,
        Constants,
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

export class AppModule { }
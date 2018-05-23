import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { TabsModule } from 'ng2-bootstrap';

import { UserPanelCmp } from './userPanel.cmp';
import { UserPanelService } from './userPanel.service';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';

import { UtilityModule } from '../shared/modules/utility.module';
import { ROUTING } from './userPanel.routes';

import { Constants } from '../constants';

@NgModule({
    imports: [
        UtilityModule,
        ROUTING,
        TabsModule.forRoot(),
        // This is for translation purpose
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'userPanel', ''),
            deps: [Http]
        })
    ],
    declarations: [
        UserPanelCmp
    ],
    providers: [
        UserPanelService,

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
export class UserPanelModule { }

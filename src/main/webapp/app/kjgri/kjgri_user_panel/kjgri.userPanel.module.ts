import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { TabsModule } from 'ng2-bootstrap';

import { UserPanelCmp } from './kjgri.userPanel.cmp';
import { UserPanelService } from './kjgri.userPanel.service';

import { HttpInterceptor } from '../../kjcore/shared/httpInterceptor';
import { UtilityService } from '../../kjcore/shared/services/utility.service';

import { UtilityModule } from '../../kjcore/shared/modules/utility.module';
import { ROUTING } from './kjgri.userPanel.routes';

import { KJGriConstants } from '../kjgri.constants';

@NgModule({
    imports: [
        UtilityModule,
        ROUTING,
        TabsModule.forRoot(),
        // This is for translation purpose
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, KJGriConstants.TRANSLATION_URL_PREFIX + 'userPanel', ''),
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

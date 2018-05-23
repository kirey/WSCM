import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { CheckboxModule } from 'primeng/primeng';
import { ColorPickerModule } from 'angular2-color-picker';

import { TabsModule } from 'ng2-bootstrap';

import { DataTableModule } from 'primeng/primeng';

import { CompanyPanelCmp } from './companyPanel.cmp';
import { CompanyPanelService } from './companyPanel.service';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';
import { ControlMessageModule } from '../shared/modules/controlMessages.module';

import { UtilityModule } from '../shared/modules/utility.module';

import { ROUTING } from './companyPanel.routes';

import { Constants } from '../constants';

@NgModule({
    imports: [
        UtilityModule,
        DataTableModule,
        TabsModule.forRoot(),
        ReactiveFormsModule,
        ControlMessageModule,
        ColorPickerModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'companyPanel', ''),
            deps: [Http]
        }),
        ROUTING
    ],
    declarations: [
        CompanyPanelCmp,
    ],
    providers: [
        CompanyPanelService,
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
export class CompanyPanelModule { }

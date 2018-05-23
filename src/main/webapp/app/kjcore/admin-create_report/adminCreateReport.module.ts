import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { DragulaModule, DragulaService } from 'ng2-dragula/ng2-dragula';
import { TooltipModule } from 'ng2-bootstrap';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { DropdownModule, CheckboxModule, RadioButtonModule } from 'primeng/primeng'

import { AdminCreateReportCmp } from '../admin-create_report/adminCreateReport.cmp';
import { AdminCreateReportService } from '../admin-create_report/adminCreateReport.service';

import { FileExtensionTrimmer } from '../shared/pipes/fileExtensionTrimmer.pipe';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';
import { AppService } from '../shared/services/app.service';

import { ROUTING } from './adminCreateReport.routes';
import { UtilityModule } from '../shared/modules/utility.module';

import { Constants } from '../constants';

@NgModule({
    imports: [
        TooltipModule.forRoot(),
        UtilityModule,
        ROUTING,
        DragulaModule,
        DropdownModule,
        CheckboxModule,
        RadioButtonModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'adminCreateReport', ''),
          deps: [Http]
        })
    ],
    declarations: [
        AdminCreateReportCmp,
        FileExtensionTrimmer
    ],
    providers: [
        DragulaService,
        AdminCreateReportService,
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
export class AdminCreateReportModule { }
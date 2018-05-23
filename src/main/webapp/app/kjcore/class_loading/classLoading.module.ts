import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { DataTableModule, CheckboxModule } from 'primeng/primeng';
import { ModalModule } from 'ng2-bootstrap';
import { TooltipModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';

import { ClassLoadingCmp } from './classLoading.cmp';
import { CategoriesCmp } from './categories/categories.cmp';
import { CategoryService } from './categories/categories.service';
import { ClassLoadingService } from './classLoading.service';
import { FileUploadValidatorModule } from '../shared/modules/fileUploadValidator.module';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';

import { UtilityModule } from '../shared/modules/utility.module';
import { ROUTING } from './classLoading.routes';
import { ControlMessageModule } from '../shared/modules/controlMessages.module';

import { Constants } from '../constants';

@NgModule({
    imports: [
        DataTableModule,
        CheckboxModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        TabsModule.forRoot(),
        UtilityModule,
        ROUTING,
        ControlMessageModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'classLoading', ''),
            deps: [Http]
        }),
        FileUploadValidatorModule
    ],
    declarations: [
        ClassLoadingCmp,
        CategoriesCmp
    ],
    providers: [
        ClassLoadingService,
        CategoryService,
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
export class ClassLoadingModule { }
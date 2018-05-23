import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { DataTableModule, CheckboxModule } from 'primeng/primeng';
import { ModalModule } from 'ng2-bootstrap';
import { TooltipModule } from 'ng2-bootstrap';

import { AdminTranslationCmp } from './adminTranslation.cmp';
import { AdminTranslationService } from './adminTranslation.service';

import { FileUploadValidatorModule } from '../shared/modules/fileUploadValidator.module';
import { PipesModule } from '../shared/modules/pipes.module';

import { HttpInterceptor } from '../shared/httpInterceptor';
import { UtilityService } from '../shared/services/utility.service';

import { UtilityModule } from '../shared/modules/utility.module';
import { ROUTING } from './adminTranslation.routes';

import { LazyLoadDropdownModule } from '../shared/components/lazyLoadDropdown/lazyLoadDropdown.module';

import { Constants } from '../constants';

@NgModule({
    imports: [
        UtilityModule,
        DataTableModule,
        CheckboxModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        ROUTING,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, Constants.TRANSLATION_URL_PREFIX + 'adminTranslation', ''),
            deps: [Http]
        }),
        FileUploadValidatorModule,
        PipesModule,
        LazyLoadDropdownModule
    ],
    declarations: [
        AdminTranslationCmp
    ],
    providers: [
        AdminTranslationService,
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
export class AdminTranslationModule { }

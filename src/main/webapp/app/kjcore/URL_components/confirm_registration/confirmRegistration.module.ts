import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { ConfirmRegistrationCmp } from './confirmRegistration.cmp';
import { ConfirmRegistrationService } from './confirmRegistration.service';

import { UtilityService } from '../../shared/services/utility.service';
import { AppService } from '../../shared/services/app.service';

import { UtilityModule } from '../../shared/modules/utility.module';
import { ROUTING } from './confirmRegistration.routes';

@NgModule({
    imports: [
        ROUTING,
        UtilityModule,
    ],
    declarations: [
        ConfirmRegistrationCmp
    ],
    providers: [
        ConfirmRegistrationService,
    ],
})

export class ConfirmRegistrationModule { }

import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlertModule } from 'ng2-bootstrap';

import { UtilityService } from '../../shared/services/utility.service';
import { PipesModule } from '../modules/pipes.module';

import { GlobalLoaderModule } from '../components/global_loader/globalLoader.module';
import { PhoneInputModule } from '../components/phoneInput/phoneInput.module';

import { EqualValidator } from '../directives/equalValidator.directive';
import { OnlyNumber } from '../directives/onlyNumber.directive';
import { OnlyDecimal } from '../directives/onlyDecimal.directive';
import { IfRoleDirective } from '../directives/ifRole.directive';
import { IfBrowserDirective } from '../directives/ifBrowser.directive';
import { IfRouteDirective } from '../directives/ifRoute.directive';
import { IfNoRouteDirective } from '../directives/ifRouteNot.directive';

import { ValidationMessagesModule } from '../../shared/components/validationMessages/validationMessages.module';
import { PasswordStrength } from '../components/passwordStrength/passwordStrength.cmp';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        GlobalLoaderModule,
        AlertModule.forRoot(),
        ValidationMessagesModule,
        PhoneInputModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        PipesModule,
        GlobalLoaderModule,
        AlertModule,
        EqualValidator,
        OnlyNumber,
        OnlyDecimal,
        ValidationMessagesModule,
        IfRoleDirective,
        IfBrowserDirective,
        IfRouteDirective,
        IfNoRouteDirective,
        PhoneInputModule,
        PasswordStrength
    ],
    declarations: [
        EqualValidator,
        OnlyNumber,
        OnlyDecimal,
        IfRoleDirective,
        IfBrowserDirective,
        IfRouteDirective,
        IfNoRouteDirective,
        PasswordStrength
    ],
    providers: [
        // Router,
        Title,
        UtilityService,
        DatePipe
    ]
})

export class UtilityModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';

import { TextMaskModule } from 'angular2-text-mask';

import { PhoneInputCmp } from './phoneInput.cmp';
import { PhoneInputService } from './services/phoneInput.service';

import { PipesModule } from './../../modules/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        TextMaskModule
    ],
    exports: [
        PhoneInputCmp
    ],
    declarations: [
        PhoneInputCmp
    ],
    providers: [
        PhoneInputService
    ],
})
export class PhoneInputModule { }
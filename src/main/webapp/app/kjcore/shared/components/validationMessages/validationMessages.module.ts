import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ValidationMessagesCmp } from './validationMessages.cmp';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ValidationMessagesCmp,
    ],
    declarations: [
        ValidationMessagesCmp
    ],
    providers: [],
})
export class ValidationMessagesModule { }

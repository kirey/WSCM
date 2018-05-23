import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import { ControlMessages } from '../controlMessages.cmp';

import { TranslateModule } from 'ng2-translate';

@NgModule({
    imports: [CommonModule, TranslateModule],
    declarations: [ControlMessages],
    exports: [ControlMessages],

})
export class ControlMessageModule { }
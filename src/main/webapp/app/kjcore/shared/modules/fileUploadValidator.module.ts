import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FileUploadValidator } from '../fileUploadValidator.cmp';

@NgModule({
    imports: [CommonModule],
    exports: [FileUploadValidator],
    declarations: [FileUploadValidator],
    providers: [FileUploadValidator]
})

export class FileUploadValidatorModule { }
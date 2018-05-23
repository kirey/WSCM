import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';

import { GlobalLoaderCmp } from './globalLoader.cmp';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        GlobalLoaderCmp
    ],
    declarations: [
        GlobalLoaderCmp
    ],
    providers: [],
})
export class GlobalLoaderModule { }
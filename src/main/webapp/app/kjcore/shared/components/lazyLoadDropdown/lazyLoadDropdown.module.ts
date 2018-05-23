import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { DataScrollerModule } from 'primeng/primeng';

import { PipesModule } from '../.././modules/pipes.module';

import { LazyLoadDropdownCmp } from "./lazyLoadDropdown.cmp";

import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        DataScrollerModule,
        PipesModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        LazyLoadDropdownCmp
    ],
    exports: [
        DataScrollerModule,
        PipesModule,
        LazyLoadDropdownCmp
    ],
    providers: [],
})
export class LazyLoadDropdownModule { }

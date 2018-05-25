import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input'

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatExpansionModule,
    MatGridListModule
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatExpansionModule,
    MatGridListModule
  ],
  declarations: []
})
export class MaterialModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatExpansionModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatExpansionModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatIconModule
  ],
  declarations: []
})
export class MaterialModule { }

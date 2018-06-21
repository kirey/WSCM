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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';




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
        MatIconModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSliderModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatCardModule,
        MatDialogModule,
        MatTableModule
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
        MatIconModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSliderModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatCardModule,
        MatDialogModule,
        MatTableModule
    ],
    declarations: []
})
export class MaterialModule { }

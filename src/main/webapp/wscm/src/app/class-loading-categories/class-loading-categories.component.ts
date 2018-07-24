
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SnackBarService } from './../shared/services/snackbar.service';
import { EditCategoryDialogComponent } from './../shared/dialogs/edit-category-dialog/edit-category-dialog.component';
import { AddCategoryDialogComponent } from './../shared/dialogs/add-category-dialog/add-category-dialog.component';
import { ClassLoadingCategoriesService } from './class-loading-categories.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteDialog } from '../shared/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-class-loading-categories',
  templateUrl: './class-loading-categories.component.html',
  styleUrls: ['./class-loading-categories.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClassLoadingCategoriesComponent implements OnInit {

  private categories;
  private displayedColumns: string[] = ['categoryName', 'editing'];
  private dataSource;

  constructor(private _classLoadingCategoriesService: ClassLoadingCategoriesService, private dialog: MatDialog, private snackBarService: SnackBarService) { }

  ngOnInit() {
    //takes all categories
    this._classLoadingCategoriesService.getCategories().subscribe(res => {
      this.categories = JSON.parse(res.text()).data;
      this.dataSource = this.categories;
      console.log(this.categories);
    });
  }

  deleteCategory(id, type, value) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '500px',
      data: { type: type, value: value }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res == true) {
        this._classLoadingCategoriesService.deleteCategory(id).subscribe(res => { }, (err) => {
          this.snackBarService.openSnackBar('Error', 'Something went wrong!');
        }, () => {
          this._classLoadingCategoriesService.getCategories().subscribe(res => {
            this.categories = JSON.parse(res.text()).data;
            this.dataSource = this.categories;
            this.snackBarService.openSnackBar('Success', 'You have successfuly deleted category!');
          });
        });
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(res => {
      this._classLoadingCategoriesService.getCategories().subscribe(res => {
        this.categories = JSON.parse(res.text()).data;
        this.dataSource = this.categories;
      });
    });
  }
  openEditDialog(obj) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '800px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(res => {
      this._classLoadingCategoriesService.getCategories().subscribe(res => {
        this.categories = JSON.parse(res.text()).data;
        this.dataSource = this.categories;
      });
    });
  }

}

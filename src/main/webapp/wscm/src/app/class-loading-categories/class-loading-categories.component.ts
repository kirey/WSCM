import { SnackBarService } from './../shared/services/snackbar.service';
import { EditCategoryDialogComponent } from './../shared/dialogs/edit-category-dialog/edit-category-dialog.component';
import { AddCategoryDialogComponent } from './../shared/dialogs/add-category-dialog/add-category-dialog.component';
import { ClassLoadingCategoriesService } from './class-loading-categories.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-class-loading-categories',
  templateUrl: './class-loading-categories.component.html',
  styleUrls: ['./class-loading-categories.component.scss']
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

  deleteCategory(id) {
    console.log(id);
    this._classLoadingCategoriesService.deleteCategory(id).subscribe(res => { }, (err) => {
      this.snackBarService.openSnackBar('Failed deleting!', 'Error');
    }, () => {
      this._classLoadingCategoriesService.getCategories().subscribe(res => {
        this.categories = JSON.parse(res.text()).data;
        this.dataSource = this.categories;
        this.snackBarService.openSnackBar('Successfuly deleted!', 'Succes');
      });
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
    }, (err) => {
      this.snackBarService.openSnackBar('Failed adding!', 'Error');
     }, () => {
      this.snackBarService.openSnackBar('Successfuly added!', 'Succes');
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
    }, (err) => {
      this.snackBarService.openSnackBar('Failed editing!', 'Error');
     }, () => {
      this.snackBarService.openSnackBar('Successfuly edited!', 'Succes');
    });
  }

}

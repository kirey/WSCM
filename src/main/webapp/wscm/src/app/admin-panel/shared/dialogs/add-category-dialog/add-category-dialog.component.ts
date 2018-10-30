import { ClassLoadingCategoriesService } from './../../../class-loading-categories/class-loading-categories.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AddCategoryDialogComponent implements OnInit {

  private categoryForm: FormGroup;
  private name;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoryService: ClassLoadingCategoriesService,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  addCategory() {
    const category = {
      name: this.name
    };
    console.log(this.name);
    this._categoryService.addCategory(category).subscribe(res=>{
      console.log(res);
    },(err)=>{
      console.log(err);
      this.snackBarService.openSnackBar('Error', 'Something went wrong!');
    },()=>{
      this.snackBarService.openSnackBar('Success', 'You have successfuly added category!');
    });
    this.dialogRef.close();
  }

}

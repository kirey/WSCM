import { ClassLoadingCategoriesService } from './../../../class-loading-categories/class-loading-categories.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss']
})
export class EditCategoryDialogComponent implements OnInit {

  
  private categoryForm: FormGroup;
  private objForEditing;
  private name;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _categoryService:ClassLoadingCategoriesService) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.objForEditing = this.data;
    this.name = this.objForEditing.name;

  }

  editCategory() {
    console.log(this.name);
    this.objForEditing.name = this.name;
    this._categoryService.addCategory(this.objForEditing).subscribe(res=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    });
    this.dialogRef.close();
  }


}

import { ClassLoadingService } from './../../../class-loading/class-loading.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassLoadingCategoriesService } from './../../../class-loading-categories/class-loading-categories.service';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-class-dialog',
  templateUrl: './edit-class-dialog.component.html',
  styleUrls: ['./edit-class-dialog.component.scss']
})
export class EditClassDialogComponent implements OnInit {

  private categories;
  private classForm: FormGroup;
  private description;
  private initialCategory;
  private compiledFileButton = 'Browse for .class file';
  private compiledFile: any;

  constructor(private _classLoadingCategoriesService: ClassLoadingCategoriesService,
    public dialogRef: MatDialogRef<EditClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _classLoadingService: ClassLoadingService) { }

  ngOnInit() {
    this.initialCategory = this.data.kjcClassCategories;
    this.classForm = this.formBuilder.group({
      description: ['', Validators.required],
      compiledFile: ['', Validators.required]
    });
    this._classLoadingCategoriesService.getCategories().subscribe(res => {
      this.categories = JSON.parse(res.text()).data;
    }, (err) => { }, () => {
      console.log(this.data);
      for (var index = 0; index < this.categories.length; index++) {
        if (this.data.kjcClassCategories.name == this.categories[index].name) {
          this.initialCategory = this.categories[index];
          this.description = this.data.description;
        }
      }
    });
  }
  handleCompiledFile(files: FileList) {
    this.compiledFile = files[0];
    this.compiledFileButton = files[0].name + ' Size:' + files[0].size;
  }
  
  editClass() {
    let formData = new FormData();
    formData.append('qualifiedClassName', new Blob([this.data.kjcPackages.name + '.' + this.data.name],
      {
        type: "text/plain"
      }));

    formData.append('compiledFile', this.compiledFile);

    formData.append('description', new Blob([this.description],
      {
        type: "text/plain"
      }));

    formData.append('kjcCategories', new Blob([JSON.stringify(this.initialCategory)],
      {
        type: "application/json"
      }));

    this._classLoadingService.editClass(formData).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    }, () => {
      this.dialogRef.close();
    });

  }
}

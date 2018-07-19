import { ClassLoadingService } from './../../../class-loading/class-loading.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassLoadingCategoriesService } from './../../../class-loading-categories/class-loading-categories.service';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-class-dialog',
  templateUrl: './add-class-dialog.component.html',
  styleUrls: ['./add-class-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddClassDialogComponent implements OnInit {

  constructor(private _classLoadingCategoriesService: ClassLoadingCategoriesService,
    public dialogRef: MatDialogRef<AddClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _classLoadingService: ClassLoadingService) { }

  private categories;
  private classForm: FormGroup;
  private description;
  private initialCategory;
  private javaFileButton = 'Browse for .java file';
  private compiledFileButton = 'Browse for .class file';
  private javaFile:any;
  private compiledFile:any;


  ngOnInit() {
    this.classForm = this.formBuilder.group({
      description: ['', Validators.required],
      javaFile: ['', Validators.required],
      compiledFile: ['', Validators.required],
    });
    this._classLoadingCategoriesService.getCategories().subscribe(res => {
      this.categories = JSON.parse(res.text()).data;
      console.log(this.categories);
    }, (err) => { }, () => {
      if (this.categories[0] != null) {
        this.initialCategory = this.categories[0];
      }
    });
  }

  handleJavaFile(files: FileList) {
    this.javaFile = files[0];
    this.javaFileButton = files[0].name + ' Size:' + files[0].size;
  }
  handleCompiledFile(files: FileList) {
    this.compiledFile = files[0];
    this.compiledFileButton = files[0].name + ' Size:' + files[0].size;
  }

  addClass() {
    console.log(this.javaFile);
    console.log(this.compiledFile);
    const classObj = {
      description: this.description,
      kjcClassCategories: this.initialCategory
    };
    console.log(classObj);
    let formData: FormData = new FormData();
    formData.append('javaFile', this.javaFile);
    formData.append('compiledFile', this.compiledFile);
    formData.append('kjcClass', new Blob([JSON.stringify(classObj)],
      {
        type: "application/json"
      }));
    console.log(formData);
    this._classLoadingService.addClass(formData).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    }, () => {
      this.dialogRef.close();
    });

  }


}

import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContentService } from '../../../content/content.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-content-dialog',
  templateUrl: './add-content-dialog.component.html',
  styleUrls: ['./add-content-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddContentDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddContentDialogComponent>, public contentService: ContentService, public formBuilder: FormBuilder, public snackBarService: SnackBarService) { }

  categories: any;
  listCategoryWeight = [];
  contentCategorieses = [];

  addContentForm: FormGroup;

  // Select category - checkbox
  checked(ev, categories) {
    if (ev.checked) {
      if (this.listCategoryWeight.length == 0) {
        this.listCategoryWeight.push({ categories: categories, weight: 1 });
        this.contentCategorieses.push({
          categories: categories,
          weight: 1
        });
      }
      else {
        let push: boolean = false;
        for (let i = 0; i < this.listCategoryWeight.length; i++) {
          if (this.listCategoryWeight[i]['categoryId'] != categories.id) {
            push = true;
          }
        }
        if (push) {
          this.listCategoryWeight.push({ categories, weight: 1 });
          this.contentCategorieses.push({
            categories,
            weight: 1
          });
        }
      }
    } else {
      let index = this.listCategoryWeight.findIndex(
        item => item['categories'] == categories
      );
      this.listCategoryWeight.splice(index, 1);

      let index2 = this.contentCategorieses.findIndex(
        item => item['categories'] == categories
      );
      this.contentCategorieses.splice(index2, 1);
    }
    console.log(this.listCategoryWeight);
  }

  // Slider change fo each category
  sliderChange(ev, id, index) {
    if (this.listCategoryWeight.length !== 0) {
      for (let i = 0; i < this.listCategoryWeight.length; i++) {
        if (this.listCategoryWeight[i]['categories']['id'] === id) {
          this.listCategoryWeight[i]['weight'] = ev.value;
        }
      }
    }
    console.log(this.listCategoryWeight);
  }

  close(): void {
    this.dialogRef.close();
  }

  // Get Categories
  getCategories() {
    this.contentService.getCategories().subscribe(
      res => {
        console.log(res);
        this.categories = res['data'];
        console.log(this.categories);
      },
      err => console.log(err)
    );
  }

  // Send request
  addContent() {
    let obj = this.addContentForm.value;
    obj['contentCategorieses'] = this.listCategoryWeight;

    this.contentService.addContent(obj)
      .subscribe(
        res => {
          // console.log(res)
          this.snackBarService.openSnackBar(res['data'], 'Success');
          this.dialogRef.close();
        },
        err => this.snackBarService.openSnackBar('Something went wrong.', 'Error')
      );

  }

  ngOnInit() {
    this.getCategories();

    // Build Form
    this.addContentForm = this.formBuilder.group({
      html: ['', Validators.required],
      css: [''],
      script: [''],
      page: ['', Validators.required],
      position: ['', Validators.required],
      language: ['', Validators.required]
    });
  }

  // Form Getters
  get html() {
    return this.addContentForm.get('html');
  }
  get page() {
    return this.addContentForm.get('page');
  }
  get position() {
    return this.addContentForm.get('position');
  }
  get language() {
    return this.addContentForm.get('language');
  }
}

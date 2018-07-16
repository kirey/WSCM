import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContentService } from '../../../content/content.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-edit-content-dialog',
  templateUrl: './edit-content-dialog.component.html',
  styleUrls: ['./edit-content-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditContentDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<EditContentDialogComponent>, @Inject(MAT_DIALOG_DATA) public positionData: any, public contentService: ContentService, public formBuilder: FormBuilder, public snackBarService: SnackBarService) { }

  categories: any;
  listCategoryWeight = this.positionData.contentCategorieses;
  contentCategorieses = [];

  // Select category - checkbox
  checked(ev, categories) {
    if (ev.checked) {
      if (this.listCategoryWeight.length == 0) {
        this.positionData.contentCategorieses.push({
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
          this.positionData.contentCategorieses.push({
            categories: categories,
            weight: 1
          });
        }
      }
    }
    else {
      // let index = this.positionData.contentCategorieses.findIndex(
      //   item => item['categories'] == categories
      // );
      // this.positionData.contentCategorieses.splice(index3, 1);
    }
    console.log(this.listCategoryWeight);
  }

  unchecked(position) {
    let index = this.positionData.contentCategorieses.findIndex(item => item['categories'] == position.categories);
    this.positionData.contentCategorieses.splice(index, 1);

    console.log(this.listCategoryWeight);
  }


  // Slider change fo each category
  sliderChange(ev, selected) {
    console.log(selected);
    if (this.listCategoryWeight.length !== 0) {
      for (let i = 0; i < this.listCategoryWeight.length; i++) {
        if (this.listCategoryWeight[i]['categories']['id'] === selected.categories.id) {
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
  editContent(value) {
    value['contentCategorieses'] = this.positionData.contentCategorieses;
    console.log(value);

    this.contentService.updateContent(value)
      .subscribe(
        res => {
          console.log(res)
          this.snackBarService.openSnackBar(res['data'], 'Success');
          this.dialogRef.close();
        },
        err => this.snackBarService.openSnackBar('Something went wrong.', 'Error')
      );
  }

  ngOnInit() {
    console.log(this.positionData);
    this.getCategories();

    // Build Form
    //   this.editContentForm = this.formBuilder.group({
    //     html: ['', Validators.required],
    //     css: [''],
    //     script: [''],
    //     page: ['', Validators.required],
    //     position: ['', Validators.required],
    //     language: ['', Validators.required]
    //   });
    // }

    // Form Getters
    // get html() {
    //   return this.editContentForm.get('html');
    // }
    // get page() {
    //   return this.editContentForm.get('page');
    // }
    // get position() {
    //   return this.editContentForm.get('position');
    // }
    // get language() {
    //   return this.editContentForm.get('language');
    // }
  }
}

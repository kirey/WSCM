import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContentService } from './content.service';
import { SnackBarService } from './../shared/services/snackbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteDialog } from '../shared/dialogs/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {

  constructor(public contentService: ContentService, public snackbar: SnackBarService, public dialog: MatDialog,public router: Router) { }
  positions: any;
  categories: any;
  step: number = 1;
  selectedPosition: any;
  listCategoryWeight: Array<Object> = [];
  addJobShow = false;
  panelShow = true;


  // Add New Position panel open and close
  addJob() {
    this.panelShow = false;
    this.addJobShow = true;
  }


  // Get Positions
  getPositions() {
    this.contentService.getPositions('home')
      .subscribe(
        res => {
          console.log(res);
          this.positions = res;
        },
        err => console.log(err)
      );
  }
  // Reset Data
  resetData() {
    this.step = 1;
    this.listCategoryWeight = [];
  }

  // NEXT button
  next(obj, step) {
    console.log(obj, step);
    switch (step) {
      case 1:
        this.step = 2;
        this.selectedPosition = obj;
        for (let item of this.selectedPosition.contentCategorieses) {
          this.listCategoryWeight.push(item);
        }
        break;
      case 2:
        this.step = 3;
        break;
    }
    console.log(this.listCategoryWeight);
  }

  // BACK button
  back(currentStep) {
    switch (currentStep) {
      case 2:
        this.step = 1;
        this.listCategoryWeight = [];
        break;
      case 3:
        this.step = 2;
        break;
    }
  }

  // Select category -checkbox
  checked(ev, categories) {
    if (ev.checked) {
      if (this.listCategoryWeight.length == 0) {
        this.listCategoryWeight.push({ categories, 'weight': 1 });
        this.selectedPosition.contentCategorieses.push({ categories, 'weight': 1 });
      }
      else {
        let push: boolean = false;
        for (let i = 0; i < this.listCategoryWeight.length; i++) {
          if (this.listCategoryWeight[i]['categoryId'] != categories.id) {
            push = true;
          }
        }
        if (push) {
          this.listCategoryWeight.push({ categories, 'weight': 1 });
          this.selectedPosition.contentCategorieses.push({ categories, 'weight': 1 });
        }
      }
    }
    else {
      let index = this.listCategoryWeight.findIndex(item => item['categories'] == categories);
      this.listCategoryWeight.splice(index, 1);

      let index2 = this.selectedPosition['contentCategorieses'].findIndex(item => item['categories'] == categories);
      this.selectedPosition['contentCategorieses'].splice(index2, 1);
    }
    console.log(this.listCategoryWeight);
  }

  // Remove from list 'Selected categories'
  unchecked(position) {
    if (this.listCategoryWeight.length > 0) {
      let index = this.listCategoryWeight.findIndex(item => item['categories'] == position.categories);
      this.listCategoryWeight.splice(index, 1);

      let index2 = this.selectedPosition['contentCategorieses'].findIndex(item => item['categories'] == position.categories);
      this.selectedPosition['contentCategorieses'].splice(index2, 1);
    }
    console.log(this.listCategoryWeight);
  }

  // Delete Dialog
  deleteDialog(id, type, value) {
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '500px',
      data: { type: type, value: value }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.contentService.deletePosition(id)
          .subscribe(
            res => {
              console.log(res);

            },
            err => console.log(err)
          )
      }
    });
  }

  // Send Request
  save() {
    this.selectedPosition['contentCategorieses'] = this.listCategoryWeight;
console.log(this.selectedPosition['contentCategorieses']);
    this.contentService.updateContent(this.selectedPosition)
      .subscribe(
        res => {
          console.log(res)
          this.snackbar.openSnackBar('Success', res['data']);
          this.getPositions();
          this.resetData();

        },
        err => console.log(err)
      )
  }

  ngOnInit() {
    if(localStorage.getItem('role') == 'ROLE_USER'){
        this.router.navigate(['/client']);
    }

    this.getPositions();

    // Get Categories
    this.contentService.getCategories()
      .subscribe(
        res => {
          console.log(res);
          this.categories = res['data'];
        },
        err => console.log(err)
      );

  }

}

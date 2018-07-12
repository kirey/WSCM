import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ContentService } from './content.service';
import { SnackBarService } from '../shared/services/snackbar.service';
import { MatDialog, MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { DeleteDialog } from '../shared/dialogs/delete-dialog/delete-dialog.component';
import { AddContentDialogComponent } from '../shared/dialogs/add-content-dialog/add-content-dialog.component';
import { Router } from '@angular/router';
import { EditContentDialogComponent } from '../shared/dialogs/edit-content-dialog/edit-content-dialog.component';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ContentComponent implements OnInit {
  constructor(
    public contentService: ContentService,
    public snackbar: SnackBarService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;


  dataSource: any;
  categories: any;
  step: number = 1;
  selectedPosition: any;
  listCategoryWeight: Array<Object> = [];
  category: any;

  displayedColumns: string[] = ['pages', 'name', 'language', 'categories', 'edit', 'delete'];

  // Get Positions
  getPositions() {
    this.contentService.getPositions('home').subscribe(
      res => {
        console.log(res);
        this.dataSource = new MatTableDataSource<any>(res['data']);
        this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      },
      err => console.log(err)
    );
  }

  // Add Content Dialog
  addContentDialog() {
    const dialogRef = this.dialog.open(AddContentDialogComponent, {
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getPositions();
      }
    });
  }

  // Edit Content Dialog
  editContentDialog(position) {
    const dialogRef = this.dialog.open(EditContentDialogComponent, {
      width: '1000px',
      data: position
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getPositions();
      }
    });
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
        this.listCategoryWeight.push({ categories, weight: 1 });
        this.selectedPosition.contentCategorieses.push({
          categories,
          weight: 1
        });
      } else {
        let push: boolean = false;
        for (let i = 0; i < this.listCategoryWeight.length; i++) {
          if (this.listCategoryWeight[i]['categoryId'] != categories.id) {
            push = true;
          }
        }
        if (push) {
          this.listCategoryWeight.push({ categories, weight: 1 });
          this.selectedPosition.contentCategorieses.push({
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

      let index2 = this.selectedPosition['contentCategorieses'].findIndex(
        item => item['categories'] == categories
      );
      this.selectedPosition['contentCategorieses'].splice(index2, 1);
    }
    console.log(this.listCategoryWeight);
  }

  // Remove from list 'Selected categories'
  // unchecked(position) {
  //   if (this.listCategoryWeight.length > 0) {
  //     let index = this.listCategoryWeight.findIndex(
  //       item => item['categories'] == position.categories
  //     );
  //     this.listCategoryWeight.splice(index, 1);

  //     let index2 = this.selectedPosition['contentCategorieses'].findIndex(
  //       item => item['categories'] == position.categories
  //     );
  //     this.selectedPosition['contentCategorieses'].splice(index2, 1);
  //   }
  //   console.log(this.listCategoryWeight);
  // }

  // Delete Dialog
  deleteDialog(id, type, value) {
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '500px',
      data: { type: type, value: value }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.contentService.deletePosition(id).subscribe(
          res => {
            // console.log(res);
            this.getPositions()
          },
          err => console.log(err)
        );
      }
    });
  }

  // Send Request
  save() {
    this.selectedPosition['contentCategorieses'] = this.listCategoryWeight;
    console.log(this.selectedPosition['contentCategorieses']);
    this.contentService.updateContent(this.selectedPosition).subscribe(
      res => {
        console.log(res);
        this.snackbar.openSnackBar('Success', res['data']);
        this.getPositions();
        this.resetData();
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.getPositions();

    if (localStorage.getItem('role') == 'ROLE_USER') {
      this.router.navigate(['/client']);
    }

    // Get Categories
    this.contentService.getCategories().subscribe(
      res => {
        console.log(res);
        this.categories = res['data'];
        console.log(this.categories);
      },
      err => console.log(err)
    );
  }
}

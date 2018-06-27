import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteDialog } from '../../dialogs/delete-dialog/delete-dialog.component';

import { AddNewPositionService } from './add-new-position.service';

@Component({
  selector: 'app-add-new-position',
  templateUrl: './add-new-position.component.html',
  styleUrls: ['./add-new-position.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewPositionComponent implements OnInit {
  panelOpenState: boolean = false;
  selectedPage = 'option2';
  selectedPosition: any;
  step: number = 1;
  listCategoryWeight: Array<Object> = [];
  position: any;
  contentCategorieses: any;


  constructor(public dialog: MatDialog, public contentService: AddNewPositionService) { }


// NEXT button
next(obj, step) {
  console.log(obj);
  switch (step) {
    case 1:
      this.step = 2;
      this.selectedPosition = obj;
      for (const item of this.selectedPosition) {
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

// Reset Data
resetData() {
  this.step = 1;
  this.listCategoryWeight = [];
}

// Delete Dialog
deleteDialog(id, type, value) {
  const dialogRef = this.dialog.open(DeleteDialog, {
    width: '500px',
    data: { type: type, value: value }
  });

  // dialogRef.afterClosed().subscribe(res => {
  //   if (res) {
  //     this.contentService.deletePosition(id)
  //       .subscribe(
  //         res => {
  //           console.log(res);

  //         },
  //         err => console.log(err)
  //       )
  //   }
  // });
}


 // Send Request
 save() {
  // this.selectedPosition['contentCategorieses'] = this.listCategoryWeight;

  this.contentService.addContent(this.selectedPosition)
    .subscribe(
      res => {
        console.log(res);
        // this.snackbar.openSnackBar('Success', res['data']);
        // this.getPositions();
        // this.resetData();

      },
      err => console.log(err)
    );
}

  ngOnInit() {
  }

}

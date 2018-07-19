import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditJobService } from './edit-job-dialog.service';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: './edit-job-dialog.component.html',
  styleUrls: ['./edit-job-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditJobDialogComponent implements OnInit {
  jobs: any;
  constructor(public dialogRef: MatDialogRef<EditJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public editJobService: EditJobService,
    public snackbar: SnackBarService) {}

    getJob() {
      this.editJobService. getJobs().subscribe(
        res => {
          this.jobs = res.data;
          console.log(this.jobs);
        },
        err => console.log(err)
      );
    }

  // Edit job form
  editJob(obj) {
    obj['id'] = this.data.id;
    console.log(obj);

    // if (!obj.eventName) this.snackbar.openSnackBar('Please, enter event name.', '');
    // else if (!obj.eventType) this.snackbar.openSnackBar('Please, enter event type.', '');
    // else if (!obj.jobs) this.snackbar.openSnackBar('Please, select job name.', '');
    // else if (!obj.definition) this.snackbar.openSnackBar('Please, enter definition.', '');
    // else if (!obj.description) this.snackbar.openSnackBar('Please, enter description.', '');
    // else if (!obj.status) this.snackbar.openSnackBar('Please, enter status.', '');
    // else {
    //   this.editEventService.editEvents(obj).subscribe(
    //     res => {
    //       // console.log(res);
    //       this.snackbar.openSnackBar(res['data'], 'Success');
    //       this.dialogRef.close();
    //     },
    //     err => {
    //       console.log(err);
    //       this.snackbar.openSnackBar('Something went wrong.', 'Error');
    //     }
    //   );
    // }
  }

  ngOnInit() {
    this.getJob();
  }
}

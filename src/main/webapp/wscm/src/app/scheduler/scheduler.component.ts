import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SchedulerService } from './scheduler.service';
import { Router } from '@angular/router';
import { SnackBarService } from './../shared/services/snackbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditEventDialogComponent } from '../shared/dialogs/edit-event-dialog/edit-event-dialog.component';
import { AddEventDialogComponent } from '../shared/dialogs/add-event-dialog/add-event-dialog.component';
import { DeleteDialog } from '../shared/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulerComponent implements OnInit {
  currentStatus: string;
  job: any;
  events: any;
  animal: string;
  name: string;
  jobForm: FormGroup;
  jobName: any;
  cronExpression: any;
  currentJob: any;
  tableShow: true;


  constructor(
    public schedulerService: SchedulerService,
    public router: Router,
    public snackbar: SnackBarService,
    public dialog: MatDialog
  ) {}

  displayedColumns = [
    'id',
    'eventName',
    'jobName',
    'eventType',
    'definition',
    'description',
    'status',
    'actions',
    'history',
    'editing'
  ];

  // Get List
  getList() {
    this.schedulerService.getJobs().subscribe(
      res => {
        this.events = res.data;
        console.log(this.events);
      },
      err => console.log(err)
    );
  }
  // open add dialog
  openAddDialog() {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '800px',
      // data: this.data
    });
    // console.log(obj);

        dialogRef.afterClosed().subscribe(res => {
            this.getList();
            console.log(res);
            console.log('uspesno');
        });
  }
  // open edit dialog
  editDialog(obj) {
    // this.currentJob = job;
    const dialogRef = this.dialog.open(EditEventDialogComponent, {
      width: '800px',
      data: obj
    });
    console.log(obj);

        dialogRef.afterClosed().subscribe(res => {
            this.getList();
            console.log(res);
            console.log('uspesno');
        });
    // dialogRef.afterClosed().subscribe(res => {
    //   if (res) {
    //     this.contentService.updateContent(id).subscribe(
    //       res => {
    //         console.log(res);
    //       },
    //       err => console.log(err)
    //     );
    //   }
    // });
  }
  // Delete Job
  deleteJob(id) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '500px',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.schedulerService.deleteJob(id).subscribe(
          res => {
            console.log(res);
          },
          err => console.log(err)
        );
      }
    });
  }
  // Start Job
  start(job) {
    this.schedulerService.startJob(job.id).subscribe(
      res => {
        console.log(res);
        this.snackbar.openSnackBar('Success', res);
        // this.successMessage(res.message);
        return (job.status = 'ACTIVE');
      },
      err => {
        console.log(err);
        // this.errorMessage(err);
      }
    );
  }

  // Stop Job
  stop(job) {
    this.schedulerService.stopJob(job.id).subscribe(
      res => {
        console.log(res);
        // this.successMessage(res.message);
        return (job.status = 'INACTIVE');
      },
      err => {
        console.log(err);
        // this.errorMessage(err);
      }
    );
  }

  ngOnInit() {
    if (localStorage.getItem('role') == 'ROLE_USER') {
      this.router.navigate(['/client']);
    }
    this.getList();
  }
}

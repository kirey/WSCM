import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatPaginator,
  MatTableDataSource
} from '@angular/material';
import { JobsService } from './jobs.service';
import { AddJobDialogComponent } from '../shared/dialogs/add-job-dialog/add-job-dialog.component';
import { EditJobDialogComponent } from '../shared/dialogs/edit-job-dialog/edit-job-dialog.component';
import { DeleteDialog } from '../shared/dialogs/delete-dialog/delete-dialog.component';
import { SnackBarService } from '../shared/services/snackbar.service';
import { JobsHistoryDialogComponent } from '../shared/dialogs/jobs-history-dialog/jobs-history-dialog.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  dataSource: any;
  jobs: any;
  jobHistory: any;
  data: any;

  displayedColumns = [
    'jobName',
    'jobType',
    'status',
    'classLoading',
    'cronExpression',
    'actions',
    'history',
    'editing'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // dataSource = new MatTableDataSource<Element>(this.jobs);

  constructor(
    public jobService: JobsService,
    public dialog: MatDialog,
    public snackbar: SnackBarService
  ) {}

  getList() {
    this.jobService.getJobs().subscribe(
      res => {
        this.jobs = res.data;
        console.log(this.jobs);
      },
      err => console.log(err)
    );
  }

   // Get History
   getHistory(id) {
    this.jobService.getHisory(id).subscribe(
      res => {
        console.log(res);
        this.jobHistory = res.data;
        console.log(this.jobHistory);
      },
      err => console.log(err)
    );
  }

  // Open History dialog
  openHistoryDialog(id) {
    this.getHistory(id);
    const dialogRef = this.dialog.open(JobsHistoryDialogComponent, {
      width: '800px',
      data: this.jobHistory
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      console.log('uspesno');
    });
  }
  // open add dialog
  openAddDialog() {
    const dialogRef = this.dialog.open(AddJobDialogComponent, {
      width: '1000px'
      // data: this.data
    });
    // console.log(obj);

    // dialogRef.afterClosed().subscribe(res => {
    //     this.getList();
    //     console.log(res);
    //     console.log('uspesno');
    // });
  }

  // open edit dialog
  editJobDialog(obj) {
    // this.currentJob = job;
    const dialogRef = this.dialog.open(EditJobDialogComponent, {
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

  // Delete Dialog
  deleteDialog(id, type, value) {
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '500px',
      data: { type: type, value: value }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.jobService.deleteJob(id).subscribe(
          res => {
            // console.log(res);
            this.snackbar.openSnackBar(res['data'], 'Successful');
            this.getList();
          },
          err => {
            this.snackbar.openSnackBar(res['error']['message'], 'Error');
            console.log(err);
          }
        );
      }
    });
  }

  // Start Job
  start(job) {
    this.jobService.startJob(job.id).subscribe(
      res => {
        console.log(res);
        // this.snackbar.openSnackBar('Success', res.message);
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
    this.jobService.stopJob(job.id).subscribe(
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

  ngOnInit(): void {
    this.getList();
    this.dataSource = new MatTableDataSource<Element>(this.jobs);
    this.dataSource.paginator = this.paginator;
  }
}

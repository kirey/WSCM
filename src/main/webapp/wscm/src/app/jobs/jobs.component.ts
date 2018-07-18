import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatPaginator, MatTableDataSource
} from '@angular/material';
import { JobsService } from './jobs.service';
import { AddJobDialogComponent } from '../shared/dialogs/add-job-dialog/add-job-dialog.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  dataSource: any;
  jobs: any;
  displayedColumns = [
    'jobName',
    'jobType',
    'status',
    'classLoading',
    'cronExpression',
    'actions',
    'editing'
  ];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  // dataSource = new MatTableDataSource<Element>(this.jobs);

  constructor(public jobService: JobsService, public dialog: MatDialog) { }

  getList() {
    this.jobService.getJobs().subscribe(
      res => {
        this.jobs = res.data;
        console.log(this.jobs);

      },
      err => console.log(err)
    );
  }
 // open add dialog
 openAddDialog() {
  const dialogRef = this.dialog.open(AddJobDialogComponent, {
    // width: '1000px',
    // data: this.data
  });
  // console.log(obj);

    // dialogRef.afterClosed().subscribe(res => {
    //     this.getList();
    //     console.log(res);
    //     console.log('uspesno');
    // });
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

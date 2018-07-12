import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatPaginator
} from '@angular/material';
import { JobsService } from './jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
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

  constructor(public jobService: JobsService) {}

  getList() {
    this.jobService.getJobs().subscribe(
      res => {
        this.jobs = res.data;
        console.log(this.jobs);
      },
      err => console.log(err)
    );
  }
  ngOnInit() {
    this.getList();
  }
}

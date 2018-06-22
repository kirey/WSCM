import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SchedulerService } from './scheduler.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulerComponent implements OnInit {
  currentStatus: string;
  job: any;
  jobs: any;
  animal: string;
  name: string;
  jobForm: FormGroup;
  jobName: any;
  cronExpression: any;
  currentJob: any;
  addJobShow = false;
  tableShow = true;
  editJobShow = false;

  constructor(public schedulerService: SchedulerService) {}

  displayedColumns = [
    'id',
    'jobName',
    'status',
    'cronExpression',
    'changeStatus',
    'actions',
    'history'
  ];

  // Get List
  getList() {
    this.schedulerService.getJobs().subscribe(
      res => {
        this.jobs = res.data;
        console.log(this.jobs);
      },
      err => console.log(err)
    );
  }

  addJob() {
    this.tableShow = false;
    this.addJobShow = true;
  }

  editJob(job) {
    this.currentJob = job;
    this.tableShow = false;
    this.editJobShow = true;
  }

  // Delete Job
  deleteJob(id) {
    this.schedulerService.deleteJob(id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  // Start Job
  start(job) {
    this.schedulerService.startJob(job.id).subscribe(
      res => {
        console.log(res);
        // this.successMessage(res.message);
        // return job.status = 'ACTIVE';
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
    this.getList();
  }
}

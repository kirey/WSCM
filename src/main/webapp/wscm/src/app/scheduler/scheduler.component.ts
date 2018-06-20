import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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

// Add Job

addJob() {
  const obj = {
      jobName: this.jobName.value,
      cronExpression: this.cronExpression.value,
      status: null
  };
  this.schedulerService.addJob(obj)
      .subscribe(
      res => {
          console.log(res);
          // this.jobs = res.data;
          // this.successMessage(res.message);
      },
      err => {
          console.log(err);
          // this.addJobModal.hide();
      }
      );
}

    // Delete Job
    deleteJob(id) {
      this.schedulerService.deleteJob(id)
          .subscribe(
          res => {
              console.log(res);
              // this.jobs = res.data;
          },
          err => {
              console.log(err);
          }
          );
  }

  ngOnInit() {
    this.schedulerService.getJobs().subscribe(
      res => {
        this.jobs = res.data;
        console.log(this.jobs);
      },
      err => console.log(err)
    );
  }
}

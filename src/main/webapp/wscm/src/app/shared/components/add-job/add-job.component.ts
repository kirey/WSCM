import { Component, OnInit } from '@angular/core';
import { AddJobService } from './addJob.service';

@Component ({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  constructor(public addJobSerivice: AddJobService) { }

  jobName: string;
  cronExpression: string;
  eventName: string;
  eventType: string;
  description: string;

    // Add Job
    addJob() {
      const jobs = {
        eventName: this.eventName,
        jobName: this.jobName,
        eventType: this.eventType,
        cronExpression: this.cronExpression,
        description: this.description,
        status: null
      };
      this.addJobSerivice.addJob(jobs).subscribe(
        res => {
          console.log(res);
          // this.jobs = res.data;
          // this.successMessage(res.message);
        },
        err => {
          console.log(err);
          // this.errorMessage(err);
        }
      );
    }
  ngOnInit() {
  }

}

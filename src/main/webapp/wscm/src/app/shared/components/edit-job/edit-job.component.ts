import { Component, OnInit, Input } from '@angular/core';
import { EditJobService } from './edit-job.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {

  constructor(public editJobService: EditJobService) { }

  @Input() currentJob;

  jobName: string;
  cronExpression: string;
  status: string;
  eventType: string;
  id: number;
  events: any;

  getList() {
    this.editJobService.getJobs().subscribe(
      res => {
        this.events = res.data;
        console.log(this.events);
      },
      err => console.log(err)
    );
  }
   // Edit job form
   editJob() {
    const obj = {
      eventName: this.currentJob.eventName,
      jobName: this.currentJob.jobName,
      eventType: this.currentJob.eventType,
      cronExpression: this.currentJob.jobs.cronExpression,
      description: this.currentJob.description,
      status: this.currentJob.currentStatus,
      id: this.currentJob.id
    };
    console.log(obj);
    this.editJobService.editJob(obj).subscribe(
      res => {
        console.log(res);
        // this.jobs = res.data;
        // this.successMessage(res.message);
        // this.editJobModal.hide();
      },
      err => {
        console.log(err);
        // this.errorMessage(err);
        // this.editJobModal.hide();
      }
    );
  }

  ngOnInit() {
    this.getList();
  }

}

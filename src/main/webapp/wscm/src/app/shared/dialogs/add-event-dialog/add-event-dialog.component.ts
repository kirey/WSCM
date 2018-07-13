import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddEventService } from './add-event-dialog.service';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEventDialogComponent implements OnInit {
  jobName: string;
  jobSelected: any;
  cronExpression: string;
  eventName: string;
  eventType: string;
  description: string;
  id: number;
  events: any;
  classLoading: null;
  jobCategorieses: null;
  typeName: null;
  kjcClasses: null;
  listNotificationses: null;
  definition: string;
  jobId: number;

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public addEventService: AddEventService
  ) {}

  getList() {
    this.addEventService.getJobs().subscribe(
      res => {
        this.events = res.data;
        console.log(this.events);
      },
      err => console.log(err)
    );
  }
  // Add Event function
  addJob(jobId) {
    console.log('Job selected:');
    console.log(this.jobSelected);
    const jobs = {
      id: jobId,
      eventName: this.eventName,
      eventType: this.eventType,
      jobs: this.jobSelected,
      definition: 'test',
      description: this.description,
      status: 'test'
    };
    console.log(jobs);
    this.addEventService.addJobs(jobs).subscribe(
      res => {
        console.log('blaba');
        console.log(res);

        // this.jobs = res.data;
        // this.successMessage(res.message);
        this.dialogRef.close();
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

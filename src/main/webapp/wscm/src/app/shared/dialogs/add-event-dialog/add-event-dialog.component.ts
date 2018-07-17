import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddEventService } from './add-event-dialog.service';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEventDialogComponent implements OnInit {

  addEventForm: FormGroup;

  // jobName: string;
  // jobSelected: any;
  // cronExpression: string;
  // eventName: string;
  // eventType: string;
  // description: string;
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
    public addEventService: AddEventService,
    public formBuilder: FormBuilder
  ) { }

  getList() {
    this.addEventService.getEvents().subscribe(
      res => {
        this.events = res.data;
        console.log(this.events);
      },
      err => console.log(err)
    );
  }

  // Add Event 
  addEvent() {
    // console.log('Job selected:');
    // console.log(this.jobSelected);

    console.log(this.addEventForm.value);
    // const jobs = {
    //   id: jobId,
    //   eventName: this.eventName,
    //   eventType: this.eventType,
    //   jobs: this.jobSelected,
    //   definition: 'test',
    //   description: this.description,
    //   status: 'test'
    // };

    // this.addEventService.addEvents(jobs).subscribe(
    //   res => {
    //     console.log(res);

    //     // this.jobs = res.data;
    //     // this.successMessage(res.message);
    //     this.dialogRef.close();
    //   },
    //   err => {
    //     console.log(err);
    //     // this.errorMessage(err);
    //   }
    // );
  }
  ngOnInit() {
    this.getList();
    // Build Form

    this.addEventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventType: ['', Validators.required],
      jobSelected: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Form Getters
  get eventName() {
    return this.addEventForm.get('eventName');
  }
  get eventType() {
    return this.addEventForm.get('eventType');
  }
  get jobSelected() {
    return this.addEventForm.get('jobSelected');
  }
  get description() {
    return this.addEventForm.get('description');
  }
}

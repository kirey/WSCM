import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddEventService } from './add-event-dialog.service';
import { FormGroup, FormBuilder, Validators } from '../../../../../../node_modules/@angular/forms';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEventDialogComponent implements OnInit {

  addEventForm: FormGroup;
  events: any;

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public addEventService: AddEventService,
    public formBuilder: FormBuilder,
    public snackbar: SnackBarService
  ) { }

  getList() {
    this.addEventService.getEvents().subscribe(
      res => {
        this.events = res.data;
        // console.log(this.events);
      },
      err => console.log(err)
    );
  }

  // Add Event 
  addEvent() {
    this.addEventForm.value['id'] = this.addEventForm.value['jobs']['id'];
    console.log(this.addEventForm.value);

    this.addEventService.addEvents(this.addEventForm.value).subscribe(
      res => {
        // console.log(res);
        this.snackbar.openSnackBar(res['data'], 'Success');
        this.dialogRef.close();
      },
      err => {
        console.log(err);
        this.snackbar.openSnackBar('Something went wrong.', 'Error');
      }
    );
  }
  ngOnInit() {
    this.getList();

    // Build Form
    this.addEventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventType: ['', Validators.required],
      jobs: ['', Validators.required],
      description: ['', Validators.required],
      definition: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  // Form Getters
  get eventName() {
    return this.addEventForm.get('eventName');
  }
  get eventType() {
    return this.addEventForm.get('eventType');
  }
  get jobs() {
    return this.addEventForm.get('jobs');
  }
  get description() {
    return this.addEventForm.get('description');
  }
  get definition() {
    return this.addEventForm.get('definition');
  }
  get status() {
    return this.addEventForm.get('status');
  }
}

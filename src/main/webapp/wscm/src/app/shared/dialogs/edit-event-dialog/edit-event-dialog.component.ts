import {
  Component,
  Inject,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditEventService } from './edit-event-dialog.service';

@Component({
  selector: 'app-edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditEventDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public editEventService: EditEventService
  ) {}
  editEventsForm: FormGroup;
  cronExpression: string;
  status: string;
  eventType: string;
  id: number;
  events: any;
  eventName: string;
  selectValue: any;
  jobs: any;
  obj: any;

  getList() {
    this.editEventService.getJobs().subscribe(
      res => {
        this.events = res.data;
        console.log(this.events);
      },
      err => console.log(err)
    );
  }
  // Edit job form
  editJob(obj) {
    console.log(obj);
    this.editEventService.editJobs(obj).subscribe(
      res => {
        console.log(res);
        // this.successMessage(res.message);
        this.dialogRef.close();
        this.getList();
      },
      err => {
        console.log(err);
        // this.errorMessage(err);
        // this.editJobModal.hide();
      }
    );
  }
  cancel(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    console.log(this.data);
    this.getList();
  }
}

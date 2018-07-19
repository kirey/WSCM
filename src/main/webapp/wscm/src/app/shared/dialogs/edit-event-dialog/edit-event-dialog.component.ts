import {
  Component,
  Inject,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditEventService } from './edit-event-dialog.service';
import { SnackBarService } from '../../services/snackbar.service';

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
    public editEventService: EditEventService,
    public snackbar: SnackBarService
  ) { }

  editEventsForm: FormGroup;
  events: any;

  getList() {
    this.editEventService.getEvents().subscribe(
      res => {
        this.events = res.data;
        // console.log(this.events);
      },
      err => console.log(err)
    );
  }

  // Edit job form
  editJob(obj) {
    obj['id'] = this.data.id;
    console.log(obj);

    if (!obj.eventName) this.snackbar.openSnackBar('Please, enter event name.', '');
    else if (!obj.eventType) this.snackbar.openSnackBar('Please, enter event type.', '');
    else if (!obj.jobs) this.snackbar.openSnackBar('Please, select job name.', '');
    else if (!obj.definition) this.snackbar.openSnackBar('Please, enter definition.', '');
    else if (!obj.description) this.snackbar.openSnackBar('Please, enter description.', '');
    else if (!obj.status) this.snackbar.openSnackBar('Please, enter status.', '');
    else {
      this.editEventService.editEvents(obj).subscribe(
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
  }

  ngOnInit() {
    // console.log(this.data);
    this.getList();
  }
}

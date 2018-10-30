import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventsService } from '../../../events/events.service';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventHistoryComponent implements OnInit {
  history: any;
  id: any;

  constructor(
    public dialogRef: MatDialogRef<EventHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public eventHistoryService: EventsService
  ) {}
  getColor(status) {
    switch (status) {
      case 'SUCCESSFULL':
        return '$primary';
      case 'STARTED':
        return '#64FFDA';
      case 'CANCELED':
        return '#ffd740';
      case 'FAILED':
        return '#ff4d4d';
    }
  }

  ngOnInit() {
    console.log(this.data);
  }
}

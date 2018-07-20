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


  constructor( public dialogRef: MatDialogRef<EventHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public eventHistoryService: EventsService) { }

  ngOnInit() {
console.log(this.data);
  }

}

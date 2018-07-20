import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventHistoryService } from './event-history-dialog.service';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventHistoryComponent implements OnInit {
  history: any;
  id: number;
  obj: any;

  constructor( public dialogRef: MatDialogRef<EventHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public eventHistoryService: EventHistoryService) { }

  ngOnInit() {
  }

}

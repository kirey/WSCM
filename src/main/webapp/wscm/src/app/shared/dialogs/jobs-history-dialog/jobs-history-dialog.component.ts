import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JobsService } from '../../../jobs/jobs.service';

@Component({
  selector: 'app-jobs-history-dialog',
  templateUrl: './jobs-history-dialog.component.html',
  styleUrls: ['./jobs-history-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobsHistoryDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<JobsHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public jobsHistoryService: JobsService
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

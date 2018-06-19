import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';

import { SchedulerService } from './scheduler.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulerComponent implements OnInit {
  constructor(public schedulerService: SchedulerService) {}

  jobs: any;
  displayedColumns = ['id', 'jobName', 'status', 'cronExpression', 'changeStatus', 'actions', 'history'];

  ngOnInit() {
    this.schedulerService.getJobs().subscribe(
      res => {
        this.jobs = res.data;
        console.log(this.jobs);
      },
      err => console.log(err)
    );
  }
}





import { Component, OnInit, Input } from '@angular/core';
import { EditJobService } from './edit-job.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {

  constructor(public editJobService: EditJobService) { }

  @Input() currentJob;

  jobName: string;
  cronExpression: string;
  status: string;
  id: number;

   // Edit job form
   editJob() {
    const obj = {
      jobName: this.jobName,
      cronExpression: this.cronExpression,
      status: this.currentJob.currentStatus,
      id: this.currentJob.id
    };
    console.log(obj);
    // this.editJobService.editJob(obj).subscribe(
    //   res => {
    //     console.log(res);
    //     // this.jobs = res.data;
    //     // this.successMessage(res.message);
    //     // this.editJobModal.hide();
    //   },
    //   err => {
    //     console.log(err);
    //     // this.errorMessage(err);
    //     // this.editJobModal.hide();
    //   }
    // );
  }

  ngOnInit() {
  }

}

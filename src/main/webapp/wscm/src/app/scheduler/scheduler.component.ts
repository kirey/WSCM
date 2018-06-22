import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SchedulerService } from './scheduler.service';



@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulerComponent implements OnInit {
  currentStatus: string;
  job: any;
  jobs: any;
  animal: string;
  name: string;
  jobForm: FormGroup;
  jobName: any;
  cronExpression: any;
  currentJob: any;


  constructor(public schedulerService: SchedulerService) {}

  displayedColumns = [
    'id',
    'jobName',
    'status',
    'cronExpression',
    'changeStatus',
    'actions',
    'history'
  ];

// Add Job
onSubmit() {
  const jobs = {
    jobName: this.jobName,
    cronExpression: this.cronExpression,
    status: null
};
this.schedulerService.addJob(jobs)
    .subscribe(
    res => {
        console.log(res);
        // this.jobs = res.data;
        // this.successMessage(res.message);
    },
    err => {
      console.log(err);
        // this.errorMessage(err);
    }
    );
    this.closeAddTemplate();
}



    // Delete Job
    deleteJob(id) {
      this.schedulerService.deleteJob(id)
          .subscribe(
          res => {
              console.log(res);
              // this.jobs = res.data;
          },
          err => {
              console.log(err);
          }
          );
  }

  // Start Job
  start(job) {
    this.schedulerService.startJob(job.id)
        .subscribe(
        res => {
            console.log(res);
            // this.successMessage(res.message);
            // return job.status = 'ACTIVE';
        },
        err => {
            console.log(err);
            // this.errorMessage(err);
        }
        );
}

 // Stop Job
 stop(job) {
  this.schedulerService.stopJob(job.id)
      .subscribe(
      res => {
          console.log(res);
          // this.successMessage(res.message);
          return job.status = 'INACTIVE';
      },
      err => {
          console.log(err);
          // this.errorMessage(err);
      }
      );
}

// Edit job form
onSubmitEditForm() {
  const obj = {
      jobName: this.jobName.value,
      cronExpression: this.cronExpression.value,
      status: this.currentStatus,
      id: this.currentJob.id
  };
  this.schedulerService.editJob(obj)
      .subscribe(
      res => {
          console.log(res);
          // this.jobs = res.data;
          // this.successMessage(res.message);
          // this.editJobModal.hide();
      },
      err => {
          console.log(err);
          // this.errorMessage(err);
          // this.editJobModal.hide();
      }
      );
}

changeTemplate() {
 const addTemplate = document.getElementById('addTemplate');
 const jobList = document.getElementById('jobList');
 addTemplate.style.display = 'block';
 jobList.style.display = 'none';
}
closeAddTemplate() {
  const addTemplate = document.getElementById('addTemplate');
 const jobList = document.getElementById('jobList');
 addTemplate.style.display = 'none';
 jobList.style.display = 'block';
}
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

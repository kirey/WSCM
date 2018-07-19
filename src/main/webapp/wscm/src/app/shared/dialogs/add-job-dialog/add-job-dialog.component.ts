import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddJobService } from './add-job-dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-job-dialog',
  templateUrl: './add-job-dialog.component.html',
  styleUrls: ['./add-job-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddJobDialogComponent implements OnInit {
  jobName: string;
  cronExpression: string;
  categories: any;
  category = {};
  listCategoryWeight = [];
  jobCategorieses = [];
  categoryName: string;
  id: number;
  selectedPosition: any;
  check: false;
  jobTypes: any;
  classLoading: any;
  notification: any;
  addJobForm: FormGroup;
  isChecked:boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public addJobService: AddJobService,
    public formBuilder: FormBuilder
  ) {}

 // Get All Categories
  getCategories() {
    this.addJobService.getAllCategories().subscribe(
      res => {
        console.log(res);
        this.categories = res['data'];
        // console.log(this.categories);
      },
      err => console.log(err)
    );
  }

  // Get All Job Types
  getJobTypes() {
    this.addJobService.getAllJobs().subscribe(
      res => {
        this.jobTypes = res.data;
        // console.log(this.jobTypes);
      },
      err => console.log(err)
    );
}

// Get Class Loading -  Get All Classes
getAllClasses() {
  this.addJobService.getAllClasses().subscribe(
    res => {
      console.log(res);
      this.classLoading = res.data;
      console.log(this.classLoading);
    },
    err => console.log(err)
  );
}

// Get Notification
getNotifications() {
  this.addJobService.getAllNotification().subscribe(
    res => {
      console.log(res);
      this.notification = res.data;
      console.log(this.notification);
    },
    err => console.log(err)
  );
}
// Class Loading checkbox
doCheck(ev) {
  this.isChecked = true;
}
  // Select category - checkbox
  checked(ev, category) {
    console.log(this.listCategoryWeight);
    if (ev.checked) {
      if (this.listCategoryWeight.length === 0) {
        this.listCategoryWeight.push({
          category: category,
          weight: 1
        });
      } else {
        let push: boolean = false;
        for (let i = 0; i < this.listCategoryWeight.length; i++) {
          if (this.listCategoryWeight[i]['categoryId'] != category.id) {
            push = true;
          }
        }
        if (push) {
          this.listCategoryWeight.push({ category, weight: 1 });
          this.jobCategorieses.push({
            category,
            weight: 1
          });
        }
      }
    }
    console.log(this.listCategoryWeight);
  }

  // REMOVE  from list 'Selected categories'
  unchecked(position) {
    const index = this.listCategoryWeight.findIndex(item => item['category'] == position.category);
    this.listCategoryWeight.splice(index, 1);
    console.log(this.listCategoryWeight);
  }

  // Slider change fo each category
  sliderChange(ev, selected) {
    if (this.listCategoryWeight.length !== 0) {
      for (let i = 0; i < this.listCategoryWeight.length; i++) {
        if (this.listCategoryWeight[i]['category']['id'] === selected.category.id) {
          this.listCategoryWeight[i]['weight'] = ev.value;
        }
      }
    }
    console.log(this.listCategoryWeight);
  }

  addJob() {
    let obj = this.addJobForm.value;
    obj['jobCategorieses'] = this.listCategoryWeight;
    console.log(obj);
  }
  // Add Event function
  // addJob(jobId) {
  //   console.log('Job selected:');
  //   console.log(this.jobSelected);
  //   const jobs = {
  //     id: jobId,
  //     eventName: this.eventName,
  //     eventType: this.eventType,
  //     jobs: this.jobSelected,
  //     definition: 'test',
  //     description: this.description,
  //     status: 'test'
  //   };
  //   console.log(jobs);
  //   this.addEventService.addJobs(jobs).subscribe(
  //     res => {
  //       console.log('blaba');
  //       console.log(res);

  //       // this.jobs = res.data;
  //       // this.successMessage(res.message);
  //       this.dialogRef.close();
  //     },
  //     err => {
  //       console.log(err);
  //       // this.errorMessage(err);
  //     }
  //   );
  // }

  ngOnInit() {
    this.getCategories();
    this.getJobTypes();
    this.getAllClasses();
    this.getNotifications();


      // Build Form
      this.addJobForm = this.formBuilder.group({
        jobName: ['', Validators.required],
        cronExpression: [''],
        kjcClasses: ['', Validators.required],
        jobType: [''],
        status: ['', Validators.required],
        jobParameterses: ['', Validators.required],
        listNotificationses: ['', Validators.required]
      });
  }
}

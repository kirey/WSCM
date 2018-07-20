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

  addJobForm: FormGroup;
  categories: any;
  classLoading: any;
  notification: any;
  jobTypes: any;
  jobCategorieses: any = [];
  listCategoryWeight = [];
  isChecked: boolean = false;
  paramsArray: Array<Object> = [];
  expand: boolean = false;
  selectedParam: number;

  constructor(
    public dialogRef: MatDialogRef<AddJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public addJobService: AddJobService,
    public formBuilder: FormBuilder
  ) { }

  // Get All Categories
  getCategories() {
    this.addJobService.getAllCategories().subscribe(
      res => {
        this.categories = res['data'];
        console.log(this.categories);
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
    this.isChecked = !this.isChecked;

    if (!this.isChecked) {
      delete this.addJobForm.value['kjcClasses'];
    }
  }

  // Params
  addJobParam() {
    this.paramsArray.push({
      name: this.addJobForm.value['name'],
      value: this.addJobForm.value['value'],
      description: this.addJobForm.value['description']
    });
    console.log(this.paramsArray);
  }
  removeJobParam(param, index) {
    this.paramsArray.splice(index, 1)
  }
  expandParamsInfo(i) {
    this.expand = !this.expand;

    if (this.expand) this.selectedParam = i;
    else this.selectedParam = null;

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
          if (this.listCategoryWeight[i]['id'] != category.id) {
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
    obj['jobParameterses'] = this.paramsArray;
    console.log(obj);

    this.addJobService.addJob(obj)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      )
  }

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
      listNotificationses: ['', Validators.required],
      name: ['', Validators.required],
      value: ['', Validators.required],
      description: ['']
    });
  }
}

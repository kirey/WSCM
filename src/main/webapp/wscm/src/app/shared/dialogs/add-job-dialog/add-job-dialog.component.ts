import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddJobService } from './add-job-dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { SnackBarService } from '../../services/snackbar.service';

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
  nameError: boolean; // Validation for params
  valueError: boolean; // Validation for params
  paramMesssage: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public addJobService: AddJobService,
    public formBuilder: FormBuilder,
    public snackbar: SnackBarService
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
    if (!this.addJobForm.value['name']) this.nameError = true;
    else if (!this.addJobForm.value['value']) this.valueError = true;
    else {
      if (this.paramsArray.length > 0) {
        for (let i = 0; i < this.paramsArray.length; i++) {
          if (this.addJobForm.value['name'] == this.paramsArray[i]['name']) {
            return this.paramMesssage = true;
          }
          else this.paramMesssage = false;
        }
      }
      if (!this.paramMesssage) {
        this.paramsArray.push({
          name: this.addJobForm.value['name'],
          value: this.addJobForm.value['value'],
          description: this.addJobForm.value['description']
        });
        this.nameError = false;
        this.valueError = false;
        console.log(this.paramsArray);
      }
    }
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

  // Send request
  addJob() {
    let obj = this.addJobForm.value;
    obj['jobCategorieses'] = this.listCategoryWeight;
    obj['jobParameterses'] = this.paramsArray;
    delete obj['value'];
    delete obj['description'];
    delete obj['name'];

    // kjcClasses
    if (obj['kjcClasses'] == "") delete obj['kjcClasses'];

    console.log(obj);

    this.addJobService.addJob(obj)
      .subscribe(
        res => {
          console.log(res);
          this.snackbar.openSnackBar(res['data'], 'Success');
          this.dialogRef.close();
        },
        err => {
          console.log(err);
          this.snackbar.openSnackBar('Something went wrong.', 'Error');
        }
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
      cronExpression: [null],
      kjcClasses: [[]],
      classLoading: [false, Validators.required],
      jobType: ['', Validators.required],
      status: ['', Validators.required],
      jobParameterses: [[]],
      listNotificationses: [[]],
      name: [''],
      value: [''],
      description: [null]
    });
  }

  // Getters for Form Group
  get jobName() { return this.addJobForm.get('jobName'); }
  get status() { return this.addJobForm.get('status'); }
  get jobType() { return this.addJobForm.get('jobType'); }
}

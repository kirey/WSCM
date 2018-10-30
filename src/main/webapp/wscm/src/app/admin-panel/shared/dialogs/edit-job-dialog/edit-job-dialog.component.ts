import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material';
import { EditJobService } from './edit-job-dialog.service';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: './edit-job-dialog.component.html',
  styleUrls: ['./edit-job-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditJobDialogComponent implements OnInit {
  jobs: any;
  jobTypes: any;
  classLoadingList: any;
  notifications: any;
  categories: any;
  listCategoryWeight = this.data.jobCategorieses;
  jobCategorieses = [];
  isChecked: boolean = false;
  selectedNotifications = [];
  kjcClasses: any;

  // Params
  paramName: string;
  paramValue: string;
  paramDescription: string;
  valueError: boolean = false; // Validation for params
  nameError: boolean = false; // Validation for params
  paramMesssage: boolean = false; // Message if there are 2 same params in array
  expand: boolean = false;
  selectedParam: number;

  constructor(
    public dialogRef: MatDialogRef<EditJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public editJobService: EditJobService,
    public snackbar: SnackBarService
  ) { }

  getJob() {
    this.editJobService.getJobs().subscribe(
      res => {
        this.jobs = res.data;
        // console.log(this.jobs);
      },
      err => console.log(err)
    );
  }
  // Get All Job Types
  getJobTypes() {
    this.editJobService.getAllJobs().subscribe(
      res => {
        this.jobTypes = res.data;
        // console.log(this.jobTypes);
      },
      err => console.log(err)
    );
  }

  // Get Class Loading -  Get All Classes
  getAllClasses() {
    this.editJobService.getAllClasses().subscribe(
      res => {
        // console.log(res);
        this.classLoadingList = res.data;
      },
      err => console.log(err)
    );
  }

  // Get Notification
  getNotifications() {
    this.editJobService.getAllNotification().subscribe(
      res => {
        // console.log(res);
        this.notifications = res.data;
      },
      err => console.log(err)
    );
  }

  // Get All Categories
  getCategories() {
    this.editJobService.getAllCategories().subscribe(
      res => {
        // console.log(res);
        this.categories = res['data'];
      },
      err => console.log(err)
    );
  }

  // Set Notifications list
  setSelectedNotifications() {
    for (let i = 0; i < this.data['listNotificationses'].length; i++) {
      this.selectedNotifications.push(this.data['listNotificationses'][i]['name']);
    }
    // console.log(this.selectedNotifications);
  }

  // Class Loading checkbox
  doCheck(ev) {
    this.isChecked = !this.isChecked;

    if (!this.isChecked) {
      this.kjcClasses = null;
    }
  }

  // Params
  addJobParam() {
    if (!this.paramName) this.nameError = true;
    else if (!this.paramValue) this.valueError = true;
    else {
      if (this.data['jobParameterses'].length > 0) {
        for (let i = 0; i < this.data['jobParameterses'].length; i++) {
          if (this.paramName == this.data['jobParameterses'][i]['name']) {
            return this.paramMesssage = true;
          }
          else this.paramMesssage = false;
        }
      }
      if (!this.paramMesssage) {
        this.data['jobParameterses'].push({
          name: this.paramName,
          value: this.paramValue,
          description: this.paramDescription
        });
        this.nameError = false;
        this.valueError = false;
        console.log(this.data['jobParameterses']);
      }
    }
  }
  removeJobParam(param, index) {
    this.data['jobParameterses'].splice(index, 1)
  }
  expandParamsInfo(i) {
    this.expand = !this.expand;

    if (this.expand) this.selectedParam = i;
    else this.selectedParam = null;

  }

  // Select category - checkbox
  checked(ev, category) {
    if (ev.checked) {
      if (this.listCategoryWeight.length == 0) {
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
          this.listCategoryWeight.push({
            category: category,
            weight: 1
          });
        }
      }
    }
    console.log(this.listCategoryWeight);
  }
  // REMOVE  from list 'Selected categories'
  unchecked(position) {
    const index = this.listCategoryWeight.findIndex(
      item => item['category'] == position.category
    );
    this.listCategoryWeight.splice(index, 1);
    console.log(this.listCategoryWeight);
  }

  // Slider change fo each category
  sliderChange(ev, selected) {
    if (this.listCategoryWeight.length !== 0) {
      for (let i = 0; i < this.listCategoryWeight.length; i++) {
        if (
          this.listCategoryWeight[i]['category']['id'] === selected.category.id
        ) {
          this.listCategoryWeight[i]['weight'] = ev.value;
        }
      }
    }
    console.log(this.listCategoryWeight);
  }
  // Edit job form
  editJob(value) {
    // Set ID
    value['id'] = this.data.id;

    // Class Loading
    value['classLoading'] = this.isChecked;
    if (this.isChecked && !this.kjcClasses) value['classLoading'] = false;

    // Set Categories
    value['jobCategorieses'] = this.data.jobCategorieses;

    // JobType
    for (let i = 0; i < this.jobTypes.length; i++) {
      if (this.jobTypes[i]['typeName'] == value['jobType']) {
        value['jobType'] = this.jobTypes[i];
      }
    }

    // List Notificationses
    value['listNotificationses'] = [];
    for (let i = 0; i < this.notifications.length; i++) {
      for (let x = 0; x < this.selectedNotifications.length; x++) {
        if (this.notifications[i]['name'] == this.selectedNotifications[x]) {
          value['listNotificationses'].push(this.notifications[i]);
        }
      }
    }

    // Params
    delete value['paramName'];
    delete value['paramValue'];
    delete value['paramDescription'];
    if (this.data['jobParameterses']) value['jobParameterses'] = this.data['jobParameterses'];

    // kjcClasses
    if (this.kjcClasses) value['kjcClasses'] = this.kjcClasses;
    else delete value['kjcClasses'];

    if (!value['jobName'] || value['jobName'] == "") this.snackbar.openSnackBar('Please, enter job name.', 'Error');
    else if (!value['jobType']) this.snackbar.openSnackBar('Please, enter job type.', 'Error');
    else if (!value['status'] || value['status'] == "") this.snackbar.openSnackBar('Please, enter status.', 'Error');

    else {
      console.log(value);
    }
  }

  ngOnInit() {
    this.getJob();
    this.getJobTypes();
    this.getAllClasses();
    this.getNotifications();
    this.getCategories();
    console.log(this.listCategoryWeight);
    this.setSelectedNotifications();
  }
}

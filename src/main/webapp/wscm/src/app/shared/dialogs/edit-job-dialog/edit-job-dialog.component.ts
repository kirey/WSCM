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
  classLoading: any;
  notifications: any;
  categories: any;
  listCategoryWeight = this.data.jobCategorieses;
  jobCategorieses = [];
  isChecked: boolean;
  selectedNotifications = [];

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
        this.classLoading = res.data;
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
      // TODO Remove kjcClasses from object
      // delete this..value['kjcClasses'];

    }
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
    // obj['id'] = this.data.id;
    value['jobCategorieses'] = this.data.jobCategorieses;
    // console.log(value);

    // let list = [];
    // for (let i = 0; i < this.jobTypes.length; i++) {
    //   if (value['jobType'] == this.jobTypes[i]['typeName']) {
    //     list.push(this.jobTypes[i]);
    //   }
    // }
    // console.log(list)

    // if (!obj.eventName) this.snackbar.openSnackBar('Please, enter event name.', '');
    // else if (!obj.eventType) this.snackbar.openSnackBar('Please, enter event type.', '');
    // else if (!obj.jobs) this.snackbar.openSnackBar('Please, select job name.', '');
    // else if (!obj.definition) this.snackbar.openSnackBar('Please, enter definition.', '');
    // else if (!obj.description) this.snackbar.openSnackBar('Please, enter description.', '');
    // else if (!obj.status) this.snackbar.openSnackBar('Please, enter status.', '');
    // else {
    //   this.editEventService.editEvents(obj).subscribe(
    //     res => {
    //       // console.log(res);
    //       this.snackbar.openSnackBar(res['data'], 'Success');
    //       this.dialogRef.close();
    //     },
    //     err => {
    //       console.log(err);
    //       this.snackbar.openSnackBar('Something went wrong.', 'Error');
    //     }
    //   );
    // }
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

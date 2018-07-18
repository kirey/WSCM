import { EditClassDialogComponent } from './../shared/dialogs/edit-class-dialog/edit-class-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddClassDialogComponent } from './../shared/dialogs/add-class-dialog/add-class-dialog.component';
import { ClassLoadingService } from './class-loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-loading',
  templateUrl: './class-loading.component.html',
  styleUrls: ['./class-loading.component.scss']
})
export class ClassLoadingComponent implements OnInit {

  constructor(private _classLoadingService: ClassLoadingService, private dialog: MatDialog) { }

  private displayedColumns: string[] = ['package', 'class', 'category', 'description', 'editing'];
  private dataSource;
  private classes;

  ngOnInit() {
    this._classLoadingService.getClasses().subscribe(res => {
      this.classes = JSON.parse(res.text()).data;
      this.dataSource = this.classes;
      console.log(this.classes);
    });
  }

  deleteClass(fullClassName) {
    this._classLoadingService.deleteClass(fullClassName).subscribe(res => { }, err => { }, () => {
      this._classLoadingService.getClasses().subscribe(res => {
        this.classes = JSON.parse(res.text()).data;
        this.dataSource = this.classes;
        console.log(this.classes);
      });
    });
  }

  openEditDialog(obj) {
    const dialogRef = this.dialog.open(EditClassDialogComponent, {
      width: '800px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(res => {

    }, (err) => {

    }, () => {
      this._classLoadingService.getClasses().subscribe(res => {
        this.classes = JSON.parse(res.text()).data;
        this.dataSource = this.classes;
        console.log(this.classes);
      });
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddClassDialogComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(results => {
      this._classLoadingService.getClasses().subscribe(res => {
        this.classes = JSON.parse(res.text()).data;
        this.dataSource = this.classes;
        console.log(this.classes);
      });
    });
  }

}

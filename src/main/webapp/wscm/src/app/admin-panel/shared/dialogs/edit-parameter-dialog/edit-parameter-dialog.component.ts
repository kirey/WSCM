import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-parameter-dialog',
  templateUrl: './edit-parameter-dialog.component.html',
  styleUrls: ['./edit-parameter-dialog.component.scss']
})
export class EditParameterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditParameterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }

    private test = "Nikola";
    private test1 ="Nikola1";

  ngOnInit() {
    //this.dialogRef.close();
  }



}

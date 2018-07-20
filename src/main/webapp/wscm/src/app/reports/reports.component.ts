import { EditParameterDialogComponent } from './../shared/dialogs/edit-parameter-dialog/edit-parameter-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  private jrxml = 'Browse for jrxml file';
  private jasper = 'Browse for jasper file';
  private topForm: FormGroup;
  private bottomForm: FormGroup;
  private name;
  private description;
  private jrxmlFile;
  private jasperFile;
  private parameters;
  private customParameters = [];
  private subreports = [];
  private subreportFiles = [];

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) { }
  ngOnInit() {
    this.topForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.bottomForm = this.formBuilder.group({
      jrxml: ['', Validators.compose([Validators.required])],
      jasper: ['', Validators.compose([Validators.required])]
    }, { validator: this.compareNames });
  }

  openEditDialog(obj) {
    const dialogRef = this.dialog.open(EditParameterDialogComponent, {
      width: '800px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  addReport() { }

  handleJRXMLFile(event) {
    this.subreportFiles = [];
    Object.keys(this.bottomForm.controls).forEach(key => {
      let control = this.bottomForm.get(key);
      if (!(key == 'jrxml' || key == 'jasper')) {
        control.setValue("");
      }
    });
    if (event.target.files[0] != undefined) {
      this.jrxml = event.target.files[0].name + ' Size:' + event.target.files[0].size;
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(fileReader.result, "text/xml");
        this.parameters = Array.prototype.slice.call(xmlDoc.getElementsByTagName("parameter"));
        console.log(this.parameters);
        let flag = false;
        for (let index = 0; index < this.parameters.length; index++) {
          if (this.parameters[index].className == 'net.sf.jasperreports.engine.JasperReport') {
            flag = true;
            this.bottomForm.addControl(this.parameters[index].attributes.name.value, new FormControl('', Validators.required));
            this.subreports.push(this.parameters[index]);
          } else {
            let customParam = {
              key: this.parameters[index].attributes.name.value,
              name: this.parameters[index].attributes.name.value,
              type: this.parameters[index].className.substring(this.parameters[index].className.lastIndexOf('.') + 1),
              isMandatory: false,
              description: "",
              minValue: 0,
              maxValue: 0,
            };
            this.customParameters.push(customParam);
          }
        }
        if (flag == false) {
          this.subreports = [];
        }

      }
      fileReader.readAsText(event.target.files[0]);
      document.getElementById('jrxmlLabel').style.background = '#FFEE58';
      console.log(this.customParameters);
    }
  }
  handleSubreportFile(event) {
    let parentId = event.target.parentElement.id;
    this.subreportFiles.push(event.target.files[0]);
    let fileNameAndSize = event.target.files[0].name + ' Size:' + event.target.files[0].size;
    document.getElementById(parentId).style.background = '#FFEE58';
    document.getElementById(parentId).childNodes[0].nodeValue = parentId + ":" + fileNameAndSize;
  }
  handleJasperFile(event) {
    this.jasper = event.target.files[0].name + ' Size:' + event.target.files[0].size;
    document.getElementById('jasperLabel').style.background = '#FFEE58';
  }

  trimToFilename(file) {
    let fileName = file.split('\\').pop().split('/').pop()
    var name = fileName.substr(0, fileName.lastIndexOf('.'));
    return name;
  }
  compareNames = (control: AbstractControl): { [key: string]: boolean } => {
    const jrxml = control.get('jrxml');
    const jasper = control.get('jasper');
    if (!jrxml || !jasper) {
      return null;
    }
    return this.trimToFilename(jrxml.value) === this.trimToFilename(jasper.value) ? null : { nomatch: true };
  };
}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


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

  constructor(private formBuilder: FormBuilder) { }

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

  addReport() { }

  handleJRXMLFile(files: FileList) {
    this.jrxml = files[0].name + ' Size:' + files[0].size;
    console.log(files[0]);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(fileReader.result, "text/xml");
      this.parameters = Array.prototype.slice.call(xmlDoc.getElementsByTagName("parameter"));
      console.log(this.parameters);
      //console.log(xmlDoc.getElementsByTagName("parameter"));
      //console.log(fileReader.result);
    }
    fileReader.readAsText(files[0]);
  }
  handleJasperFile(files: FileList) {
    this.jasper = files[0].name + ' Size:' + files[0].size;
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


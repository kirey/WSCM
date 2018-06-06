import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../shared/services/app.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(public appService: AppService, public sanitizer: DomSanitizer) { }

  style: any;
  template: any;
  script: any;

  ngOnInit() {
    console.log('yey');

    // Get TEMPLATE
    this.appService.getContent('html', 'home', 'P1', 'EN')
      .subscribe(
        res => {
          console.log(res);
          let t = res['_body'];
          this.template = this.sanitizer.bypassSecurityTrustHtml(t);
        },
        err => console.log(err)
      );

    // Get SCRIPT
    this.appService.getContent('script', 'home', 'P1', 'EN')
      .subscribe(
        res => {
          console.log(res);
          let s = res['_body'];
          this.script = this.sanitizer.bypassSecurityTrustScript(s);
        },
        err => console.log(err)
      );
  }
}

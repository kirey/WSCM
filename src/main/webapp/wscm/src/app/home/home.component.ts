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
  header: any;

  ngOnInit() {
    this.appService.getContent('home', 'P1')
      .subscribe(
        res => {
          console.log(res);
          this.header = res;
          this.style = this.sanitizer.bypassSecurityTrustStyle(this.header.css);
        },
        err => console.log(err)
      );
  }

}

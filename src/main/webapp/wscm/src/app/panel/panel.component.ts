import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PanelService } from './panel.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PanelComponent implements OnInit {

  constructor(public panelService: PanelService, public sanitizer: DomSanitizer) { }

  style: any;
  template: any;
  script: any;

  ngOnInit() {

    // Get TEMPLATE
    this.panelService.getContent('html', 'home', 'P1', 'EN')
      .subscribe(
        res => {
          console.log(res);
          let t = res['_body'];
          this.template = this.sanitizer.bypassSecurityTrustHtml(t);
        },
        err => console.log(err)
      );

    // Get SCRIPT
    this.panelService.getContent('script', 'home', 'P1', 'EN')
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

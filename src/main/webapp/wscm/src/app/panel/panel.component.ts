import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { PanelService } from './panel.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PanelComponent implements OnInit {

  role: any;

  constructor(
    public panelService: PanelService,
    public sanitizer: DomSanitizer,
    public auth: AuthService,
    public router: Router
  ) { }

  style: any;
  template: any;
  script: any;
  login = true;

  logout() {
    this.auth.logout()
      .subscribe(
      res => {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        this.router.navigate(['/login']);
      },
      err => console.log(err)
      );
  }
  ngOnInit() {
    this.role = localStorage.getItem('role');
    console.log("PANEL ROLE:  " + this.role);
    // Get TEMPLATE
    // this.panelService.getContent('home', 'P2', 'EN')
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //       let t = res['_body'];
    //       this.template = this.sanitizer.bypassSecurityTrustHtml(t);
    //     },
    //     err => console.log(err)
    //   );
  }
}

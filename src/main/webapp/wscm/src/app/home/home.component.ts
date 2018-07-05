import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('role') == 'ROLE_USER'){
        this.router.navigate(['/client']);
    }
  }

}

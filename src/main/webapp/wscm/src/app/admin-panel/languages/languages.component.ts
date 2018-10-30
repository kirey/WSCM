import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('role') == 'ROLE_USER'){
        this.router.navigate(['/client']);
    }
  }

}

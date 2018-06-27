import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  htmlString:string = "";

  constructor(public router: Router, public auth: AuthService,public clientService:ClientService) { }

  ngOnInit() {
    this.clientService.getPosition().subscribe(res=>
    {
      this.htmlString = res.text();
      document.getElementById("position").innerHTML = this.htmlString;
    },err => {
      console.log(err);
    }
    );

    // if(localStorage.getItem('role') == 'ROLE_ADMIN'){
    //     this.router.navigate(['/home']);
    // }
  }

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

}

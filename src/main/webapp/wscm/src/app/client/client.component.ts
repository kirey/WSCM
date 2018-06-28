import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ClientService } from './client.service';
import { Observable, Subject } from 'rxjs';
import {SocketService} from '../shared/services/socket.service'
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  htmlString: string = "";
  public messages: Subject<any>;

  constructor(public router: Router, public auth: AuthService, public clientService: ClientService, public wsService: SocketService, private _http: Http) {
  }

  ngOnInit() {
    this.socketLogic();
    this.clientService.getPosition().subscribe(res => {
      this.htmlString = res.text();
      document.getElementById("position").innerHTML = this.htmlString;
    }, err => {
      console.log(err);
    }
    );
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

  ngOnDestroy() {
    this.messages.unsubscribe();
    this.wsService.disconnect();
    console.log('poziva se metoda');
  }

  socketLogic() {
    this.messages = <Subject<any>>this.wsService
      .connect('ws://localhost:8083/wscm/socket')
      .pipe(
      map((response: MessageEvent): any => {
        console.log(response.data);
        ////work with response from socket
        var x = document.getElementById("toast");
        x.innerHTML = response.data;
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
        ////work with response from socket
        return response.data;
      }
      ));

    this.messages.subscribe(res => { }, err => { }, () => { });
    setTimeout(() => {
      if (localStorage.getItem('username') == "insurance") {
        this._http.get('http://localhost:8083/wscm/rest/content/test?name=insurance').subscribe(res => {
          console.log(res);
        });
      } else {
        this._http.get('http://localhost:8083/wscm/rest/content/test?name=bank').subscribe(res => {
          console.log(res);
        });
      }
    }, 4000);
  }

}

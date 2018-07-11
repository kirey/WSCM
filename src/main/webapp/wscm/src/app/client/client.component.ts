import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ClientService } from './client.service';
import { Observable, Subject } from 'rxjs';
import { SocketService } from '../shared/services/socket.service';
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
    }, () => {
      // //getting anchor tag id and putting to url and writting to database
      //getting anchor tag id and putting to url and writting to database
      // let element = document.getElementById("test");
      // element.addEventListener("click", function () {
      //   console.log("ID is:" + this.id);
      //   var xhr = new XMLHttpRequest();
      //   xhr.open("POST", 'rest/link', true);

      //   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      //   xhr.onreadystatechange = function () {//Call a function when the state changes.
      //     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      //       console.log('Succesful');
      //     }
      //   }
      //   var url = 'client/' + this.id;
      //   xhr.send("url=" + url);
      // });
    });
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
  }

  socketLogic() {
    this.messages = <Subject<any>>this.wsService
      .connect('ws://192.168.60.12:8083/wscm/socket')
      .pipe(
        map((response: MessageEvent): any => {
          console.log(response.data);
          //// work with response from socket
          var x = document.getElementById("toast");
          x.innerHTML = response.data;
          x.className = "show";
          setTimeout(function () { x.className = x.className.replace("show", ""); }, 10000);
          //// work with response from socket
          return response.data;
        }
        ));

    this.messages.subscribe(res => { }, err => { }, () => { });
    setTimeout(() => {
      if (localStorage.getItem('username') == "insurance") {
        this._http.get('rest/content/test?name=insurance').subscribe(res => {
          console.log(res);
        });
      } else if(localStorage.getItem('username') == "bank"){
        this._http.get('rest/content/test?name=bank').subscribe(res => {
          console.log(res);
        });
      }
    }, 4000);
  }

}

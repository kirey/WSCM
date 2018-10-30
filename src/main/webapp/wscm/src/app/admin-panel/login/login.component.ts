import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { AuthService } from '../shared/services/auth.service';
import { SnackBarService } from '../shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public loginService: LoginService,
    public router: Router,
    public auth: AuthService,
    public snackBarService: SnackBarService
  ) { }

  loginUser() {
    if (!this.username.value) {
      this.snackBarService.openSnackBar('Please enter your username.', 'Missing username.');
    } else if (!this.password.value) {
      this.snackBarService.openSnackBar('Please enter your password.', 'Missing password.');
    } else {
      const obj = {
        username: this.username.value,
        password: this.password.value
      };
      this.auth.login(obj).subscribe(
        res => {
          console.log(res);
          let body = JSON.parse(res.text());
          localStorage.setItem('role', body.data.role);
          localStorage.setItem('username', obj.username);
          this.router.navigate(['/home']);
        },
        err => {
          this.snackBarService.openSnackBar(err.statusText, 'Error');
          console.log(err);
        }
      );
    }
  }

  ngOnInit() {
    // if (localStorage.getItem('username') != null && localStorage.getItem('role') != null) {
    //   if (localStorage.getItem('role') == 'ROLE_USER') {
    //     this.router.navigate(['/client']);
    //   } else {
    //     this.router.navigate(['/home']);
    //   }
    // }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
}

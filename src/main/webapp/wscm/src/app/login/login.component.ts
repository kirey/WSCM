import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AuthService } from '../shared/services/auth.service';
// import { SnackBarService } from '../shared/services/snackbar.service';

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
    public auth: AuthService
  ) {}

  loginUser() {
    if (!this.username.value) {
      console.log(this.username);
      // this.snackBarService.openSnackBar('Please, enter your username.');
    } else if (!this.password.value) {
      // this.snackBarService.openSnackBar('Please, enter your password.');
    } else {
      const obj = {
        username: this.username.value,
        password: this.password.value
      };
      this.auth.login(obj).subscribe(
        res => {
          console.log(res);
          localStorage.setItem('username', obj.username);
          this.router.navigate(['/home']);
        },
        err => {
          // this.snackBarService.openSnackBar(err._body);
          console.log(err);
        }
      );
    }
  }

  ngOnInit() {
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

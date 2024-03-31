import { Component } from '@angular/core';
import {FormControl, FormControlName, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  loginForm:FormGroup
  constructor() {
    this.init();
  }

  login() {
    console.log(this.loginForm);
  }

  private init() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      remember: new FormControl()
    });
  }
}

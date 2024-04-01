import { Component } from '@angular/core';
import {FormControl, FormControlName, FormGroup} from "@angular/forms";
import {UserModel} from "../../../model/auth.model";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  loginForm:FormGroup
  constructor(private auth: AuthenticationService) {
    this.init();
  }

  login() {
    let user: UserModel = <UserModel> this.loginForm.value
    this.auth.apiLogin(user).subscribe(data => {
      console.log(data)
    })
  }

  private init() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      remember: new FormControl()
    });
  }
}

import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserModel} from "../../../model/auth.model";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {ResponseAuthModel} from "../../../model/response-auth.model";
import {StorageUtil} from "../../../core/utils/storage.util";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [CookieService]
})
export class AppSideLoginComponent {
  loginForm:FormGroup
  constructor(private auth: AuthenticationService,
              private storageUtil: StorageUtil,
              private router: Router) {
    this.init();
  }

  login() {
    let user: UserModel = <UserModel> this.loginForm.value
    this.auth.apiLogin(user).subscribe(data => {
      if (data != null) {
        let response:ResponseAuthModel = <ResponseAuthModel> data;
        console.log(response)
        this.storageUtil.setCookie("Authorization", response.token)
        this.storageUtil.setCookieOnly("rf", "Bearer " + response.rf)
        this.storageUtil.setCookie("c_id", response.uid)
        this.router.navigate(['/dashboard']);
      }
    })
  }

  private init() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      remember: new FormControl()
    });
  }
}

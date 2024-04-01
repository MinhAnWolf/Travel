import { Component } from '@angular/core';
import {FormControl, FormControlName, FormGroup} from "@angular/forms";
import {UserModel} from "../../../model/auth.model";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {ResponseAuthModel} from "../../../model/response-auth.model";
import {StorageUtil} from "../../../core/utils/storage.util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
        this.storageUtil.setCookieAt("Authorization", response.token)
        this.storageUtil.setCookieOnlyRf("rf", response.rf)
        this.router.navigate(['/dashboard'])
          .then(r => console.log(r));
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

import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../model/auth.model";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {ResponseAuthModel} from "../../../model/response-auth.model";
import {StorageUtil} from "../../../core/utils/storage.util";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [CookieService]
})
export class AppSideLoginComponent {

  hide = true;
  email: FormControl;
  password: FormControl;

  toastRef: any;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private storageUtil: StorageUtil,
  ) {
    this.initForm();
  }

  loginForm:FormGroup

  get f() {
    return this.loginForm.controls;
  }


  login() {
    this.spinner.show();
    let user: UserModel = <UserModel> this.loginForm.value
    this.auth.apiLogin(user).subscribe(data => {
      if (data != null) {
        this.spinner.hide();
        let response:ResponseAuthModel = <ResponseAuthModel> data;
        this.storageUtil.setCookie("Authorization", response.token)
        this.storageUtil.setCookieOnly("rf", response.rf)
        this.storageUtil.setCookie("c_id", response.uid)
        this.router.navigate(['/dashboard']);
      }
    }, error => {
      this.toastRef = this.toast.error("Tài khoản hoặc mật khẩu không đúng", "Đăng nhập thất bại", {
        disableTimeOut: false,
        tapToDismiss: false,
        toastClass: "toast-icon custom-toast-error"
      });
      this.spinner.hide();
    })
  }

  initForm() {
    this.loginForm = new FormGroup({
      // email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl()
    });
  }

}

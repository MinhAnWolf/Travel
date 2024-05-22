import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserModel } from 'src/app/model/auth.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {

  registerForm: FormGroup;

  constructor(
    private router: Router, 
    private auth: AuthenticationService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  register(){
    this.spinner.show();
    let user: UserModel = <UserModel> this.registerForm.value;
    this.auth.apiRegister(user).subscribe(
      (data) => {
        this.spinner.hide();
        this.toast.success('Đăng ký tài khoản thành công!', 'Hoàn thành đăng ký', {
          timeOut: 3000,
        });
        this.router.navigate(['/authentication/login']);
    }, 
    (error) => {
      this.spinner.hide();
      this.toast.error("Thông tin không đúng định dạng", "Đăng ký thất bại", {
        disableTimeOut: false,
        tapToDismiss: false,
        toastClass: "toast-icon custom-toast-error"
      });
    });
  }
}

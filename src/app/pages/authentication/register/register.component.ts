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

  // email: FormControl;
  // username: FormControl;
  // password: FormControl;

  // toastRef: any;


  initForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  // registerForm = new FormGroup({
  //   username: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   email: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required]),
  // });
 

  get f() {
    return this.registerForm.controls;
  }

  // submit() {
  //   // console.log(this.form.value);
  //   this.router.navigate(['/dashboard']);
  // }



  register(){
    this.spinner.show();
    let user: UserModel = <UserModel> this.registerForm.value;
    // alert("Bat dau dang ki");
    this.auth.apiRegister(user).subscribe(
      (data) => {
        this.spinner.hide();
        this.toast.success('Đăng ký tài khoản thành công!', 'Hoàn thành đăng ký', {
          timeOut: 3000,
        });
        this.router.navigate(['/authentication/login']);
      // this.toastRef.success('Đăng ký tài khoản thành công!', 'Hoàn thành đăng ký', {
      //   timeOut: 3000,
      // });
      // // this.router.navigate(['/authentication/login']);
    }, 
    (error) => {
      // this.toastRef = this.toast.error("Thông tin không đúng định dạng", "Đăng ký thất bại", {
      //   disableTimeOut: false,
      //   tapToDismiss: false,
      //   toastClass: "toast-icon custom-toast-error"
      // });
      // this.spinner.hide();
      this.spinner.hide();
      this.toast.error("Thông tin không đúng định dạng", "Đăng ký thất bại", {
        disableTimeOut: false,
        tapToDismiss: false,
        toastClass: "toast-icon custom-toast-error"
      });
    });
  }
}

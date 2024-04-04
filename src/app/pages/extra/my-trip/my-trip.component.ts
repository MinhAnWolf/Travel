import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrl: './my-trip.component.scss'
})
export class MyTripComponent {

  toastRef: any;


  constructor(
    private toastr: ToastrService
  ) { }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  showSuccessToast() {
    this.toastRef = this.toastr.success("The reboot request was unsuccessful", "Device Unreachable", {
      disableTimeOut: true,
      tapToDismiss: false,
      positionClass: 'toast-top-right',
      toastClass: "toast-icon custom-toast-success"
  });


  }

  showWarningToast() {
    this.toastRef = this.toastr.warning("The reboot request was unsuccessful", "Device Unreachable", {
      disableTimeOut: false,
      tapToDismiss: false,
      toastClass: "toast-icon custom-toast-warning"
    });
  }
  showInfoToast() {
    this.toastRef = this.toastr.info("The reboot request was unsuccessful", "Device Unreachable", {
      disableTimeOut: false,
      tapToDismiss: false,
      toastClass: "toast-icon custom-toast-info"
    });
  }
  showErrorToast() {
    this.toastRef = this.toastr.error("The reboot request was unsuccessful", "Device Unreachable", {
      disableTimeOut: false,
      tapToDismiss: false,
      toastClass: "toast-icon custom-toast-error"
    });

  }

  removeToast() {
    this.toastr.clear(this.toastRef.ToastId);
  }
}

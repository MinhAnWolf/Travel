import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TripData } from 'src/app/model/timeline-trip.model';


// ecommerce card
interface productcards {
  id: number;
  imgSrc: string;
  title: string;
  price: string;
  rprice: string;
}


@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrl: './my-trip.component.scss'
})
export class MyTripComponent {

  toastRef: any;

  // ecommerce card
  productcards: TripData[] = [
    {
      "id": "f86f123b-890b-4ed7-984a-6b502c6d9dab",
			"title": "Du hí Đà Lạt 2024 cùng anh em Quang Hanh",
			"startDate": "01/10/2024",
			"endDate": "03/10/2024",
			"coverImage": "https://ak-d.tripcdn.com/images/01052120009bxxskn94F4_C_400_280_R5.jpg_.webp",
			"members": [
				{
					"fullName": "Nguyễn Huỳnh Đông Triều",
					"urlAvatar": "assets/images/profile/user-1.jpg"
				},
				{
					"fullName": "Phạm Trương Kiến Thụy",
					"urlAvatar": "assets/images/profile/user-2.jpg"
				},
				{
					"fullName": "Lê Trương Minh An",
					"urlAvatar": "assets/images/profile/user-3.jpg"
				}
			]
    },
    {
      "id": "f86f123b-890b-4ed7-984a-6b502c6d9dab",
			"title": "Du hí Đà Lạt 2024 cùng anh em Quang Hanh",
			"startDate": "01/10/2024",
			"endDate": "03/10/2024",
			"coverImage": "https://ak-d.tripcdn.com/images/01052120009bxxskn94F4_C_400_280_R5.jpg_.webp",
			"members": [
				{
					"fullName": "Nguyễn Huỳnh Đông Triều",
					"urlAvatar": "assets/images/profile/user-1.jpg"
				},
				{
					"fullName": "Phạm Trương Kiến Thụy",
					"urlAvatar": "assets/images/profile/user-2.jpg"
				},
				{
					"fullName": "Lê Trương Minh An",
					"urlAvatar": "assets/images/profile/user-3.jpg"
				}
			]
    },
    {
      "id": "f86f123b-890b-4ed7-984a-6b502c6d9dab",
			"title": "Du hí Đà Lạt 2024 cùng anh em Quang Hanh",
			"startDate": "01/10/2024",
			"endDate": "03/10/2024",
			"coverImage": "https://ak-d.tripcdn.com/images/01052120009bxxskn94F4_C_400_280_R5.jpg_.webp",
			"members": [
				{
					"fullName": "Nguyễn Huỳnh Đông Triều",
					"urlAvatar": "assets/images/profile/user-1.jpg"
				},
				{
					"fullName": "Phạm Trương Kiến Thụy",
					"urlAvatar": "assets/images/profile/user-2.jpg"
				},
				{
					"fullName": "Lê Trương Minh An",
					"urlAvatar": "assets/images/profile/user-3.jpg"
				}
			]
    },
    
  ];


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

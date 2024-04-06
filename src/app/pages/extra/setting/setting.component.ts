import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {

  formChangePass:FormGroup;
  formChangeInfo: FormGroup;

  cities4:any = [
    { id : "1", name : "Trieu"}
  ]

  listProvince : any = [
    { id : "1", name : "Trieu"}
  ]

  listDistrict : any = [
    { id : "1", name : "Trieu"}
  ]

  listWard : any = [
    { id : "1", name : "Trieu"}
  ]


  constructor(
    
  ) {
    this.initForm();
  }

  private initForm() {
    this.formChangePass = new FormGroup({
      password: new FormControl(),
      newPassword: new FormControl(),
      reNewPassword: new FormControl()
    });

    this.formChangeInfo = new FormGroup({
      fullName: new FormControl(),
      gender: new FormControl(),
      birthday: new FormControl(),

      province: new FormControl(),
      district: new FormControl(),
      ward : new FormControl(),

      email: new FormControl(),
      phone: new FormControl(),
      

    });
  }


}

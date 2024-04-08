import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { AddressService } from 'src/app/core/services/address.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class SettingComponent {

  formChangePass:FormGroup;
  formChangeInfo: FormGroup;

  listGender : any = [
    { code : 'M' , name : 'Nam'},
    { code : 'F' , name : 'Nữ'},
    { code : 'O' , name : 'Khác'}
  ];
  listProvince : any = [];
  listDistrict : any = [];
  listWard : any = [ ];

  listDistrictSelected : any = [];
  listWardSelected : any = [];

  constructor(
    private addressService:AddressService
    
  ) {
    this.initForm();
    this.getProvince();
    this.getDistrict();
    this.getWard();
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

  getProvince(){
    this.addressService.getProvince().subscribe(res => {
      if(res){
        this.listProvince = res.data;
      }
    })
  }

  getDistrict(){
    this.addressService.getDistrict().subscribe(res => {
      if(res){
        this.listDistrict = res.data;
      }
    })
  }

  getWard(){
    this.addressService.getWard().subscribe(res => {
      if(res){
        this.listWard = res.data;
      }
    })
  }

  onProvinceChange(event: any) {
    if (event) {
      this.listDistrictSelected = this.listDistrict.filter((district: any) => district.provinceId === event.provinceId);
      
      this.formChangeInfo?.get('district')?.reset();
      this.formChangeInfo?.get('ward')?.reset();
  
      this.listWardSelected = []; // Clear the list of wards
    }
  }
  

  onDistrictChange(event: any) {  
    if (event) {
      this.listWardSelected = this.listWard.filter((ward: any) => ward.districtId === event.districtId);

      this.formChangeInfo?.get('ward')?.reset();
    }
  }

  saveInfo(){
    console.log(this.formChangeInfo.value)
  }


}

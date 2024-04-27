import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FileValidators } from 'ngx-file-drag-drop';
import { AddressService } from 'src/app/core/services/address.service';
import { FriendService } from 'src/app/core/services/friend.service';
import { ImgurApiService } from 'src/app/core/services/imgur-api.service';
import { MyFriendResponse } from 'src/app/model/friend.model';

@Component({
  selector: 'app-create-trip-modal',
  templateUrl: './create-trip-modal.component.html',
  styleUrls: ['./create-trip-modal.component.scss'],
  providers: [provideNativeDateAdapter(), ImgurApiService],
})
export class CreateTripModalComponent implements OnInit {
  form: FormGroup;
  listMyFriend: MyFriendResponse[] = [];
  uploadedFiles: { file: File, preview: string }[] = [];
  selectedCity: any;
  listAddress: any;
  fileControl = new FormControl();


  constructor(
    private formBuilder: FormBuilder,
    private friendService: FriendService,
    private addressService: AddressService,
    private imgurApiService: ImgurApiService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getMyFriend();
    this.getListAddress();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      title: [''],
      address: [''],
      startDate: [''],
      endDate: [''],
      members: [''],
      images: [''],
      desc: [''],
    });
  }

  onValueChange(files: File[]) {
    this.uploadedFiles = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    console.log(this.uploadedFiles)
    console.log('Files changed!');
  }

  getMyFriend() {
    const payload = {
      id: '19aefef3-4ae9-455a-87e9-dbf6ed496c98'
    };
    
    this.friendService.getMyFriend(payload).subscribe( 
      (res) => {
        this.listMyFriend = res.data.map((friend: any) => ({
          id: friend.id,
          name: friend.fullName,
          avatar: friend.urlAvatar
        }));
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }

  getListAddress() {
    this.addressService.getProvince().subscribe(provinceRes => {
      if (provinceRes && provinceRes.data) {
        this.listAddress = provinceRes.data.map((province: any) => ({
          code: province.provinceId,
          name: province.provinceName
        }));
      }
    });

    this.addressService.getDistrict().subscribe(districtRes => {
      if (districtRes && districtRes.data) {
        const listDistrict = districtRes.data.map((district: any) => ({
          code: district.districtId,
          name: district.districtName
        }));
        if (this.listAddress) {
          this.listAddress.push(...listDistrict);
        } else {
          this.listAddress = [...listDistrict];
        }
      }
    });
  }

  async create() {
    console.log(this.form.value);
    console.log(this.uploadedFiles);
  
    // Lặp qua từng hình ảnh trong uploadedFiles
    // for (const uploadedFile of this.uploadedFiles) {
    //   try {
    //     const base64Data: string = await this.blobToBase64(uploadedFile.preview);
    //     console.log('Base64 data:', base64Data);
    //     // Gọi phương thức upload() của ImgurApiService và truyền dữ liệu base64 vào
    //     this.imgurApiService.upload(base64Data).subscribe(
    //       (response) => {
    //         console.log('Upload successful:', response);
    //       },
    //       (error) => {
    //         console.error('Error uploading image to Imgur:', error);
    //       }
    //     );
    //   } catch (error) {
    //     console.error('Error converting blob to base64:', error);
    //   }
    // }
  }
  
  




  private async blobToBase64(blobUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = () => {
          reject('Error occurred while reading the blob as base64.');
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = () => {
        reject('Error occurred while fetching the blob.');
      };
      xhr.open('GET', blobUrl);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }
  
}

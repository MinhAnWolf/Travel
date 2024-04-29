import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FileValidators } from 'ngx-file-drag-drop';
import { AddressService } from 'src/app/core/services/address.service';
import { FriendService } from 'src/app/core/services/friend.service';
import { ImgurApiService } from 'src/app/core/services/imgur-api.service';
import { TripService } from 'src/app/core/services/trip.service';
import { UploadDriveService } from 'src/app/core/services/upload-drive.service';
import { MyFriendResponse } from 'src/app/model/friend.model';
import { UploadDriveResponse } from 'src/app/model/upload-drive.models';

@Component({
  selector: 'app-create-trip-modal',
  templateUrl: './create-trip-modal.component.html',
  styleUrls: ['./create-trip-modal.component.scss'],
  providers: [provideNativeDateAdapter(), ImgurApiService, UploadDriveService],
})
export class CreateTripModalComponent implements OnInit {
  form: FormGroup;
  listMyFriend: MyFriendResponse[] = [];
  uploadedFiles: { file: File, preview: string }[] = [];
  selectedCity: any;
  listAddress: any;
  listImage: any = [];
  fileControl = new FormControl();


  constructor(
    private formBuilder: FormBuilder,
    private friendService: FriendService,
    private addressService: AddressService,
    private imgurApiService: ImgurApiService,
    private tripService: TripService,
    private uploadDriveService: UploadDriveService
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
      description: [''],
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
          idUser: friend.idUser,
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
    try {
      // Mảng chứa các promise cho việc tải lên hình ảnh
      const uploadPromises = [];
  
      // Lặp qua từng hình ảnh trong uploadedFiles
      for (const uploadedFile of this.uploadedFiles) {
        const base64Data: string = await this.blobToBase64(uploadedFile.preview);
        const base64DataOnly = base64Data.split(',')[1];
        
        // Thêm promise cho việc tải lên hình ảnh vào mảng
        uploadPromises.push(
          new Promise<void>((resolve, reject) => {
            this.uploadDriveService.upload(base64DataOnly).subscribe((res: any) => {
              const itemImage = {
                linkImage : res.link
              }
              this.listImage.push(itemImage);
              resolve();
            }, error => {
              reject(error);
            });
          })
        );
      }
  
      // Chờ tất cả các promise tải lên hoàn thành
      await Promise.all(uploadPromises);
  
      // Sau khi tất cả các hình ảnh được tải lên, tiến hành tạo chuyến đi
      const payload = {
        title : this.form.value?.title,
        address: this.form.value?.address,
        startDate: this.formatDate(this.form.value.startDate),
        endDate: this.formatDate(this.form.value.endDate),
        description : this.form.value?.description,
        images : this.listImage,
        members : this.form.value?.members
      };
  
      console.log(payload);
  
      // Gọi hàm createTrip sau khi tải lên hình ảnh hoàn tất
      this.tripService.createTrip(payload).subscribe(res => {
        console.log(res);
      });
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  }
  


  // Function to format the date to yyyy-mm-dd format
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())}`;
  }

  // Function to add zero padding if needed
  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
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

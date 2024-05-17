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
import {Utils} from "../../../../shared/common/Utils";

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
      //upload image to server
      if (Utils.checkNull(this.uploadedFiles)) {
        const uploadPromises = [];
        for (const uploadedFile of this.uploadedFiles) {
          const base64Data: string = await Utils.blobToBase64(uploadedFile.preview);
          const base64DataOnly = base64Data.split(',')[1];
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
        //waiting upload success
        await Promise.all(uploadPromises);
      }

      // after upload image success then continue process create trip
      const payload = {
        title : this.form.value?.title,
        address: this.form.value?.address,
        startDate: Utils.formatDate(this.form.value.startDate),
        endDate: Utils.formatDate(this.form.value.endDate),
        description : this.form.value?.description,
        images : this.listImage,
        members : this.form.value?.members
      };
      this.tripService.createTrip(payload).subscribe(res => {
        console.log(res);
      });
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  }
}

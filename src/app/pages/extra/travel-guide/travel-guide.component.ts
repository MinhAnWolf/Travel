import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/core/services/address.service';


// ecommerce card
interface productcards {
  id: number;
  imgSrc: string;
  title: string;
}

@Component({
  selector: 'app-travel-guide',
  templateUrl: './travel-guide.component.html',
  styleUrl: './travel-guide.component.scss'
})
export class TravelGuideComponent implements OnInit{

  listAddress: any;

  constructor(
    private addressService: AddressService,
  ) {}

  ngOnInit(): void {
    this.getListAddress();
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


    // ecommerce card
    productcards: productcards[] = [
      {
        id: 1,
        imgSrc: 'https://ak-d.tripcdn.com/images/0100l12000adm7it2A2A7_C_400_280_R5.jpg_.webp',
        title: 'Hà Nội',
      },
      {
        id: 2,
        imgSrc: 'https://ak-d.tripcdn.com/images/100v0x000000lra8w0D50_C_400_280_R5.jpg_.webp',
        title: 'TP Hồ Chí Minh',
      },
      {
        id: 3,
        imgSrc: 'https://ak-d.tripcdn.com/images/100o0n000000e08cv00E8_C_400_280_R5.jpg_.webp',
        title: 'Đà Nẵng',
      },
      {
        id: 4,
        imgSrc: 'https://ak-d.tripcdn.com/images/100s0y000000mc3qf0838_C_400_280_R5.jpg_.webp',
        title: 'Nha Trang',
      },
      {
        id: 5,
        imgSrc: 'https://ak-d.tripcdn.com/images/01052120009bxxskn94F4_C_400_280_R5.jpg_.webp',
        title: 'Đà Lạt',
      },
      {
        id: 6,
        imgSrc: 'https://ak-d.tripcdn.com/images/0106v120008izr5fd0E2D_C_400_280_R5.jpg_.webp',
        title: 'Hải Phòng',
      },
      {
        id: 7,
        imgSrc: 'https://youimg1.tripcdn.com/target/0104i120008x16443A336_C_400_280_R5.jpg_.webp',
        title: 'Huế',
      },
      {
        id: 8,
        imgSrc: 'https://ak-d.tripcdn.com/images/0ww1b12000adz84qz7B1E_C_400_280_R5.jpg_.webp',
        title: 'Thành phố Vinh',
      },
    ];

}

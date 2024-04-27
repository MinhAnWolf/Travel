import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { AddressService } from 'src/app/core/services/address.service';
import { TripService } from 'src/app/core/services/trip.service';


interface ImageDataItem {
  srcUrl: string;
  previewUrl: string;
}

@Component({
  selector: 'app-my-trip-detail',
  templateUrl: './my-trip-detail.component.html',
  styleUrl: './my-trip-detail.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class MyTripDetailComponent implements OnInit{

  @Input() item : any = {
    tripId : '7725e4d9-2358-4657-8c1b-8bf27843e412'
  }

  form: FormGroup;
  editMode: boolean = false;
    originalFormValue: any;

  ngOnInit() {

    setTimeout(() => {
      const provinceControl = this.form.get('province');
      if (provinceControl && provinceControl.value) {
        console.log( provinceControl.value)
        this.listDistrictSelected = this.listDistrict.filter((district: any) => district.provinceId === provinceControl.value);
        console.log(this.listDistrictSelected)
      } 
    }, 2000);
    
  }

  items: GalleryItem[] = [];
  imageData: ImageDataItem[] = [];
  
  listMember:any = [
    { id: 'VIETMQ', name: 'Mai Quốc Việt', avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x' },
    { id: 'TRIEUNHD', name: 'Nguyễn Huỳnh Đông Triều', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    { id: 'THAINQ', name: 'Nguyễn Quốc Thái', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15' },
    { id: 'THUYPTK', name: 'Phạm Trương Kiến Thụy', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15' },
    { id: 'ANLTM', name: 'Lê Trương Minh An', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15' },
  ];

  listDistrictSelected : any = [];

 time: any;
  touristAttractions: any;
  urlGoogleMap: string;
  tableData: any[] = [];

  listProvince : any;
  listDistrict : any;

  listTouristAttractions = [
    { code: '1', name: 'Chợ quê Phước Thành' },
    { code: '2', name: 'Cafe chòi Chợt Nhớ' },
  ];

  displayedColumns: string[] = ['time', 'touristAttractions', 'urlGoogleMap', 'action'];

  constructor(
    public gallery: Gallery,
    public lightbox: Lightbox,
    private tripService : TripService,
    private addressService:AddressService
  )  {
    this.initForm();
    this.getTripDetail();
    this.getProvince();
    this.getDistrict();
  }

 

  addNewItem() {
    if (this.time && this.touristAttractions && this.urlGoogleMap) {
      this.tableData.push({
        time: this.time,
        touristAttractions: this.touristAttractions,
        urlGoogleMap: this.urlGoogleMap
      });
  
      // Clear form fields after adding item
      this.time = null;
      this.touristAttractions = null;
      this.urlGoogleMap = '';
    } else {
      alert('Missing data for adding new item')
    }
    console.log(this.tableData)
  }
  

  removeItem(index: number) {
    this.tableData.splice(index, 1);
  }

  onProvinceChange(event: any) {
    if (event) {
      this.listDistrictSelected = this.listDistrict.filter((district: any) => district.provinceId === event.provinceId);
      this.form?.get('district')?.reset();
    }
  }



  initForm() {
    this.form = new FormGroup({
        title: new FormControl({value: null, disabled: true}),
        touristAttraction: new FormControl({value: null, disabled: true}),
        startDate: new FormControl({value: null, disabled: true}),
        endDate: new FormControl({value: null, disabled: true}),
        province: new FormControl({value: null, disabled: true}),
        district: new FormControl({value: null, disabled: true}),
        members: new FormControl({value: null, disabled: true}),
        desc: new FormControl({value: null, disabled: true}),
    });
}

onEdit() {
    this.editMode = true;
    this.originalFormValue = this.form.value;
    // Enable form for editing
    this.form.enable();
}

onSave() {
    const json = {
      ...this.form.value,
      ...{timeline : this.tableData}
    }
    console.log(json)

    this.editMode = false;
    // Disable form after saving
    this.form.disable();
}

onCancel() {
    this.editMode = false;
    // Reset form value to original value
    this.form.patchValue(this.originalFormValue);
    // Disable form after cancelling
    this.form.disable();
}


  getTripDetail() {
    const payload = {
      c_id: '19aefef3-4ae9-455a-87e9-dbf6ed496c98',
      tripId: '7725e4d9-2358-4657-8c1b-8bf27843e412'
    };
  
    this.tripService.getTripDetail(payload).subscribe(res => {
      if (res && res.data) {
        this.imageData = res.data.images;
        this.tableData = res.data.timeline;
        const startDate = this.convertDateFormat(res.data.startDate);
        const endDate = this.convertDateFormat(res.data.endDate);
        const membersArray = res.data.members.split(',');
        this.form.patchValue({
          title: res.data.title,
          touristAttraction: res.data.touristAttraction,
          startDate: startDate,
          endDate: endDate,
          province: res.data.province,
          district: res.data.district,
          members: membersArray,
          desc: res.data.desc
        });

        this.items = this.imageData.map(
          (item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
        );
        const lightboxRef = this.gallery.ref('lightbox');
        lightboxRef.setConfig({
          imageSize: ImageSize.Cover,
          thumbPosition: ThumbnailsPosition.Top,
        });
        lightboxRef.load(this.items);
      }
    });
  }
  

  private convertDateFormat(dateString: string): string {
    const parts = dateString.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
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



}

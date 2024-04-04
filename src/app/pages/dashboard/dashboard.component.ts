import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TripService } from 'src/app/core/services/trip.service';
import { GetTimelineTripRequestModel } from 'src/app/model/get-timeline-trip-request.model';
import { TimelineTripModel } from 'src/app/model/timeline-trip.model';

interface month {
  value: string;
  viewValue: string;
}

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}

// ecommerce card
interface productcards {
  id: number;
  imgSrc: string;
  title: string;
  price: string;
  rprice: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Sunil Joshi',
    position: 'Web Designer',
    productName: 'Elite Admin',
    budget: 3.9,
    priority: 'low',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Andrew McDownland',
    position: 'Project Manager',
    productName: 'Real Homes Theme',
    budget: 24.5,
    priority: 'medium',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Christopher Jamil',
    position: 'Project Manager',
    productName: 'MedicalPro Theme',
    budget: 12.8,
    priority: 'high',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Nirav Joshi',
    position: 'Frontend Engineer',
    productName: 'Hosting Press HTML',
    budget: 2.4,
    priority: 'critical',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit {

  listTimelineTrip: TimelineTripModel[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private tripService : TripService
  ) {}

  ngOnInit(): void {
    this.getTimelineTrip();
  }


  getTimelineTrip(){
    this.spinner.show();

    const json:GetTimelineTripRequestModel = {
      email: 'dongtrieuit@gmail.com',
      tripId: 'f86f123b-890b-4ed7-984a-6b502c6d9dab',
    }

    this.tripService.getTimelineTrip(json).subscribe(
      (res) => {
        if(res && res.data){
          this.listTimelineTrip = res.data;
          setTimeout(() => {
            this.spinner.hide();
          }, 5000);
        }
      },
      (error) => {
        console.error('Error occurred:', error);
        setTimeout(() => {
          this.spinner.hide();
        }, 5000);
      }
    );
  }



  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource = ELEMENT_DATA;  

  // ecommerce card
  productcards: productcards[] = [
    {
      id: 1,
      imgSrc: '/assets/images/products/s4.jpg',
      title: 'Chợ quê - Đồng Tháp',
      price: '0đ',
      rprice: '100k',
    },
    {
      id: 2,
      imgSrc: '/assets/images/products/s5.jpg',
      title: 'Bờ kè Quận 2 - HCM',
      price: '20k',
      rprice: '50k',
    },
    {
      id: 3,
      imgSrc: '/assets/images/products/s7.jpg',
      title: 'Cầu Vàng - Đà Nẵng',
      price: '500k',
      rprice: '900k',
    },
    {
      id: 4,
      imgSrc: '/assets/images/products/s11.jpg',
      title: 'Phố Núi - Gia Lai',
      price: '300k',
      rprice: '400k',
    },
  ];

}

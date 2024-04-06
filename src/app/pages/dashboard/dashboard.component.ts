import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TripService } from 'src/app/core/services/trip.service';
import { GetTimelineTripRequestModel } from 'src/app/model/get-timeline-trip-request.model';
import { TimelineTripModel, TripData } from 'src/app/model/timeline-trip.model';


// ecommerce card
interface productcards {
  id: number;
  imgSrc: string;
  title: string;
  price: string;
  rprice: string;
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit {

  listTimelineTrip: TimelineTripModel[] = [];
  dataSource: TripData[] = [];

  displayedColumns: string[] = ['assigned', 'title', 'startDate', 'endDate'];

  constructor(
    private spinner: NgxSpinnerService,
    private tripService : TripService
  ) {}

  ngOnInit(): void {
    this.getListMyTrip();
  }


  getTimelineTrip(tripId:string){
    this.spinner.show();
    const payload:GetTimelineTripRequestModel = {
      email: 'dongtrieuit@gmail.com',
      tripId: tripId,
    }
    this.tripService.getTimelineTrip(payload).subscribe(
      (res) => {
        if(res && res.data){
          this.listTimelineTrip = res.data;
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);
        }
      },
      (error) => {
        console.error('Error occurred:', error);
        setTimeout(() => {
          this.spinner.hide();
        }, 1500);
      }
    );
  }

  getListMyTrip(){
    this.spinner.show();
    const payload = {
      "email":"dongtrieuit@gmail.com"
    }
    this.tripService.getListMyTrip(payload).subscribe( 
      (res) => {
        this.dataSource = res.data;
        setTimeout(() => {
          this.spinner.hide();
        }, 1500);
      },
      (error) => {
        console.error('Error occurred:', error);
        setTimeout(() => {
          this.spinner.hide();
        }, 1500);
      }
    );
  }





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

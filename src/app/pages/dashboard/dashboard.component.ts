import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

interface month {
  value: string;
  viewValue: string;
}

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
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
export class AppDashboardComponent {

  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource = ELEMENT_DATA;

  // recent transaction
  stats: stats[] = [
    {
      id: 1,
      time: '07.30 am',
      color: 'primary',
      subtext: 'Khởi hành: Nhà nghỉ 456',
    },
    {
      id: 2,
      time: '08.00 am',
      color: 'accent',
      title: 'Bờ kè Cao Lãnh',
      link: 'Xem vị trí bản đồ',
    },
    {
      id: 3,
      time: '08.30 pm',
      color: 'success',
      subtext: 'Di chuyển vào phà Phước Thành',
    },
    {
      id: 4,
      time: '09.00 pm',
      color: 'warning',
      title: 'KDL Chợ Quê Phước Thành',
      link: 'Xem vị trí bản đồ',
    },
    {
      id: 5,
      time: '12.30 pm',
      color: 'error',
      title: 'KDL Nam Phương Linh Từ',
      link: 'Xem vị trí bản đồ',
    },
    {
      id: 6,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Hủ tiếu bà Chiểu',
    },
  ];

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

  constructor() {


  }
}

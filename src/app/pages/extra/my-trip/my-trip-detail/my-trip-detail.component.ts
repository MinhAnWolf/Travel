import { ChangeDetectorRef, Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-my-trip-detail',
  templateUrl: './my-trip-detail.component.html',
  styleUrl: './my-trip-detail.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class MyTripDetailComponent {
  cities3 = [
    { id: 'VietMQ', name: 'Mai Quốc Việt', avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x' },
    { id: 'TrieuNHD', name: 'Nguyễn Huỳnh Đông Triều', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    { id: 'ThaiNQ', name: 'Nguyễn Quốc Thái', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15' },
    { id: 'ThuyPTK', name: 'Phạm Trương Kiến Thụy', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15' },
    { id: 'AnLTM', name: 'Lê Trương Minh An', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15' },
  ];

  selectedCity: any;
  selectedCityIds: string[];
  selectedCityName = 'Vilnius';
  selectedCityId: number;
  selectedUserIds: number[];


 time: any;
  touristAttractions: any;
  urlGoogleMap: string;
  tableData: any[] = [];

  listTouristAttractions = [
    { code: 1, name: 'Tourist Attraction 1' },
    { code: 2, name: 'Tourist Attraction 2' },
    // Add more tourist attractions as needed
  ];

  displayedColumns: string[] = ['time', 'touristAttractions', 'urlGoogleMap', 'action'];

  constructor(private cdr: ChangeDetectorRef) {}

  addNewItem() {
    console.log("ok");
    console.log(this.tableData);
      this.tableData.push({
        time: this.time,
        touristAttractions: this.touristAttractions.name,
        urlGoogleMap: this.urlGoogleMap
      });
      // Clear form fields after adding item
      this.time = null;
      this.touristAttractions = null;
      this.urlGoogleMap = '';

      // Trigger change detection to update the view
    
  }

  removeItem(index: number) {
    this.tableData.splice(index, 1);
  }
}

import { Routes } from '@angular/router';
// pages
import { AppIconsComponent } from './icons/icons.component';
import { AppSamplePageComponent } from './sample-page/sample-page.component';
import { MyTripComponent } from './my-trip/my-trip.component';
import { FriendComponent } from './friend/friend.component';
import { CalendaComponent } from './calenda/calenda.component';
import { MessagesComponent } from './messages/messages.component';
import { MapComponent } from './map/map.component';
import { SettingComponent } from './setting/setting.component';
import { MyTripDetailComponent } from './my-trip/my-trip-detail/my-trip-detail.component';
import { TravelGuideComponent } from './travel-guide/travel-guide.component';

export const ExtraRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'icons',
        component: AppIconsComponent,
      },
      {
        path: 'sample-page',
        component: AppSamplePageComponent,
      },
      {
        path: 'my-trip',
        component: MyTripComponent,
      },
      {
        path: 'my-trip/my-trip-detail',
        component: MyTripDetailComponent,
      },
      {
        path: 'friend',
        component: FriendComponent,
      },
      {
        path: 'calenda',
        component: CalendaComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'map',
        component: MapComponent,
      },
      {
        path: 'setting',
        component: SettingComponent,
      },
      {
        path: 'travel-guide',
        component: TravelGuideComponent,
      },
      
      
    ],
  },
];

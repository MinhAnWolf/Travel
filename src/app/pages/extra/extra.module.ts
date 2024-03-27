import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { ExtraRoutes } from './extra.routing';
import { AppIconsComponent } from './icons/icons.component';
import { AppSamplePageComponent } from './sample-page/sample-page.component';
import { MaterialModule } from 'src/app/material.module';
import { MyTripComponent } from './my-trip/my-trip.component';
import { MessagesComponent } from './messages/messages.component';
import { MapComponent } from './map/map.component';
import { CalendaComponent } from './calenda/calenda.component';
import { SettingComponent } from './setting/setting.component';
import { FriendComponent } from './friend/friend.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ExtraRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    AppIconsComponent,
    AppSamplePageComponent,
    MyTripComponent,
    MessagesComponent,
    MapComponent,
    CalendaComponent,
    SettingComponent,
    FriendComponent
  ],
})
export class ExtraModule {}

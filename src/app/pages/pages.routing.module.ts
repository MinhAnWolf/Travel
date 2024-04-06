import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from "../guard/auth.guard";

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
];

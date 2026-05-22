import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { ScheduleConfirmationPageComponent } from './pages/schedule-confirmation-page/schedule-confirmation-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: 'schedule',
    component: SchedulePageComponent
  },
  {
    path: 'schedule-confirmation',
    component: ScheduleConfirmationPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

import { Routes } from '@angular/router';
import { DoctorListComponent } from './pages/doctor-list/doctor-list.component';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { AuthGuard } from './auth.guard';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './pages/home/home.component'; // Import HomeComponent
import { MyappointmentsComponent } from './pages/myappointments/myappointments.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'doctors/:specialty', component: DoctorListComponent },
      { path: 'doctors/:id', component: DoctorDetailComponent },
      { path: 'appointments/:id', component: AppointmentsComponent },
      { path: 'appointments', component: MyappointmentsComponent },
      { path: 'myaccount', component: MyAccountComponent }
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '**', redirectTo: 'home' },
];
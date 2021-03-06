import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProfileComponent} from "./components/profile/profile.component";

import { AuthGuard } from "./guards/auth.guard";
import { AdminComponent } from './components/admin/admin.component';
import { BookingComponent } from './components/booking/booking.component';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  // {path: '**', redirectTo: '', pathMatch: 'full'},
  { path: 'admin',component: AdminComponent,canActivate: [AdminGuard] },
  // { path: 'mybooking',component: ViewBookingComponent,canActivate: [AuthGuard] },
  { path: 'viewBooking', loadChildren: () => import('./view-booking/view-booking.module').then(m => m.ViewBookingModule),canActivate: [AuthGuard] }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

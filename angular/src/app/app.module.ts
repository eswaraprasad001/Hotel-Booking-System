import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FlashMessagesModule} from 'angular2-flash-messages';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {ValidateService} from "./services/validate.service";
import {AuthService} from "./services/auth.service";
import { AdminComponent } from './components/admin/admin.component';
import { BookingComponent } from './components/booking/booking.component';
import { TokenInterceptor } from './services/token.interceptor';
import { ViewBookingComponent } from './components/view-booking/view-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AdminComponent,
    BookingComponent,
    ViewBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService,TokenInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }

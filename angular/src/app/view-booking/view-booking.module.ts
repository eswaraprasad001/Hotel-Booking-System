import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewBookingRoutingModule } from './view-booking-routing.module';
import { ViewBookingComponent } from './view-booking.component';


@NgModule({
  declarations: [
    ViewBookingComponent
  ],
  imports: [
    CommonModule,
    ViewBookingRoutingModule
  ]
})
export class ViewBookingModule { }

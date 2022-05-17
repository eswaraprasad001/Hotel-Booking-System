import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBookingComponent } from './view-booking.component';

const routes: Routes = [{ path: '', component: ViewBookingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewBookingRoutingModule { }

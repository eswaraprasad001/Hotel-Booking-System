import { Component, OnInit } from '@angular/core';
import { BookingServiceService } from '../services/booking-service.service';
import { HotelServiceService } from '../services/hotel-service.service';
import { UserServiceService } from '../services/user-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {

  allHotels!:any[];
  hotels!:any[];
  bookings!:any[] ;
  date = new Date();
 

  constructor(private hotel:HotelServiceService,
    private user:UserServiceService,
    private booking:BookingServiceService) { }

  ngOnInit(): void {
    console.log(new Date('2022-06-02T00:00:00.000+00:00'))
    this.hotel.getAllHotels().subscribe((data:any)=>{
      this.allHotels=data;
      console.log(this.allHotels)
    })
      this.booking.getBooking().subscribe((data:any)=> {
        var bookings = data;
        if (bookings) {
          this.hotel.getAllHotels().subscribe((dataHotels:any)=> {
            console.log(this.hotels)
            for (var i = 0; i < bookings.length; i += 1) {
              var booking = bookings[i];
              bookings[i].hotel = this.getById(dataHotels, booking.hotel);
            }
            this.bookings = bookings;
          });
        }
      });
  }
  getById(arr: string | any[], id: any) {
    for (var d = 0, len = arr.length; d < len; d += 1) {
      if (arr[d]._id === id) {
        return arr[d];
      }
    }
  };

  cancelBooking(id: any) {
    console.log(id)
    this.booking.deleteBooking(id).subscribe((data: any)=> {
      console.log("edeeee")
      location.reload();
    });
  };


}

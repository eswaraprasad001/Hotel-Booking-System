import { Component, OnInit } from '@angular/core';
import { HotelServiceService } from 'src/app/services/hotel-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { BookingServiceService } from 'src/app/services/booking-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allHotels!:any[];
  hotels!:any[];
  bookings!:any[] ;
  term=HotelServiceService.term;
  isSearch=true;

  constructor(private hotel:HotelServiceService,
    private user:UserServiceService,
    private booking:BookingServiceService) { }

  ngOnInit() {

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
    searchHotels() {
      this.hotel.searchHotel(this.term).subscribe((data:any) =>{
        console.log(this.term)
        if (data.length > 0) {
          this.hotels = data;
          HotelServiceService.term = this.term;
        }
        this.isSearch=!this.isSearch;
      });
    }
    cancelBooking(id: any) {
      this.booking.deleteBooking(id).subscribe((data: any)=> {
        this.ngOnInit();
      });
    };




  }








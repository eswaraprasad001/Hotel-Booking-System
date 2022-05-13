import { Component, OnInit } from '@angular/core';
import { HotelServiceService } from 'src/app/services/hotel-service.service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit,  ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  display=true;
  currentbooking :any ;
  currenthotel : any;
  hotelid!: any
  confirmBooking!:any
  name!:any
  email!:any
  PhoneNo!:any
  noOfRooms!:any
  guests!:any
  roomType!: any
  checkInDate!:Date
  checkOutDate!:Date
  hotelBooking:any;
  finalRate!:any;
  displayRate!:any
  finalAmount!:any
  constructor(private route: ActivatedRoute,private hotel:HotelServiceService,
    private booking:BookingServiceService,private router: Router, private flashMessagesService: FlashMessagesService) { }
    

    
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.hotelid = params['_id'];
      this.roomType=params['roomType']
      this.finalAmount=params['rate']
      console.log(this.finalRate); // price
    }
    ); 
      this.hotel.getHotel(this.hotelid).subscribe((data)=> {
        this.currenthotel = data;
        //console.log(this.currenthotel)
      });
  }

  bookHotel(){
    
    const newBooking = {
    name:this.name,
    email:this.email,
    PhoneNo:this.PhoneNo,
    noOfRooms:this.noOfRooms,
    guests:this.guests,
    roomType: this.roomType,
    checkInDate: this.checkInDate,
    checkOutDate: this.checkOutDate,
    hotel: this.currenthotel,
    finalAmount:this.finalRate
    };
    this.finalRate=this.finalRate*this.noOfRooms
    console.log(newBooking)
    this.booking.createBooking(newBooking).subscribe((data:any)=> {
      if(data.success){
        console.log(data);
      }
    });
    this.flashMessagesService.show('Your Booking is Confirmed', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['mybooking']);
  };

  // backToSearch(){
  //   this.flashMessagesService.show('You are now logged in as Admin', {cssClass: 'alert-success', timeout: 5000});
  //   this.router.navigate(['dashboard']);
  // }
  proceed(){
    this.display=!this.display
  }





  preventSingleClick = false;
  timer: any;
  delay!: Number;
  // this.finalRate=this.finalRate*this.noOfRooms;
  singleClick(event: any) {
    this.preventSingleClick = false;
     const delay = 200;
      this.timer = setTimeout(() => {
        if (!this.preventSingleClick) {
        this.finalRate=this.finalAmount*this.noOfRooms;
        //  this.displayRate=!this.displayRate
        }
        
      }, delay);
  }

    doubleClick (event: any) {
      this.preventSingleClick = true;
      clearTimeout(this.timer);
      console.log("hello")
      this.bookHotel()
    }

}

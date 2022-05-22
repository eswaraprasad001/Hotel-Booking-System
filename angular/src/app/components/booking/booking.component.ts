import { Component, OnInit } from '@angular/core';
import { HotelServiceService } from 'src/app/services/hotel-service.service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from 'src/app/services/validate.service';
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
  paymentHandler: any = null;
  success: boolean = false
  failure:boolean = false

  constructor(private route: ActivatedRoute,private hotel:HotelServiceService,
    private booking:BookingServiceService,private router: Router,
    private validateService:ValidateService, private flashMessagesService: FlashMessagesService) { }
    

    
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
        console.log(this.currenthotel)
      });
      this.invokeStripe();
      //console.log(this.currenthotel)
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
   
    if(this.validateService.validateCheckInDate(this.checkInDate) && this.validateService.validateCheckOutDate(this.checkInDate,this.checkOutDate)) {

      console.log(newBooking)
      this.booking.createBooking(newBooking).subscribe((data:any)=> {
        if(data.success){
          console.log(data);
        }
      });
      this.flashMessagesService.show('Your Booking is Confirmed', {cssClass: 'alert-success', timeout: 5000});
          //this.router.navigate(['viewBooking']);
      
    }
    else{
      this.flashMessagesService.show('Please enter a valid Check-In & Check-Out date', { cssClass: 'alert-danger', timeout: 3000});
    }
    //this.flashMessagesService.show('Please enter a valid date', { cssClass: 'alert-danger', timeout: 3000});

  };

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
          if(this.validateService.validateCheckInDate(this.checkInDate) && this.validateService.validateCheckOutDate(this.checkInDate,this.checkOutDate)){
        this.finalRate=this.finalAmount*this.noOfRooms;
          }
          else{
            this.flashMessagesService.show('Please enter a valid Check-In & Check-Out date', { cssClass: 'alert-danger', timeout: 3000});
          }
        //  this.displayRate=!this.displayRate
        //console.log(this.validateService.validateCheckInDate(this.checkInDate) && this.validateService.validateCheckOutDate(this.checkInDate,this.checkOutDate))
        }
        
      }, delay);
  }

    doubleClick (event: any) {
      this.preventSingleClick = true;
      clearTimeout(this.timer);
      
      this.makePayment(this.finalRate)
    }

    makePayment(amount: number) {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51L1OJWSGdpiEKZzukoZv818ylyWxtEphgw1GKBZCjbIBpedk79fLj7EQZ3P2tELqNazSi8gqkyd6B4ohy25WfE3f00T9ElL96s',
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken);
          paymentstripe(stripeToken);
        },
      });
  
      const paymentstripe = (stripeToken: any) => {
        this.booking.makePayment(stripeToken,amount,this.email).subscribe((data: any) => {
          console.log(data);
          if (data.data === "success") {
            this.bookHotel()
            this.router.navigate(['dash'])
          }
          else {
            this.failure = true
          }
        });
      };
  
      paymentHandler.open({
        name: 'StayCation',
        description: 'Confirm your Booking',
        amount: amount * 100,
      });
    }






    invokeStripe() {
      if (!window.document.getElementById('stripe-script')) {
        const script = window.document.createElement('script');
        script.id = 'stripe-script';
        script.type = 'text/javascript';
        script.src = 'https://checkout.stripe.com/checkout.js';
        script.onload = () => {
          this.paymentHandler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_51L1OJWSGdpiEKZzukoZv818ylyWxtEphgw1GKBZCjbIBpedk79fLj7EQZ3P2tELqNazSi8gqkyd6B4ohy25WfE3f00T9ElL96s',
            locale: 'auto',
            token: function (stripeToken: any) {
              console.log(stripeToken);
            },
          });
        };
  
        window.document.body.appendChild(script);
      }
    }


}

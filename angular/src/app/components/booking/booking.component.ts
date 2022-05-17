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
        this.router.navigate(['viewBooking']);
  };

  // backToSearch(){
  //   this.flashMessagesService.show('You are now logged in as Admin', {cssClass: 'alert-success', timeout: 5000});
  //   this.router.navigate(['dashboard']);
  // }
  proceed(){
    this.display=!this.display
  }
  // A single convolutional network simultaneously predicts multiple bounding boxes and class probabilities for those boxes. YOLO trains on full images and directly optimizes detection performance. This unified model has several benefits over traditional methods of object detection. First, YOLO is extremely fast. Since we frame detection as a regression problem we don’t need a complex pipeline. We simply run our neural network on a new image at test time to predict detections. Our base network runs at 45 frames per second with no batch processing on a Titan X GPU and a fast version runs at more than 150 fps. This means we can process streaming video in real-time with less than 25 milliseconds of latency.

  // Second, YOLO reasons globally about the image when making predictions. Unlike sliding window and region proposal-based techniques, YOLO sees the entire image during training and test time so it implicitly encodes contextual information about classes as well as their appearance. Fast R-CNN, a top detection method, mistakes background patches in an image for objects because it can’t see the larger context. YOLO makes less than half the number of background errors compared to Fast R-CNN.
  
  // Third, YOLO learns generalizable representations of objects. When trained on natural images and tested on artwork, YOLO outperforms top detection methods like DPM and R-CNN by a wide margin. Since YOLO is highly generalizable it is less likely to break down when applied to new domains or unexpected inputs.
  




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

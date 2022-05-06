import { Component, OnInit } from '@angular/core';
import { HotelServiceService } from 'src/app/services/hotel-service.service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  currentbooking :any ;
  currenthotel : any;
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  hotelid!: any
  confirmBooking!:any
  test:any;
  months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  options = [
    {
      name: "Single Bed",
      type: "basic",
    },
    {
      name: "Double Bed",
      type: "basic",
    },
    {
      name: "Double Bed",
      type: "deluxe",
    },
    {
      name: "King Size Bed",
      type: "Maharaja",
    },
    {
      name: "Suite",
      type: "Lake View",
    },
  ];
  creditCardName="eswar";
  checkInDate= '2022-05-04T00:00:00.000+00:00';
  checkOutDate= '2022-06-04T00:00:00.000+00:00';
  month= 2;
  year=2025;
  roomType="basic";
  creditCard=5469938123938171;
  securityCode=123;
  hotelBooking:any;
  constructor(private route: ActivatedRoute,private hotel:HotelServiceService,
    private booking:BookingServiceService,private router: Router, private flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.hotelid = params['_id'];
      console.log(this.hotelid); // price
    }
    ); 
      this.hotel.getHotel(this.hotelid).subscribe((data)=> {
        this.currenthotel = data;
        console.log(this.currenthotel)
      });
  }

  bookHotel(){
    const newBooking = {
      month: this.month,
      year: this.year,
      roomType: this.roomType,
      creditCard: this.creditCard,
      securityCode: this.securityCode,
      checkOutDate: this.checkOutDate,
      checkInDate: this.checkInDate,
      creditCardName: this.creditCardName,
      hotel: this.currenthotel
    };
    console.log(newBooking)
    console.log(newBooking.hotel)
    console.log( this.hotel)
    this.booking.createBooking(newBooking).subscribe((data:any)=> {
      if(data.success){
        console.log(data);
      }
    });
  };

  backToSearch(){
    this.flashMessagesService.show('You are now logged in as Admin', {cssClass: 'alert-success', timeout: 5000});
    this.router.navigate(['dashboard']);
  }

	proceed(){
		if (true) 
    {
			this.confirmBooking = true;
		}
		};

}

import { Component, OnInit } from '@angular/core';
import { HotelServiceService } from 'src/app/services/hotel-service.service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { ActivatedRoute } from '@angular/router';


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
  // months = local.DATETIME_FORMATS.MONTH;
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
  constructor(private route: ActivatedRoute,private hotel:HotelServiceService,
    private booking:BookingServiceService) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.hotelid = params['_id'];
      console.log(this.hotel); // price
    }
    ); 
      ()=>{
      this.hotel.getHotel(this.hotelid).subscribe((data)=> {
        this.currenthotel = data;
      });
    };
  }


}

import { Component, OnInit } from '@angular/core';
import { HotelServiceService } from 'src/app/services/hotel-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 hotels!:any[] 
 users!:any[] 
 newHotel!:any[]
 addHotel!:boolean
 name!: String
 address!: String
 zip!: String
 city!: String
 state!: String
 rate!: Number
 roomCount!: Number

  constructor(private hotel:HotelServiceService,
              private user:UserServiceService) { }

  ngOnInit(): void {
    this.user.getUsers().subscribe((data:any)=> {
      console.log(data);
      this.users = data;
    });
    this.hotel.getAllHotels().subscribe((data:any)=> {
      console.log(data)
      this.hotels = data;
    });
  }


  createHotel(){
    const hotelData={
      name: this.name,
      address: this.address,
      zip: this.zip,
      city: this.city,
      state: this.state,
      rate: this.rate,
      roomCount: this.roomCount
    }
    console.log(hotelData)


      this.hotel.createHotel(hotelData).subscribe((data: any) => {
        if (data.success) {
          this.addHotel=!this.addHotel;
        }
        location.reload();
  })
};
  deleteUser(id: any){
    console.log(id)
    this.user.deleteUser(id).subscribe((data: any) => {
      if (data.success) {
          console.log("user deleted")
      }
      location.reload();
    })
  };
  deleteHotel(id: any){
    this.hotel.deleteHotel(id).subscribe((data: any) => {
      if (data.success) {
          console.log("hotel deleted")
      }
      location.reload();
    })
  };

  setTrue(){
    this.addHotel=!this.addHotel;
  }

}

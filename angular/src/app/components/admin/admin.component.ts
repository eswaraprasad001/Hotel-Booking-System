import { Component, OnInit } from '@angular/core';
import { HotelServiceService } from 'src/app/services/hotel-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AuthService } from 'src/app/services/auth.service';
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
 url!:String
 uname!: String
 uaddress!: String
 uzip!: String
 ucity!: String
 ustate!: String
 urate!: Number
 uroomCount!: Number
 uurl!:String
 uid!:String
 currentHotel!:any
 updateDisplay!:boolean

  constructor(private auth:AuthService,
              private hotel:HotelServiceService,
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
getHotel(id:any){
  this.hotel.getHotel(id).subscribe((data)=>{
    this.currentHotel=data;
    console.log(this.currentHotel)
    this.uname=this.currentHotel.name
    this.uaddress=this.currentHotel.address
    this.ucity=this.currentHotel.city
    this.uzip=this.currentHotel.zip
    this.ustate=this.currentHotel.state
    this.urate=this.currentHotel.rate
    this.uroomCount=this.currentHotel.roomCount
    this.uurl=this.currentHotel.url
    this.uid=this.currentHotel._id
  })
  
  this.updateDisplay=true

  console.log(this.uurl)
  
}


  createHotel(){
    const hotelData={
      name: this.name,
      address: this.address,
      zip: this.zip,
      city: this.city,
      state: this.state,
      rate: this.rate,
      roomCount: this.roomCount,
      url:this.url
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
updateHotel(){
  const hotelData={
    name: this.uname, 
    address: this.uaddress,
    zip: this.uzip,
    city: this.ucity,
    state:this.ustate,
    rate: this.urate, 
    roomCount: this.uroomCount,
    url: this.uurl
  }

  this.hotel.updateHotel(this.uid,hotelData).subscribe((data:any)=>{

      this.updateDisplay=!this.updateDisplay;
  location.reload();
  })

}


  setTrue(){
    this.addHotel=!this.addHotel;
  }
  setUpdate(){
    this.updateDisplay=!this.updateDisplay;
  }

}

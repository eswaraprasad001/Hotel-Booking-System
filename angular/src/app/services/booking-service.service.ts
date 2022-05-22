import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  authToken: any;

  constructor(private http: HttpClient) {
    const jwthelper = new JwtHelperService()
   }

   getBooking(){
     
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.get("http://localhost:3000/users/api/bookings",{headers: headers})
   }

   loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
   createBooking(bookingData: any){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.post("http://localhost:3000/users/api/bookings", bookingData,{headers: headers});
  }
  deleteBooking(id: string){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.delete("http://localhost:3000/users/api/bookings/" + id,{headers: headers});
  }

  makePayment(stripeToken: any,amount:any,email:any){

    return this.http.post("http://localhost:3000/users/checkout",{token:stripeToken,amount:amount,email:email})
  }
  }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {

  authToken: any;
  static term: null;

  constructor(private http: HttpClient) {
    const jwthelper = new JwtHelperService()
   }


  getAllHotels() {

    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.get("http://localhost:3000/users/api/hotels/",{headers: headers})
  }
  getHotel(id:any) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.get("http://localhost:3000/users/api/hotels/" + id,{headers: headers})
  }

  createHotel(hotelData: any){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.post("http://localhost:3000/users/api/admin/hotels", hotelData,{headers: headers});
  }
  deleteHotel(id: any){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.delete("http://localhost:3000/users/api/admin/hotels/" + id,{headers: headers});
  }
  searchHotel(term: any) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.post("http://localhost:3000/users/api/hotels/search", { term: term },{headers: headers})
  }
  updateHotel(id:any,bookingData:any){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.put("http://localhost:3000/users/api/admin/updatehotel/"+ id,bookingData,{headers: headers})

  }


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}


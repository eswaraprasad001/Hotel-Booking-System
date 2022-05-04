import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  authToken: any;


  constructor(private http: HttpClient) { 
    const jwthelper = new JwtHelperService()
  }


  getUsers(){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.get("http://localhost:3000/users/api/admin/users/",{headers: headers})
  
  }
  createUser(userData: any) {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.post("http://localhost:3000/users/register", userData,{headers: headers});
  }
  deleteUser(id: any) {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.delete("http://localhost:3000/users/api/admin/users/" + id,{headers: headers});
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}

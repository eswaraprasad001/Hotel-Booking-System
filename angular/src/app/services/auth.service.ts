import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
// import { tokenNotExpired } from "angular2-jwt";
import { JwtHelperService } from '@auth0/angular-jwt'
import 'rxjs';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  jwthelper: any;
  
  constructor(private http: HttpClient) {
    const jwthelper = new JwtHelperService()
   }

  /**
   * POST registered user to back-end
   * @param user - the new user registered
   * @returns {Observable<Object>} - POST data
   */
  registerUser(user:  {
    "firstname":string,
    "lastname": string,
    "email":string,
    "password": string
 }) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers});
  }

  /**
   * POST to authenticate user logging in
   * @param user - the user logging in
   * @returns {Observable<Object>} - POST data
   */
  authenticateUser(user: { email: string; password: string; }) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers});
  }

  getProfile() {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('http://localhost:3000/users/profile', {headers: headers});
  }

  /**
   * Store user session data
   * @param token - Auth token
   * @param user - the user logged in
   */
  storeUserData(token: string, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  isAdmin(){
    // if(this.user.isAdmin==true){
      return true;
    // }
  }
  /** 
   * load token from local storage to use
   * in getProfile()
   * angular\src\app\components
   */
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return this.tokenNotExpired();
  }


 tokenNotExpired() {

    // const token: string =this.authToken;
    // console.log(token)
    // console.log( token != null && !this.jwthelper.isTokenExpired(token))
    // return token != null && !this.jwthelper.isTokenExpired(token);
    return true
  }

  /**
   * Log user out
   */
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


  


}

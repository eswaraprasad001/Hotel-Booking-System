import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
// import { tokenNotExpired } from "angular2-jwt";
import { JwtHelperService } from '@auth0/angular-jwt'
import 'rxjs';
import { tap } from 'rxjs';

const jwtHelper = new JwtHelperService();
@Injectable()
export class AuthService {
  authToken: any|undefined;
   refreshToken : any|undefined
  user: any;
  
  constructor(private http: HttpClient) {

   }

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
   */
  storeUserData(token: string, user: any,refreshToken:any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('admin', user.isAdmin);
    this.authToken = token;
    this.user = user;
    // this.admin=this.user.isAdmin;
    this.refreshToken=refreshToken;
  }
  refreshtoken() {
    return this.http.post<any>('http://localhost:3000/users//refresh', {
      'refreshToken': this.refreshToken
    })
    
  }

  setToken(token:any){
    const jwt=this.refreshtoken().subscribe((data)=>{
      token=data
      console.log(data)
    })
    localStorage.setItem('id_token', token)
    this.authToken=jwt;

  }
  getJwtToken() {
    return localStorage.getItem('id_token');
  }

  isAdmin(){

     const i= localStorage.getItem('admin')
    return (i === 'true');;
  }

  /** 
   * load token from local storage to use
   * in getProfile()
   * angular\src\app\components
   */
  loadToken() {
    const token = localStorage.getItem('id_token');
    console.log(token)
    this.authToken = token;
    // console.log(this.authToken)
  }

  loggedIn() {
    //const token = JSON.parse(localStorage.getItem('id_token') || '{}');
    // console.log(this.authToken)
    // Check if the token is expired and return true or false
    // console.log();
    // console.log(this.authToken)
    // console.log(jwtHelper.isTokenExpired(this.authToken))
    // console.log(this.admin)
    const token= localStorage.getItem('id_token') || undefined;
    // console.log(token)
    // console.log(!jwtHelper.isTokenExpired(token))
    return !jwtHelper.isTokenExpired(token);
  }

  // isAdmin(){
  // if(this.user.isAdmin===true){
  // return true
  // }
  // else{
  //   return false
  // }
  // }


  /**
   * Log user out
   */
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }





}

import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  /**
   * Check for empty fields
   * @param user -  the user's information from the input fields
   * @returns {boolean} - false if there are any empty fields else true
   */
  validateRegister(user: { name?: string; email: any; username?: string; password: any; firstname?: any; lastname?: any; }) {
    return !(user.email == undefined || user.firstname == undefined ||
      user.lastname == undefined || user.password == undefined)
  }

  /**
   * Check if email is valid
   * @param email - the email the user is using to register
   * @returns {boolean} - false if not a valid email else true
   */
  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateLogin(user: { email?: string; password: any;}) {
    return !(user.email == undefined || user.password == undefined);
  }
  validatePassword(password:string){
    const re=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password)
  }
  validateCheckInDate(date:Date){
      var varDate = new Date(date); //dd-mm-YYYY
      var today = new Date();
      today.setHours(0,0,0,0);

      if(varDate >= today) 
      {
       return true
      }
      return false

  }
  validateCheckOutDate(checkin:Date,checkout:Date){
    var varDate = new Date(checkin); //dd-mm-YYYY
    var date = new Date(checkout);

    if(date > varDate) 
    {
     return true
    }
    return false

}

}

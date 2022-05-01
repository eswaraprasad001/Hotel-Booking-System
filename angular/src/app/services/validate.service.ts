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

}

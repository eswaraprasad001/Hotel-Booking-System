import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService} from "angular2-flash-messages";

import {AuthService} from "../../services/auth.service";
import {ValidateService} from "../../services/validate.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    if (!this.validateService.validateLogin(user)) {
      this.flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.authenticateUser(user).subscribe((data: any) => {
      if (data.success) {
        this.authService.admin=data.user.isAdmin
        if(data.user.isAdmin===true){
          this.authService.storeUserData(data.token, data.user,data.refreshToken);
          this.flashMessagesService.show('You are now logged in as Admin', {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['admin']);
        }
        else{
        this.authService.storeUserData(data.token, data.user,data.refreshToken);
        this.flashMessagesService.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['dashboard']);
      }
      } else {
        this.flashMessagesService.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
    });
  }

}

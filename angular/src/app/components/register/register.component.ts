import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {ValidateService} from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email!: string;
  password!: string;
  firstname!: string;
  lastname!: string;


  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname
    };

    /** Vallidations **/
    if (!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if(!this.validateService.validatePassword(user.password)){
      this.flashMessagesService.show('Please use Minimum eight characters, at least one letter and one number', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    // this.matching_passwords_group = new FormGroup({
    //   password: new FormControl('', Validators.compose([
    //      Validators.minLength(5),
    //      Validators.required,
    //      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
    //   ]))
    /** End Validations **/

    // Register User using Back-end
    this.authService.registerUser(user).subscribe((data: any) => {
      if (data.success) {
        this.flashMessagesService.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/login']);
      }
    });
  }

}

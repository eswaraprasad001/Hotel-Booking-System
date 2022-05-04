import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: any|null;
  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.getProfile().subscribe((data:any) => {
        this.user = data;
        console.log(data)
      },
      err => {
        console.log(err);
        return false;
      });
  }

}

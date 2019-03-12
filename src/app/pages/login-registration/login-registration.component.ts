import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.scss']
})
export class LoginRegistrationComponent implements OnInit {
  
  user: any = {};
  registration: boolean;
  login: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    
  }
  
  getLoginTrigger($event) {
    this.login = $event;
    this.registration = !this.login;
  }

  getRegistrationTrigger($event) {
    this.registration = $event;
    this.login = !this.registration;
  }

  getRegistrationValues($event) {
    this.user = $event;
    this.userService.storeUser(this.user);
  }

  getLoginValues($event) {
    this.user = $event;
    this.userService.checkUserLogin(this.user);
  }

}

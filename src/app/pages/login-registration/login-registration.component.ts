import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.scss']
})
export class LoginRegistrationComponent implements OnInit {

  registration: boolean = false;
  login: boolean = false;
  user: any = {};

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  private clickHandlerLogin() {
    this.registration = false;
    this.login = true;
  }

  private clickHandlerRegistration() {
    this.registration = true;
    this.login = false;
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

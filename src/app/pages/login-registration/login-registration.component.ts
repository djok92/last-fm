import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.scss']
})
export class LoginRegistrationComponent implements OnInit {

  registration: boolean = true;
  login: boolean = false;

  constructor() { }

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
    console.log($event);
  }

}

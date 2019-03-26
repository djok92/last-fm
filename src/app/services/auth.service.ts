import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  _loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn = false;

  checkUserLogin(input, users): boolean {
    const userEmail = users.find((user: User) => user.email === input.email);
    const userPassword = users.find((user: User) => user.password === input.password);
    if (userEmail && userPassword) {
      return true;
    } else {
     return false;
    }
  }

  checkUserRegistration(input, users): boolean { // ovde stao treba da radis auth
    const userEmail = users.find((user: User) => user.email === input.email);
    if (!userEmail) {
      return true;
    } else {
      return false;
    }
  }
}

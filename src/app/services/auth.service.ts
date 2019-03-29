import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  // videti login da li kao observable ili samo ovako kao property to je isto ostalo da se pogleda na osnovu toga aktivirati guard
  _loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn = false;

  checkUserLogin(input, users): boolean {
    const userEmail = users.find((user: User) => user.email === input.email);
    const userPassword = users.find(
      (user: User) => user.password === input.password
    );
    if (userEmail && userPassword) {
      this._loggedIn$.next(true);
      return true;
    } else {
      this._loggedIn$.next(false);
      return false;
    }
  }

  getLoginStatus() {
    return this._loggedIn$.asObservable();
  }

  checkUserRegistration(input, users): boolean {
    const userEmail = users.find((user: User) => user.email === input.email);
    if (!userEmail) {
      return true;
    } else {
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // videti login da li kao observable ili samo ovako kao property to je isto ostalo da se pogleda na osnovu toga aktivirati guard
  // _loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _token$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  loggedIn = false;

  checkUserLogin(input, users): boolean {
    const userEmail = users.find((user: User) => user.email === input.email);
    const userPassword = users.find((user: User) => user.password === input.password);
    if (userEmail && userPassword) {
      this._token$.next(Date.now());
      return true;
    } else {
     return false;
    }
  }

  checkUserRegistration(input, users): boolean {
    const userEmail = users.find((user: User) => user.email === input.email);
    if (!userEmail) {
      return true;
    } else {
      return false;
    }
  }

  setToken() {
    this._token$.next(Date.now() / 1000);
    return this._token$.asObservable();
  }
}

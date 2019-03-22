import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];
  private _user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  loggedIn = false;

  constructor() {}

  private mapUser(data: any) {
    return new User({
      userName: data.userName,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      image: data.file,
      age: data.age
    });
  }

  storeUser(user) {
    const newUser = this.mapUser(user);
    this.users.push(newUser);
    localStorage.setItem('USERS', JSON.stringify(this.users));
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('USERS'));
    this._user$.next(user[0]);
    return this._user$.asObservable();
  }

  checkUserLogin(user) {
    return this.users.filter((storedUser: any) => {
      if (
        storedUser.password === user.password &&
        storedUser.email === user.email
      ) {
        console.log(storedUser);
      } else {
        console.log('nothing is the same :(');
      }
    });
  }
}

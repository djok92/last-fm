import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];
  private _users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private _loggedUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

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

  getUsers(): Observable<User[]> {
    const users = JSON.parse(localStorage.getItem('USERS'));
    this._users$.next(users);
    return this._users$.asObservable();
  }

  getUser(): Observable<User> {
    return this._loggedUser$.asObservable();
  }

  setUser(user) {
    this._loggedUser$.next(user);
  }
}

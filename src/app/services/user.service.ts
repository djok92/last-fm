import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: any[] = [];

  constructor() { }

  private mapUser(data: any) {
    return new User({
      userName: data.userName,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      image: null,
      age: data.age
    })
  }

  storeUser(user) {
    const newUser = this.mapUser(user);
    this.users.push(newUser);
    localStorage.setItem("USERS", JSON.stringify(this.users));
  }

  checkUserLogin(user) {
    return this.users.filter((storedUser: any) => {
      if(storedUser.password === user.password && storedUser.email === user.email) {
        console.log(storedUser);
      }
        else {
        console.log("nothing is the same :(")
      }
    });
  }
}

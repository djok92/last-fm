export class User {
  userName: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
  age: number;

  constructor(user: any = {}) {
    Object.assign(this, {
      userName: user.userName || null,
      name: user.name || null,
      lastName: user.lastName || null,
      email: user.email || null,
      password: user.password || null,
      image: user.image || null,
      age: user.age || null
    });
  }
}

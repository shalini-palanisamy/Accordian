// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = [
    { username: 'user1@gmail.com', password: 'password1' },
    { username: 'user2@gmail.com', password: 'password2' },
    // Add more users as needed
  ];

  getUser(username: string) {
    console.log(this.users);
    return this.users.find((user) => user.username === username);
  }

  setUser(user: { username: string; password: string }) {
    console.log(this.users);
    // Add logic to prevent adding duplicate users if needed
    this.users.push(user);
  }
}

// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = [
    { email: 'shalini.palanisamy@idp.com', password: 'password1' },
    { email: 'user@idp.com', password: 'password2' },
    // Add more users as needed
  ];

  getUser(email: string) {
    return this.users.find(user => user.email === email);
  }
  setUser(user: { email: string, password: string }) {
    // Add logic to prevent adding duplicate users if needed
    this.users.push(user);
  }
}

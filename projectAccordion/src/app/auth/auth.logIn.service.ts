import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService) {}

  login(username: string, password: string): boolean {
    const user = this.userService.getUser(username);

    if (user && user.password === password) {
      // Authentication successful
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }

    // Authentication failed
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  signUp(username: string, password: string): boolean {
    // Check if the username is already taken
    if (!this.userService.getUser(username)) {
      this.userService.setUser({ username, password });
      return true;
    }

    return false;
  }
}
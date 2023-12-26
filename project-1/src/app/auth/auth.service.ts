import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService) {}

  login(email: string, password: string): boolean {
    const user = this.userService.getUser(email);

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
    const userString = localStorage.getItem('currentUser');
    if (userString !== null) {
      return JSON.parse(userString);
    }
    return null; // or handle this case based on your requirements
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  signUp(email: string, password: string): boolean {
    // Check if the username is already taken
    if (!this.userService.getUser(email)) {
      this.userService.setUser({ email, password });
      return true;
    }

    return false;
  }
}
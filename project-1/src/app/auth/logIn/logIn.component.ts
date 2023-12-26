import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,  } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-logIn',
  templateUrl: './logIn.component.html',
  styleUrls: ['./logIn.component.css'],
})
export class LogInComponent implements OnInit {
    logInForm: FormGroup;
    error = null;
    constructor(
        private route: Router, // Router for navigation.
        private authService: AuthService
      ) {
        this.logInForm = new FormGroup({
            email: new FormControl(null, [
              Validators.required, // Email field is required.
              Validators.email, // Ensure that the email is a valid email address.
              Validators.maxLength(50), // Maximum character length for email.
            ]),
            password: new FormControl(null, [
              Validators.required, // Password field is required.
              Validators.maxLength(20), // Maximum character length for password.
            ]),
          });
      }
    
      ngOnInit() {
        // Initialize the login form with email and password fields
      }
      submitLogIn() {
        if (!this.logInForm.valid) {
          return; // If the form is not valid, do not proceed with login.
        }
        const email = this.logInForm.value.email; // Get the email from the form.
        const password = this.logInForm.value.password; // Get the password from the form.

        if (this.authService.login(email, password)) {
            console.log('Login successful');
            this.route.navigate(['']);
            // Redirect or perform any action upon successful login
          } else {
            console.log('Login failed');
          }
    }
}
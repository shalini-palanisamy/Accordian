import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signIn',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup; // This FormGroup will manage our form's controls.
  error = null; // This variable will store error messages.
  isLoading = false; // This variable will be used to indicate whether a form submission is in progress.
  commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];

  constructor(private authService: AuthService, private route: Router) {
    this.signInForm = new FormGroup({
        name: new FormControl(null, [
          Validators.maxLength(15), // Maximum character length for 'name' field.
          Validators.required, // The 'name' field is required.
          Validators.minLength(3), // Minimum length of 3 characters for 'name' field.
          this.customNameValidator(), // Custom validation function for 'name'.
        ]),
        email: new FormControl(null, [
          Validators.minLength(6),
          Validators.email, // Ensure that the 'email' is a valid email address.
          Validators.required, // The 'email' field is required.
          Validators.maxLength(50), // Maximum character length for 'email' field.
          this.commonEmailDomainsValidator(this.commonDomains),
        ]),
        password: new FormControl(null, [
          Validators.minLength(8),
          Validators.maxLength(20), // Maximum character length for 'password' field.
          Validators.required, // The 'password' field is required.
          this.passwordFormField(), // Custom validation function for 'password'.
        ]),
        confirmPassword: new FormControl(null), // This field is used to confirm the 'password'.
      });
  
      // Set validators for the 'confirmPassword' field based on its value.
      const confirmPasswordControl = this.signInForm.get('confirmPassword');

      if (confirmPasswordControl) {
        confirmPasswordControl.setValidators([
          Validators.required,
          this.matchConfirmPassword.bind(this),
        ]);
      }      
  }

  ngOnInit() {
  }

  // Custom validation function for 'name' field.
  customNameValidator() {
    return (control: FormControl): { [key: string]: any } | null => {
      const namePattern = /^[a-zA-Z\s]*$/; // Regular expression pattern for valid names (letters and spaces).
      const value = control.value;
      if (!namePattern.test(value)) {
        return { invalidName: true }; // Return an error if the name is invalid.
      }
      return null; // Name is valid.
    };
  }

  
  submitSignUp(){
    if (!this.signInForm.valid) {
        return; // If the form is not valid, do not proceed with submission.
      }
      const email = this.signInForm.value.email; // Get the email from the form.
      const password = this.signInForm.value.password; // Get the password from the form.
  
      if (this.authService.signUp(email, password)) {
          console.log('Sign up successful');
          // You can automatically log in the user after signing up if needed
          this.route.navigate(['']);
        } else {
          console.log('Username already taken');
        }
  }
  // Custom validation function for 'password' field.
  passwordFormField() {
    return (control: FormControl): { [key: string]: any } | null => {
      const password = control.value as string; // Get the password value.
      if (!password) {
        return null; // No validation error if the password is empty.
      }

      const regex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      // Regular expression pattern for a strong password.

      const errors: Record<string, boolean> = {};

      if (!/[A-Z]/.test(password)) {
        errors['capitalLetterMissing'] = true;
      }
      if (!/[a-z]/.test(password)) {
        errors['smallLetterMissing'] = true;
      }
      if (!/\d/.test(password)) {
        errors['numberMissing'] = true;
      }
      if (!/[@$!%*?&]/.test(password)) {
        errors['specialCharacterMissing'] = true;
      }
      if (!regex.test(password)) {
        errors['strongPassword'] = true;
      }
      
      return Object.keys(errors).length > 0 ? errors : null;
      

      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  // Custom validation function to confirm that the password and confirmPassword match.
  matchConfirmPassword(control: FormControl): { [s: string]: boolean } | null {
    const passwordControl = this.signInForm.get('password');

if (passwordControl) {
  const password = passwordControl.value; // Get the password value
  const confirmPassword = control.value; // Get the confirmPassword value

  if (password !== confirmPassword) {
    return { passwordMismatch: true }; // Return an error if passwords do not match.
  }
}

return null; // Passwords match.

  }

  // Custom validator function to check for common email domains
  commonEmailDomainsValidator(domains: string[]) {
    return (control: FormControl): { [key: string]: boolean } | null => {
      if (control.value) {
        const email = control.value as string;
        const domain = email.split('@')[1]; // Get the domain part of the email

        if (!domains.includes(domain)) {
          // If the domain is not in the allowed list, return an error
          return { invalidDomain: true };
        }
      }

      return null;
    };
  }
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.logIn.service';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from '../../accordion/accordion.component';
import { UserService } from '../user.service';


@Component({
  selector: 'app-signIn',
  standalone: true,
  imports: [CommonModule, AccordionComponent,ReactiveFormsModule],
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup; 
  error = null; 
  commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];

  constructor( private route: Router, private authService: AuthService,private userService: UserService) {}

  ngOnInit() {
    // Initialize the form controls and their associated validators.

    this.signInForm = new FormGroup({
      name: new FormControl(null, [
        Validators.maxLength(15),
        Validators.required, 
        Validators.minLength(3), 
        this.customNameValidator(), 
      ]),
      email: new FormControl(null, [
        Validators.minLength(6),
        Validators.email, 
        Validators.required, 
        Validators.maxLength(50), 
        this.commonEmailDomainsValidator(this.commonDomains),
      ]),
      mobileNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'), // Only allow numbers
      ]),
      password: new FormControl(null, [
        Validators.minLength(8),
        Validators.maxLength(20), 
        Validators.required, 
        this.passwordFormField(), 
      ]),
      confirmPassword: new FormControl(null), 
    });

    // Set validators for the 'confirmPassword' field based on its value.

    this.signInForm.get('confirmPassword').setValidators([
      Validators.required, 
      this.matchConfirmPassword.bind(this), 
    ]);

    // Subscribe to changes in the 'password' and 'confirmPassword' fields to update their validation dynamically.

    this.signInForm.get('password').valueChanges.subscribe(() => {
      if (this.signInForm.get('confirmPassword').value !== null) {
        this.signInForm.get('confirmPassword').updateValueAndValidity();
      }
    });


  }

  // Custom validation function for 'name' field.
  customNameValidator() {
    return (control: FormControl): { [key: string]: any } | null => {
      const namePattern = /^[a-zA-Z\s]*$/; 
      const value = control.value;
      if (!namePattern.test(value)) {
        return { invalidName: true }; 
      }
      return null; 
    };
  }

  // Handle the form submission.
  submitSignUp() {
    
    if (!this.signInForm.valid) {
      return;
    }

    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;

    // Use UserService to set the user
    this.userService.setUser({ username: email, password: password });

    // Assuming you have a signUp method in your AuthService
    if (this.authService.signUp(email, password)) {
      console.log('Sign up successful');
      // You can automatically log in the user after signing up if needed
      this.authService.login(email, password);
      this.route.navigate(['accordion']);
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

      const errors = {};

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
    };
  }

  // Custom validation function to confirm that the password and confirmPassword match.
  matchConfirmPassword(control: FormControl): { [s: string]: boolean } | null {
    const password = this.signInForm.get('password').value; 
    const confirmPassword = control.value; 

    if (password !== confirmPassword) {
      return { passwordMismatch: true }; 
    }
    return null; // Passwords match.
  }

  // Custom validator function to check for common email domains
  commonEmailDomainsValidator(domains: string[]) {
    return (control: FormControl): { [key: string]: boolean } | null => {
      if (control.value) {
        const email = control.value as string;
        const domain = email.split('@')[1]; 

        if (!domains.includes(domain)) {
          
          return { invalidDomain: true };
        }
      }

      return null;
    };
  }
}
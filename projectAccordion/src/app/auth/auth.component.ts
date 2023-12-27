import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionComponent } from '../accordion/accordion.component';
import { LogInComponent } from './logIn/logIn.component';
import { SignInComponent } from './signUp/signUp.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authIn',
  standalone: true,
  imports: [CommonModule,AccordionComponent,LogInComponent,SignInComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  logInRenderUser = true; 
  logInRenderAdmin = false; 

  constructor(
    private route: Router, 
  ) {}
  // Switch to the user login form.
  user() {
    this.logInRenderUser = true;
    this.logInRenderAdmin = false;
  }
  signUp(){
    this.route.navigate(['signIn']);
  }
  // Switch to the admin login form.
  admin() {
    this.logInRenderAdmin = true;
    this.logInRenderUser = false;
  }
}
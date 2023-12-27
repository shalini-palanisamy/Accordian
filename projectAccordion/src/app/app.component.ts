import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';
import { LogInComponent } from './auth/logIn/logIn.component';
import { SignInComponent } from './auth/signUp/signUp.component';
import { AuthComponent } from './auth/auth.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,AccordionComponent,LogInComponent,SignInComponent,AuthComponent,MatDatepickerModule,MatNativeDateModule,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projectAccordion';
}

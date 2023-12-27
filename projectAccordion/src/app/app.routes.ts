import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LogInComponent } from './auth/logIn/logIn.component';
import { SignInComponent } from './auth/signUp/signUp.component';
import { AccordionComponent } from './accordion/accordion.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
  {path: '',component: AuthComponent},
  { path: 'logIn', component: LogInComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'accordian',component:AccordionComponent},
  { path: 'details',component: DetailsComponent}
];

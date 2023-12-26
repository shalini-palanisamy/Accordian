import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { LogInComponent } from './auth/logIn/logIn.component';
import { SignInComponent } from './auth/signUp/signUp.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  { path: 'logIn', component: LogInComponent },
  { path: 'signIn', component: SignInComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
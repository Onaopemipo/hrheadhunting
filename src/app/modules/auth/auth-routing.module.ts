import { ResetComponent } from './reset/reset.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },

      {
        path: 'reset',
        component: ResetComponent,
      },

      {
        path: 'confirm',
        component: ConfirmationComponent,
      },

      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: LoginComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

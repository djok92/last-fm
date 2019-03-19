import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRegistrationRoutingModule } from './login-registration-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginRegistrationComponent } from './pages/login-registration/login-registration.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegistrationFormComponent,
    LoginRegistrationComponent
  ],
  imports: [
    CommonModule,
    LoginRegistrationRoutingModule,
    SharedModule
  ]
})
export class LoginRegistrationModule { }

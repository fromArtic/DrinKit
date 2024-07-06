import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { LoginFormComponent } from './login/login-form.component';
import { RegisterFormComponent } from './register/register-form.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RecoveryUuidComponent } from './recovery-uuid/recovery-uuid.component';

export function tokenGetter(): any {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    RecoveryComponent,
    RecoveryUuidComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/oauth/token']
      }
    }),
  ],
  exports: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  providers: [
    JwtHelperService
  ]
})

export class SecurityModule { }

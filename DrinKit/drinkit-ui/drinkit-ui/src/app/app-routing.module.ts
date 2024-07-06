import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecoveryUuidComponent } from './forms/recovery-uuid/recovery-uuid.component';
import { LoginFormComponent } from './forms/login/login-form.component';
import { RegisterFormComponent } from './forms/register/register-form.component';
import { RecoveryComponent } from './forms/recovery/recovery.component';
import { HomeComponent } from './home/home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent},
  { path: 'home', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'recovery', component: RecoveryComponent},
  { path: 'recovery_uuid/:uuid', component: RecoveryUuidComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

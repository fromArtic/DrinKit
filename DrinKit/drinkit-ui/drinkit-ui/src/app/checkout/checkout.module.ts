import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { CheckoutComponent } from './checkout.component';
import { CreditPopUpComponent } from './checkout/credit-pop-up/credit-pop-up.component';
import { DebitPopUpComponent } from './checkout/debit-pop-up/debit-pop-up.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    CreditPopUpComponent,
    DebitPopUpComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    ButtonModule,
    DialogModule
  ]
})

export class CheckoutModule { }

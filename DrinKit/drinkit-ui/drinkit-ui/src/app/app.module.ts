import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { SecurityModule } from './forms/security.module';
import { DrinksModule } from './home/home.module';
import { CheckoutModule } from './checkout/checkout.module';

import { AuthService } from './forms/auth.service';

import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component'

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DrinksModule,
    SecurityModule,
    BrowserAnimationsModule,
    CheckoutModule,
    RouterModule,
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

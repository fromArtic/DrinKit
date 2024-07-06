import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { HomeComponent } from './home/home.component';
import { DrinkPopUpComponent } from './home/drink-pop-up/drink-pop-up.component';

@NgModule({
  declarations: [
    HomeComponent,
    DrinkPopUpComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    MatDialogModule
  ],
  exports: [
    HomeComponent
  ]
})

export class DrinksModule { }

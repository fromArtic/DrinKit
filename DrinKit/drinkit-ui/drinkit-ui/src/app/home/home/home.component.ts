import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

import { CartService } from '../../cart.service';
import { DrinkService } from '../home.service';

import { DrinkPopUpComponent } from './drink-pop-up/drink-pop-up.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  cartCounter: number = 0;
  drinks = [];

  constructor (
    private drinkService: DrinkService,
    private cartService: CartService,
    private dialogRef: MatDialog,
    private overlay: Overlay,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.list();
    // Counter para o carrinho
    this.cartService.cartData$.subscribe((cartData: any) => {
      this.cartCounter = cartData.kits.length;
    });
  }

  list(): void {
    this.drinkService.list()
      .then(result => {
        this.drinks = result;
        console.log(this.drinks);
      });
  }

  /* Redirects */
  redirectToHome() {
    this.router.navigate(['/home']);
  }
  redirectToCheckout() {
    this.router.navigate(['/checkout']);
  }
  redirectToHistory() {
    this.router.navigate(['/history']);
  }

  /* Esvaziar carrinho */
  emptyCart() {
    this.cartService.clearCart();
  }

 /* Filtros */
  changeFilter(filterName: string, event: MouseEvent): void {
    const filterItems = document.querySelectorAll('.filters h1');
    filterItems.forEach((filterItem) => {
      filterItem.classList.remove('active-filter', 'Poppins-Light');
    });
    const clickedFilter = event.target as HTMLElement;
    clickedFilter.classList.add('active-filter', 'Poppins-Light');
  }

  /* Ordem */
  sortOrder: string = 'top picks';
  changeSortOrder(): void {
    this.sortOrder = this.sortOrder === 'top picks' ? 'a - z' : this.sortOrder === 'a - z' ? '$' : 'top picks';
  }

  /* Pop-up */
  private readonly dialogConfig: MatDialogConfig = {
    width: '50%',
    height: '77.33vh',
    scrollStrategy: this.overlay.scrollStrategies.noop(),
    autoFocus: false
  };
  openDialog(name: string) {
    this.dialogConfig.data = { name };
    this.dialogRef.open(DrinkPopUpComponent, this.dialogConfig);
  }

}

import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CartService {

  private cartDataSubject = new BehaviorSubject<any>(this.getStoredCartData());
  cartData$: Observable<any> = this.cartDataSubject.asObservable();

  constructor() {}

  private getStoredCartData(): any {
    const storedData = localStorage.getItem('cartData');
    return storedData ? JSON.parse(storedData) : { kits: [] };
  }

  private updateStoredCartData(cartData: any): void {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }

  setCartData(newKit: any): void {
    const currentCartData = this.getStoredCartData();
    const updatedKits = currentCartData.kits ? [...currentCartData.kits, newKit] : [newKit];
    const updatedCartData = {
      kits: updatedKits,
    };
    this.updateStoredCartData(updatedCartData);
    this.cartDataSubject.next(updatedCartData);
  }

  removeKit(index: number): void {
    const currentCartData = this.getStoredCartData();
    const updatedKits = currentCartData.kits.filter((kit: any, i: number) => i !== index);
    const updatedCartData = {
      kits: updatedKits,
    };
    this.updateStoredCartData(updatedCartData);
    this.cartDataSubject.next(updatedCartData);
  }

  getCartData(): any {
    return this.cartDataSubject.getValue();
  }

  clearCart(): void {
    const emptyCartData = { kits: [] };
    this.updateStoredCartData(emptyCartData);
    this.cartDataSubject.next(emptyCartData);
  }
  
}

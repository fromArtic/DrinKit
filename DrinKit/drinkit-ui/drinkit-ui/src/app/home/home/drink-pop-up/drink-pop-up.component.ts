import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { CartService } from './../../../cart.service';
import { DrinkService } from '../../home.service';

@Component({
  selector: 'app-drink-pop-up',
  templateUrl: './drink-pop-up.component.html',
  styleUrls: ['./drink-pop-up.component.css']
})

export class DrinkPopUpComponent{

  drinkName;
  drinkId: number;
  drinkDetails: any;
  selectedDrink: any;
  selectedFruit: any;
  selectedFlavoring: any;
  selectedSweetener: any;
  selectedMisc: any;
  selectedDrinkMl!: number;
  selectedSweetenerMl!: number;

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: { name: string, image : string },
    private router: Router,
    private drinkService: DrinkService,
    private cartService: CartService,
    private dialogRef: MatDialogRef<DrinkPopUpComponent>,
  ) {
    this.drinkName = data.name;
    this.drinkId = this.getDrinkIdByName(this.drinkName);
    this.fetchDrinkDetails();
  }

  getDrinkClass(): string {
    return this.drinkName.replace(/ /g, '-').toLowerCase();
  }

  redirect() {
    this.router.navigate(['/checkout']);
  }

  /* Spinner qtd. */
  qtt = 1;
  updateQtt(newQtt: number): void {
    const qttElement = document.getElementById('qtt');
    if (qttElement) {
      qttElement.innerText = newQtt.toString();
    }
    const decreaseButton = document.querySelector('.spinner-decrease') as HTMLButtonElement;
    if (decreaseButton) {
      decreaseButton.disabled = newQtt === 1;
    }
  }
  increase(): void {
    this.qtt++;
    this.updateQtt(this.qtt);
  }
  decrease(): void {
    if (this.qtt > 1) {
      this.qtt--;
      this.updateQtt(this.qtt);
    }
  }

  /* Lógica p/ bebidas */

  private getDrinkIdByName(drinkName: string): number {
    console.log("AAAAAAAAAAAAAAAAAAAAAAA", drinkName);
    switch (drinkName.toLowerCase()) {
      case 'mojito':
        return 1;
      case 'caipirinha':
        return 2;
      case 'martini':
        return 3;
      case 'shirley temple':
        return 4;
      case 'bloody mary':
        return 5;
      case 'piña colada':
        return 6;
      default:
        return 0;
    }
  }

  private fetchDrinkDetails(): void {
    if (this.drinkId) {
      this.drinkService.getDrinkDetails(this.drinkId).subscribe(
        (response: any) => {
          this.drinkDetails = response;
          // A primeira bebida é selecionada por padrão
          /* 
          const firstDrink = this.getFirstDrink();
          if (firstDrink) { 
            this.selectedDrink = firstDrink;
          }
          */
        },
        (error) => {
          console.error('Erro ao obter detalhes do drink:', error);
        }
      );
    }
  }

  selectDrink(product: any): void {
    this.selectedDrink = product;
  }

  deselectDrink(): void {
    this.selectedDrink= null;
  }

  isDrinkSelected(): boolean {
    return !!this.selectedDrink;
  }

  getFirstDrink(): any {
    return this.drinkDetails?.products.find((product: { type: string; }) => product.type === 'bebida');
  }

  getDrinkProducts(): any[] {
    return this.drinkDetails?.products.filter((product: { type: string; }) => product.type === 'bebida') || [];
  }

  selectMl(ml: number): void {
    if (this.selectedDrink) {
      this.selectedDrink.quantityMl = ml;
    }
  }

  getUpdatedValue(): number {
    if (this.selectedDrink && this.selectedDrink.quantityMl) {
      const pricePerLiter = this.selectedDrink.price / 1000;
      const selectedDrinkMl = this.selectedDrink.quantityMl;
      const updatedValue = (pricePerLiter * selectedDrinkMl).toFixed(2);
      return Number(updatedValue);
    } else {
      return 0;
    }
  }

  /* Lógica p/ frutas */

  selectedFruits: { product: any, index: number }[] = [];

  selectFruit(product: any, index: number): void {
    const existingIndex = this.selectedFruits.findIndex(item => item.index === index);
    if (existingIndex !== -1) {
      // Se já estiver selecionado, remova
      this.selectedFruits.splice(existingIndex, 1);
    } else {
      // Adicione o valor selecionado ao array
      this.selectedFruits.push({ product, index });
    }
  }

  isFruitSelected(index: number): boolean {
    return this.selectedFruits.some(item => item.index === index);
  }

  getFirstFruit(): any {
    return this.drinkDetails?.products.find((product: { type: string; }) => product.type === 'frutas');
  }

  getFruitProducts(): any[] {
    return this.drinkDetails?.products.filter((product: { type: string; }) => product.type === 'frutas') || [];
  }

  getSelectedFruitName(index: number): string {
    const selectedFruit = this.selectedFruits.find(item => item.index === index);
    return selectedFruit ? selectedFruit.product.name : '';
  }

  selectFruitQuantity(quantity: number, index: number): void {
    const selectedFruit = this.selectedFruits.find(item => item.index === index);
    if (selectedFruit && selectedFruit.product) {
      // Atualize a quantidade apenas do item específico
      selectedFruit.product.quantity = quantity;
    }
  }

  getSelectedFruitQuantity(index: number): string {
    const selectedFruit = this.selectedFruits.find(item => item.index === index);
    return selectedFruit ? selectedFruit.product.quantity : '';
  }

  getUpdatedFruitValue(): number {
    let totalValue = 0;
    this.selectedFruits.forEach((selectedFruit) => {
      const pricePerUnit = selectedFruit.product.price;
      const quantity = selectedFruit.product.quantity || 0;
      totalValue += pricePerUnit * quantity;
    });
    return Number(totalValue.toFixed(2));
  }

  /* Lógica p/ aromatizantes */

  selectedFlavorings: { product: any, index: number }[] = [];

  selectFlavoring(product: any, index: number): void {
    const existingIndex = this.selectedFlavorings.findIndex(item => item.index === index);
    if (existingIndex !== -1) {
      this.selectedFlavorings.splice(existingIndex, 1);
    } else {
      this.selectedFlavorings.push({ product, index });
    }
  }

  isFlavoringSelected(index: number): boolean {
    return this.selectedFlavorings.some(item => item.index === index);
  }

  getFirstFlavoring(): any {
    return this.drinkDetails?.products.find((product: { type: string; }) => product.type === 'aromatizante');
  }

  getFlavoringProducts(): any[] {
    return this.drinkDetails?.products.filter((product: { type: string; }) => product.type === 'aromatizante') || [];
  }

  getSelectedFlavoringName(index: number): string {
    const selectedFlavoring = this.selectedFlavorings.find(item => item.index === index);
    return selectedFlavoring ? selectedFlavoring.product.name : '';
  }

  selectFlavoringQuantity(quantity: number, index: number): void {
    const selectedFlavoring = this.selectedFlavorings.find(item => item.index === index);
    if (selectedFlavoring && selectedFlavoring.product) {
      selectedFlavoring.product.quantity = quantity;
    }
  }

  getSelectedFlavoringQuantity(index: number): string {
    const selectedFlavoring = this.selectedFlavorings.find(item => item.index === index);
    return selectedFlavoring ? selectedFlavoring.product.quantity : '';
  }

  getUpdatedFlavoringValue(): number {
    let totalValue = 0;
    this.selectedFlavorings.forEach((selectedFlavoring) => {
      const pricePerUnit = selectedFlavoring.product.price;
      const quantity = selectedFlavoring.product.quantity || 0;
      totalValue += pricePerUnit * quantity;
    });
    return Number(totalValue.toFixed(2));
  }

  /* Lógica p/ adoçantes */

  selectSweetener(product: any): void {
    this.selectedSweetener= product;
  }

  deselectSweetener(): void {
    this.selectedSweetener= null;
  }

  isSweetenerSelected(): boolean {
    return !!this.selectedSweetener;
  }

  getFirstSweetener(): any {
    return this.drinkDetails?.products.find((product: { type: string; }) => product.type === 'adocante');
  }

  getSweetenerProducts(): any[] {
    return this.drinkDetails?.products.filter((product: { type: string; }) => product.type === 'adocante') || [];
  }

  selectSweetenerMl(g: number): void {
    if (this.selectedSweetener) {
      this.selectedSweetener.quantityMl = g;
    }
  }

  getUpdatedSweetenerValue(): number {
    if (this.selectedSweetener && this.selectedSweetener.quantityMl) {
      const pricePerLiter = this.selectedSweetener.price / 1000;
      const selectedSweetenerMl = this.selectedSweetener.quantityMl;
      const updatedValue = (pricePerLiter * selectedSweetenerMl).toFixed(2);
      return Number(updatedValue);
    } else {
      return 0;
    }
  }

  /* Lógica p/ diversos */

  selectedMiscs: { product: any, index: number }[] = [];

  selectMisc(product: any, index: number): void {
    const existingIndex = this.selectedMiscs.findIndex(item => item.index === index);
    if (existingIndex !== -1) {
      this.selectedMiscs.splice(existingIndex, 1);
    } else {
      this.selectedMiscs.push({ product, index });
    }
  }

  isMiscSelected(index: number): boolean {
    return this.selectedMiscs.some(item => item.index === index);
  }

  getFirstMisc(): any {
    return this.drinkDetails?.products.find((product: { type: string; }) => product.type === 'diverso');
  }

  getMiscProducts(): any[] {
    return this.drinkDetails?.products.filter((product: { type: string; }) => product.type === 'diverso') || [];
  }

  getSelectedMiscName(index: number): string {
    const selectedMisc = this.selectedMiscs.find(item => item.index === index);
    return selectedMisc ? selectedMisc.product.name : '';
  }

  selectMiscQuantity(quantity: number, index: number): void {
    const selectedMisc = this.selectedMiscs.find(item => item.index === index);
    if (selectedMisc && selectedMisc.product) {
      selectedMisc.product.quantity = quantity;
    }
  }

  getSelectedMiscQuantity(index: number): string {
    const selectedMisc = this.selectedMiscs.find(item => item.index === index);
    return selectedMisc ? selectedMisc.product.quantity : '';
  }

  getUpdatedMiscValue(): number {
    let totalValue = 0;
    this.selectedMiscs.forEach((selectedMisc) => {
      const pricePerUnit = selectedMisc.product.price;
      const quantityInGrams = selectedMisc.product.quantity || 0;
      const quantityInKilograms = quantityInGrams / 1000; // Converter gramas para quilogramas
      totalValue += pricePerUnit * quantityInKilograms;
    });
    return Number(totalValue.toFixed(2));
  }

  /* Lógica dos valores totais, carrinho e compra */

  getTotalValue(): number {
    const miscValue = this.getUpdatedMiscValue();
    const sweetenerValue = this.getUpdatedSweetenerValue();
    const flavoringValue = this.getUpdatedFlavoringValue();
    const fruitValue = this.getUpdatedFruitValue();
    const otherValue = this.getUpdatedValue();

    const totalValue = (miscValue + sweetenerValue + flavoringValue + fruitValue + otherValue) * this.qtt;

    return Number(totalValue.toFixed(2));
  }

  deselectAll(): void {
    this.selectedDrink = null;
    this.selectedFruits = [];
    this.selectedFlavorings = [];
    this.selectedSweetener = null;
    this.selectedMiscs = [];
  }

  addToCart(): any {
    
    let totalValue = 0;

    const jsonDrink = this.selectedDrink
    ? {
        id: this.selectedDrink?.id || 0,
        price: this.getUpdatedValue(),
        name: this.selectedDrink?.name || '',
        quantity: 1,
        quantityMl: this.selectedDrink?.quantityMl || 0,
        type: "bebida",
      }
    : undefined;

    let fruitsObject: any;
    if (this.selectedFruits.length > 0) {
      const jsonFruit = this.selectedFruits.map((selectedFruit) => ({
        id: selectedFruit.product.id,
        price: selectedFruit.product.price * selectedFruit.product.quantity,
        name: selectedFruit.product.name,
        quantity: selectedFruit.product.quantity || 1,
        quantityMl: 0,
        type: "frutas"
      }));
      fruitsObject = {
        products: jsonFruit
      };
    }

    let flavoringsObject: any;
    if (this.selectedFlavorings.length > 0) {
      const jsonFlavoring = this.selectedFlavorings.map((selectedFlavoring) => ({
        id: selectedFlavoring.product.id,
        price: selectedFlavoring.product.price * selectedFlavoring.product.quantity,
        name: selectedFlavoring.product.name,
        quantity: selectedFlavoring.product.quantity || 1,
        quantityMl: 0,
        type: "aromatizante"
      }));
      flavoringsObject = {
        products: jsonFlavoring
      };
    }

    const jsonSweetener = this.selectedSweetener
    ? {
        id: this.selectedSweetener?.id || 0,
        price: this.getUpdatedSweetenerValue(),
        name: this.selectedSweetener?.name || '',
        quantity: 1,
        quantityMl: this.selectedSweetener?.quantityMl || 0,
        type: "adocante",
      }
    : undefined;

    let miscsObject: any;
    if (this.selectedMiscs.length > 0) {
      const jsonMisc = this.selectedMiscs.map((selectedMisc) => ({
        id: selectedMisc.product.id,
        price: (selectedMisc.product.price / 1000) * selectedMisc.product.quantity,
        name: selectedMisc.product.name,
        quantity: 1,
        quantityMl: selectedMisc.product.quantity || 1,
        type: "diverso"
      }));
      miscsObject = {
        products: jsonMisc
      };
    }

    const drinkProducts = [
      ...(jsonDrink ? [jsonDrink] : []),
      ...(fruitsObject?.products || []),
      ...(flavoringsObject?.products || []),
      ...(jsonSweetener ? [jsonSweetener] : []),
      ...(miscsObject?.products || []),
    ];

    const duplicatedProducts = [];
    for (let i = 0; i < this.qtt; i++) {
      duplicatedProducts.push(...drinkProducts);
    }

    const drinkObject = {
      id: this.drinkId,
      name: this.drinkName,
      price: this.getTotalValue(),
      products: duplicatedProducts,
    }

    if (this.getTotalValue() == 0) {
      return 0;
    }

    console.log('Drink adicionado ao carrinho:', drinkObject);
    this.cartService.setCartData(drinkObject);
    this.deselectAll();
    return drinkObject;

  }

  redirectToCheckout(): void {
    this.closePopUp();
    this.router.navigate(['/checkout']);
  }

  closePopUp(): void {
    this.dialogRef.close();
  }
  
}

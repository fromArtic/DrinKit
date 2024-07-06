import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

import Swiper from 'swiper/bundle';

import { CartService } from '../cart.service';
import { AuthService } from '../forms/auth.service';

import { CreditPopUpComponent } from './checkout/credit-pop-up/credit-pop-up.component';
import { DebitPopUpComponent } from './checkout/debit-pop-up/debit-pop-up.component';

@Component({
  selector: 'app-checkout',
  templateUrl: '/checkout/checkout.component.html',
  styleUrls: ['/checkout/checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  cartCounter: number = 0;
  kits: any[] = [];
  swiper: Swiper | undefined;
  private userData: any;

  loading = false;
  showMessage = false;

  constructor (
    private cartService: CartService,
    private authService: AuthService,
    private http: HttpClient,
    private dialogRef: MatDialog,
    private overlay: Overlay,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Counter para o carrinho
    this.cartService.cartData$.subscribe((cartData: any) => {
      this.cartCounter = cartData.kits.length;
    });

    this.initSwiper();
    this.updateKitsFromCartData();
    this.obterPrecoTotal();
    this.cartService.cartData$.subscribe(() => {
      this.updateKitsFromCartData();
    });
    const userId = this.authService.getUserId();
    if (userId) {
      this.getUserDetails(userId);
    } else {
      console.error('ID do usuário não encontrado.');
    }

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

  private initSwiper() {
    this.swiper = new Swiper(".slide-content", {
      slidesPerView: 3,
      spaceBetween:1,
      loop: true,
      centeredSlides: true,
      fadeEffect: {
        crossFade: true,
      },
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 1,
        },
        950: {
          slidesPerView: 1,
        },
      },
    });
  }

  /* Geração de valor aleatório (10 a 18) */
  generateDeliveryTax(): number {
    const minValue = 10;
    const maxValue = 18;
    return Math.floor(minValue + Math.random() * (maxValue - minValue + 1));
  }

  /* Geração de data aleatória dentro do próximo mês */
  generateDeliveryEstimate(): string {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    nextMonth.setDate(1);

    const minDayDifference = 1;
    const maxDayDifference = new Date(today.getFullYear(), today.getMonth() + 2, 0).getDate() - nextMonth.getDate();

    const randomDay = nextMonth.getDate() + minDayDifference + Math.floor(Math.random() * (maxDayDifference - minDayDifference + 1));
    nextMonth.setDate(randomDay);

    const day = nextMonth.getDate();
    const monthAbbreviation = this.getMonthAbbreviation(nextMonth.getMonth());
    const formattedDate = `${day}/${monthAbbreviation}`;

    return formattedDate;
  }
  // Formato da data
  getMonthAbbreviation(monthIndex: number): string {
    const monthNames = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return monthNames[monthIndex];
  }

  private updateKitsFromCartData(): void {
    const cartData = this.cartService.getCartData();
    this.kits = cartData?.kits || [];
    console.log("CASCASD", this.kits)
  }

  countKitsById(id: number): number {
    return this.kits.filter(kit => kit.id === id).length;
  }

  /* Bebidas */

  getBeverageProducts(kitIndex: number): any[] {
    const kit = this.kits[kitIndex];
    return kit.products.filter((product: { type: string; }) => product.type === 'bebida');
  }

  getTotalBeveragePrice(kitIndex: number): number {
    const beverageProducts = this.getBeverageProducts(kitIndex);
    return beverageProducts.reduce((total, product) => total + product.price, 0);
  }

  getBeverageProductNames(kitIndex: number): string[] {
    const kit = this.kits[kitIndex];
    const beverageProducts = kit.products.filter((product: { type: string; }) => product.type === 'bebida');
    return beverageProducts.map((product: { name: any; }) => product.name);
  }

  getBeverageProductQuantityMl(kitIndex: number): number[] {
    const kit = this.kits[kitIndex];
    const beverageProducts = kit.products.filter((product: { type: string; }) => product.type === 'bebida');
    return beverageProducts.map((product: { quantityMl: any; }) => product.quantityMl);
  }

  /* Frutas */

  getFruitsProducts(kitIndex: number): any[] {
    const kit = this.kits[kitIndex];
    return kit.products.filter((product: { type: string; }) => product.type === 'frutas');
  }

  getTotalFruitsPrice(kitIndex: number): number {
    const fruitProducts = this.getFruitsProducts(kitIndex);
    return fruitProducts.reduce((total, product) => total + product.price, 0);
  }

  getFruitProductNames(kitIndex: number): string[] {
    const kit = this.kits[kitIndex];
    const fruitProducts = kit.products.filter((product: { type: string; }) => product.type === 'frutas');
    return fruitProducts.map((product: { name: any; }) => product.name);
  }

  getFruitProductQuantity(kitIndex: number): number[] {
    const kit = this.kits[kitIndex];
    const fruitProducts = kit.products.filter((product: { type: string; }) => product.type === 'frutas');
    return fruitProducts.map((product: { quantity: any; }) => product.quantity);
  }

  /* Aromatizantes */

  getFlavoringsProducts(kitIndex: number): any[] {
    const kit = this.kits[kitIndex];
    return kit.products.filter((product: { type: string; }) => product.type === 'aromatizante');
  }

  getTotalFlavoringsPrice(kitIndex: number): number {
    const flavoringProducts = this.getFlavoringsProducts(kitIndex);
    return flavoringProducts.reduce((total, product) => total + product.price, 0);
  }

  getFlavoringProductNames(kitIndex: number): string[] {
    const kit = this.kits[kitIndex];
    const flavoringProducts = kit.products.filter((product: { type: string; }) => product.type === 'aromatizante');
    return flavoringProducts.map((product: { name: any; }) => product.name);
  }

  getFlavoringProductQuantity(kitIndex: number): number[] {
    const kit = this.kits[kitIndex];
    const flavoringProducts = kit.products.filter((product: { type: string; }) => product.type === 'frutas');
    return flavoringProducts.map((product: { quantity: any; }) => product.quantity);
  }

  /* Adoçantes */

  getSweetenersProducts(kitIndex: number): any[] {
    const kit = this.kits[kitIndex];
    return kit.products.filter((product: { type: string; }) => product.type === 'adocante');
  }

  getTotalSweetenersPrice(kitIndex: number): number {
    const sweetenerProducts = this.getSweetenersProducts(kitIndex);
    return sweetenerProducts.reduce((total, product) => total + product.price, 0);
  }

  getSweetenerProductNames(kitIndex: number): string[] {
    const kit = this.kits[kitIndex];
    const sweetenerProducts = kit.products.filter((product: { type: string; }) => product.type === 'adocante');
    return sweetenerProducts.map((product: { name: any; }) => product.name);
  }

  getSweetenerProductQuantity(kitIndex: number): number[] {
    const kit = this.kits[kitIndex];
    const sweetenerProducts = kit.products.filter((product: { type: string; }) => product.type === 'adocante');
    return sweetenerProducts.map((product: { quantity: any; }) => product.quantity);
  }

  /* Diversos */

  getMiscsProducts(kitIndex: number): any[] {
    const kit = this.kits[kitIndex];
    return kit.products.filter((product: { type: string; }) => product.type === 'diverso');
  }

  getTotalMiscPrice(kitIndex: number): number {
    const miscProducts = this.getMiscsProducts(kitIndex);
    return miscProducts.reduce((total, product) => total + product.price, 0);
  }

  getMiscProductNames(kitIndex: number): string[] {
    const kit = this.kits[kitIndex];
    const miscProducts = kit.products.filter((product: { type: string; }) => product.type === 'diverso');
    return miscProducts.map((product: { name: any; }) => product.name);
  }

  getMiscProductQuantity(kitIndex: number): number[] {
    const kit = this.kits[kitIndex];
    const miscProducts = kit.products.filter((product: { type: string; }) => product.type === 'diverso');
    return miscProducts.map((product: { quantity: any; }) => product.quantity);
  }

  /* Drinks */
  getKitImage(kitId: number): string {
    switch (kitId) {
      case 1:
        return '../home/home/images/mojito-light.png';
      case 2:
        return '../home/home/images/caipirinha-light.png';
      case 3:
        return '../home/home/images/martini-light.png';
      case 4:
        return '../home/home/images/shirley-temple-light.png';
      case 5:
        return '../home/home/images/bloody-mary-light.png';
        case 6:
          return '../home/home/images/pina-colada-light.png';
      default:
        return '';
    }
  }

  removeKit(index: number) {
    this.cartService.removeKit(index);
  }

  getKitImageClass(kitId: number): string {
    return `kit-${kitId}`;
  }

  precoTotal: number | undefined;

  calcularPrecoTotal(): number {
    let precoTotal = 0;
    for (const kit of this.kits) {
      precoTotal += kit.price !== null ? kit.price : 0;
    }
    return precoTotal;
  }

  obterPrecoTotal(): void {
    this.precoTotal = this.calcularPrecoTotal();
    console.log('Preço Total:', this.precoTotal);
  }

  showPopup: boolean = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  visibleC: boolean = false;
  visibleD: boolean = false;
  visibleF: boolean = false;

  showCredit() {
    this.visibleC = true;
  }
  showDebit() {
    this.visibleD = true;
  }

  /* Pop-up*/
  private readonly dialogConfig: MatDialogConfig = {
    width: '50%',
    height: '77.33vh',
    scrollStrategy: this.overlay.scrollStrategies.noop(),
    autoFocus: false
  };
  openDialog(name: string) {
    this.dialogConfig.data = { name };
    this.dialogRef.open(DebitPopUpComponent, this.dialogConfig);
  }

  private async getUserDetails(userId: string): Promise<void> {
    try {
      this.userData = await this.authService.getUserDetails(userId);
      console.log('Detalhes do usuário:', this.userData);
    } catch (error) {
      console.error('Erro ao obter detalhes do usuário:', error);
    }
  }

  finalize() {

    if (this.userData) {
      console.log("OLHA SOH", this.userData);
      this.userData
    } else {
      console.error('ID do usuário não encontrado.');
    }

    this.loading = true;

    const saleObject = {
      status: "EM_PROCESSAMENTO",
      address: {
        id: 1,
        publicPlace: "Avenida Blumenau",
        cep: "01310-100",
        number: 1234,
        addressSupplement: "Apto. 501",
        city: "Blumenau",
        state: "SP",
        client: this.userData
      },
      client: this.userData,
      kits: this.kits,
      finalPrice: this.precoTotal !== null ? this.precoTotal : 0
    }
    console.log("KITS", saleObject);

    const token = this.authService.getToken();

    if (!token) {
      console.error('Token não encontrado.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.http.post('http://localhost:8080/sales', saleObject, { headers }).subscribe(
      (response) => {
        console.log('Resposta da requisição POST:', response);
        this.cartService.clearCart();
        this.kits = [];
        // Timeout de 2 segundos para ocultar o loader e mostrar a mensagem
        setTimeout(() => {
          this.loading = false;
          // Configurar a propriedade showMessage para true após o fim do loader
          this.showMessage = true;

          // Ocultar a mensagem após 2 segundos
          setTimeout(() => {
            this.showMessage = false;
          }, 2000);

          // Timeout de 1 minuto (60 segundos) para chamar o redirecionamento
          setTimeout(() => {
            this.redirectToHistory();
          }, 60000);
        }, 2000);
      },
      (error) => {
        console.error('Erro na requisição POST:', error);
        this.loading = false;
      }
    );

  }

}

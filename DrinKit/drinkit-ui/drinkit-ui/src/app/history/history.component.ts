import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../forms/auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {

  cartCounter: number = 0;
  sales: any[] = [];

  constructor (
    private authService: AuthService,
    private cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Counter para o carrinho
    this.cartService.cartData$.subscribe((cartData: any) => {
      this.cartCounter = cartData.kits.length;
    });

    const userId = this.authService.getUserId();
    const token = this.authService.getToken();

    if (userId && token) {
      const url = `http://localhost:8080/sales`;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });

      this.http.get(url, { headers }).subscribe(
        (data: any) => {
          console.log('Dados recebidos:', data);

          console.log("UserID:", userId);
          const userSales = data.filter((sale: any) => sale.client.id === parseInt(userId));
          console.log("OLHA", userSales)

          sessionStorage.setItem('userSales', JSON.stringify(userSales));

          this.sales = userSales;
        },
        (error) => {
          console.error('Erro na requisição:', error);
        }
      );
    } else {
      console.error('ID do usuário ou token não encontrado.');
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

  /* Filtros */
  changeFilter(filterName: string, event: MouseEvent): void {
    const filterItems = document.querySelectorAll('.filters h2');
    filterItems.forEach((filterItem) => {
      filterItem.classList.remove('active-filter', 'Poppins-Light');
    });
    const clickedFilter = event.target as HTMLElement;
    clickedFilter.classList.add('active-filter', 'Poppins-Light');
  }

  /* Ordem */
  sortOrder: string = 'mais recente';
  changeSortOrder(): void {
    this.sortOrder = this.sortOrder === 'mais recente' ? 'mais antigo' : 'mais recente';
  }

  /* Geração de data aleatória dentro do último mês */
  generatePurchaseDate(): string {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);

    const randomDate = new Date(
      lastMonth.getTime() + Math.random() * (today.getTime() - lastMonth.getTime())
    );

    const day = randomDate.getDate();
    const month = randomDate.getMonth() + 1; // Os meses são indexados de 0 a 11
    const year = randomDate.getFullYear();

    return `${day} / ${month} / ${year}`;
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

  /* Geração de valor aleatório (1 a 7) */
  generateKitQtt(): number {
    const minValue = 1;
    const maxValue = 7;
    return Math.floor(minValue + Math.random() * (maxValue - minValue + 1));
  }

  /* Geração de valor aleatório (10 a 18) */
  generateDeliveryTax(): number {
    const minValue = 10;
    const maxValue = 18;
    return Math.floor(minValue + Math.random() * (maxValue - minValue + 1));
  }
  
}

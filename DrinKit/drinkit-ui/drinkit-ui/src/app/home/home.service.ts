import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../forms/auth.service';

@Injectable({
  providedIn: 'root'
})

export class DrinkService {

  drinksUrl = 'http://localhost:8080/kits/';

  constructor (
    private http: HttpClient, 
    private authService: AuthService
  ) {}

  list(): Promise<any> {
    return this.http.get(`${this.drinksUrl}`)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  getDrinkDetails(drinkId: number): Observable<any> {
    const url = this.drinksUrl + drinkId;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(url, { headers });
  }

}

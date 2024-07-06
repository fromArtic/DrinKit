import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  registerTokenUrl = 'http://localhost:8080/clients';
  recoveryRequestUrl ='http://localhost:8080/recovery_request?email=';
  recoveryPasswordUrl ='http://localhost:8080/recovery_uuid';

  jwtPayload: any;

  constructor (
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) {
    this.loadToken();
  }

  private userIdKey = 'user_id';

  login(user: string, password: string): Promise<void> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic Y2xpZW50OmNsaWVudA==');

    const body = `username=${user}&password=${password}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then((response: any) => {
        console.log(response);
        this.storeToken(response[`access_token`]);
        this.storeId(response['client_id']);
        console.log('ID do usuário:', this.getUserId());
      })
      .catch(response => {
        if (response.status === 400) {
          if (response.error === 'invalid_grant') {
            return Promise.reject('Informações de login inválidas');
          }
        }

        return Promise.reject(response);
      });

  }

  async getUserDetails(userId: string): Promise<any> {
    const token = this.getToken();
    const urlWithId = `${this.registerTokenUrl}/${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    try {
      const data = await this.http.get(urlWithId, { headers }).toPromise();
      console.log('Dados recebidos:', data);
      return data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error; // Ou trate o erro conforme necessário
    }
  }

  register(user: string, name: string, birthdate: string, password: string): Promise<void> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic Y2xpZW50OmNsaWVudA==');

    const bodyPermission = 'username=admin@ifsp.edu.br&password=admin&grant_type=password';
    return new Promise<void>((resolve, reject) => {

      this.http.post(this.oauthTokenUrl, bodyPermission, { headers }).subscribe((response: any) => {

        this.jwtPayload = this.jwtHelper.decodeToken(response[`access_token`]);
        const accessToken = response[`access_token`]

        const userObject = {
          name,
          email: user,
          password,
          birthdate,
          cpf: '44466699900',
          active: true,
          permissions: [
            { id: 4, description: 'ROLE_REGISTER_DRINKIT' },
            { id: 5, description: 'ROLE_REMOVE_DRINKIT' },
            { id: 6, description: 'ROLE_SEARCH_DRINKIT' },
          ],
        };

        const userBody = JSON.stringify(userObject);

        const userHeaders = new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + String(accessToken));

        console.log("Access token 2 o inimigo agora e outro", userHeaders);
        this.http.post(this.registerTokenUrl, userBody, { headers: userHeaders })
          .toPromise()
          .then((response: any) => {
            console.log('Usuário criado com sucesso.', response);
            resolve();
          })
          .catch(response => {
            if (response.status === 400) {
              console.error('Erro ao criar o usuário.');
              if (response.error === 'invalid_grant') {
                return Promise.reject('Login inválido.');
              }
            }
            return Promise.reject(response);
          });

      });

    });

  }

  private storeToken(token: string): void {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private storeId(userId: string): void {
    localStorage.setItem('client_id', userId);
  }

  getUserId(): string | null {
    return localStorage.getItem('client_id');
  }

  private loadToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.storeToken(token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  public recovery(email: string): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic Y2xpZW50OmNsaWVudA==');

    const bodyPermission = 'username=admin@ifsp.edu.br&password=admin&grant_type=password';

    return new Promise<void>((resolve, reject) => {
      // Step 1: Obtain OAuth Token
      this.http.post(this.oauthTokenUrl, bodyPermission, { headers }).subscribe(
        (response: any) => {
          this.jwtPayload = this.jwtHelper.decodeToken(response.access_token);
          const accessToken = response.access_token;

          // Step 2: Make GET request for recovery
          const fullUrl = `${this.recoveryRequestUrl}${email}`;
          const recoveryHeaders = new HttpHeaders().append('Authorization', `Bearer ${accessToken}`);

          this.http.get(fullUrl, { headers: recoveryHeaders })
            .toPromise()
            .then((recoveryResponse: any) => {
              console.log('Recovery request sent successfully.', recoveryResponse);
              resolve();
            })
            .catch((recoveryError: any) => {
              console.error('Error sending recovery request:', recoveryError);
              reject(recoveryError);
            });
        },
        (tokenError: any) => {
          console.error('Error obtaining OAuth token:', tokenError);
          reject(tokenError);
        }
      );
    });
  }

  public recovery_uuid(uuid: string, password: string): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic Y2xpZW50OmNsaWVudA==');

    const bodyPermission = 'username=admin@ifsp.edu.br&password=admin&grant_type=password';

    return new Promise<void>((resolve, reject) => {
      // Step 1: Obtain OAuth Token
      this.http.post(this.oauthTokenUrl, bodyPermission, { headers }).subscribe(
        (response: any) => {
          this.jwtPayload = this.jwtHelper.decodeToken(response.access_token);
          const accessToken = response.access_token;

          // Step 2: Make POST request for recovery_uuid
          const recoveryUuidUrl = this.recoveryPasswordUrl;
          const recoveryUuidHeaders = new HttpHeaders().append('Authorization', `Bearer ${accessToken}`);

          uuid = uuid.replace('uuid=', '');
          const recoveryUuidBody = {
            uuid: uuid,
            password: password
          };

          const fullUrl = `${recoveryUuidUrl}?uuid=${uuid}&password=${password}`;
          this.http.post(fullUrl, recoveryUuidBody, { headers: recoveryUuidHeaders })
            .toPromise()
            .then((recoveryUuidResponse: any) => {
              console.log('Recovery UUID request sent successfully.', recoveryUuidResponse);
              resolve();
            })
            .catch((recoveryUuidError: any) => {
              console.error('Error sending recovery UUID request:', recoveryUuidError);
              reject(recoveryUuidError);
            });
        },
        (tokenError: any) => {
          console.error('Error obtaining OAuth token:', tokenError);
          reject(tokenError);
        }
      );
    });
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {

  msg: any;

  constructor (
    private auth: AuthService,
    private router: Router
  ) {}

  login(user: string, password: string) {
    this.auth.login(user, password)
    .then(() => {
      this.router.navigate(['/home']);
      this.msg = null;
    })
    .catch(() => {
      this.msg = 'Login inválido';
    });
  }

  redirect() {
    this.router.navigate(['/register']);
  }

  recovery(){
    this.router.navigate(['/recovery']);
  }

  /* Visualizar senha */
  showPassword: boolean = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}

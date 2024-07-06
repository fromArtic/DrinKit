import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})

export class RecoveryComponent {

  msg: any;

  constructor (
    private auth: AuthService,
    private router: Router
  ) {}

  recovery(user: string) {
    this.auth.recovery(user)
    .then(() => {
      this.router.navigate(['/login']);
      this.msg = "Solicitação de recuperação de senha enviada com sucesso!";
      this.redirect();
    })
    .catch(() => {
      this.msg = 'Não foi possível enviar solicitação para recuperar a senha...';
    });
  }

  redirect() {
    this.router.navigate(['/']);
  }
  
}

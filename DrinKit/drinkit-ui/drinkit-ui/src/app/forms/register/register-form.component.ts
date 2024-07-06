import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent {

  msg: any;

  constructor (
    private auth: AuthService,
    private router: Router
  ) {}

  redirect() {
    this.router.navigate(['/']);
  }

  /* Cálculo da idade */
  calculateAge(birthdateString: string): number {
    const [day, month, year] = birthdateString.split('/').map(Number);
    const birthdateDate = new Date(year, month - 1, day);
    const today = new Date();

    if (isNaN(birthdateDate.getTime())) {
      console.error('Data de nascimento inválida');
      return NaN;
    }

    const timeDiff = today.getTime() - birthdateDate.getTime();
    const years = timeDiff / (1000 * 60 * 60 * 24 * 365.25);

    return years;
  }

  register(user: string, name: string, birthdate: string, password: string, repeatedPassword: string) {

    // Todos os campos devem estar preenchidos
    if (!user || !name || !birthdate || !password || !repeatedPassword) {
      this.msg = 'Cadastro inválido';
      return;
    }

     // Formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user)) {
      this.msg = 'Cadastro inválido';
      return;
    }

    // Senha de no mínimo 6 caracteres
    if (password.length < 6) {
      this.msg = 'Cadastro inválido';
      return;
    }

    // Senha repetida corretamente
    if (password !== repeatedPassword) {
      this.msg = 'Cadastro inválido';
      return;
    }

    // Usuário maior de 18 anos
    const ageInYears = this.calculateAge(birthdate);
    if (!isNaN(ageInYears)) {
      console.log('Idade:', ageInYears);
    } else {
      console.log('Erro ao calcular a idade');
    }
    if (ageInYears < 18) {
      console.log('Usuário menor de 18 anos');
      this.msg = 'Cadastro inválido';
      return;
    }

    this.auth.register(user, name, birthdate, password)
    .then(() => {
      this.msg = 'Sua conta no DrinKit foi criada com sucesso!';
      this.router.navigate(['/']);
      this.msg = null;
    })
    .catch(() => {
      this.msg = 'Cadastro inválido';
    });

  }

  /* Dividindo a string em partes (dia, mês e ano) */
  parseDate(dateString: string): string {
    const parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  /* Visualizar senha */
  showPassword: boolean = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  showRepeatedPassword: boolean = false;
  toggleRepeatedPassword() {
    this.showRepeatedPassword = !this.showRepeatedPassword;
  }

}

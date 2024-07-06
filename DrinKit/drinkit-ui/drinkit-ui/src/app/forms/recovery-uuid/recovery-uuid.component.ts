import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recovery-uuid',
  templateUrl: './recovery-uuid.component.html',
  styleUrls: ['./recovery-uuid.component.css']
})

export class RecoveryUuidComponent implements OnInit {

  msg: any;
  uuid: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.uuid = params.get('uuid');
    });
  }

  recovery(password: string): void {
    console.log(this.uuid);
    this.auth.recovery_uuid(this.uuid,password);
    this.redirect();
  }

  redirect(): void {
    this.router.navigate(['/login']);
  }

  /* Visualizar senha */
  showPassword: boolean = false;
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  
}

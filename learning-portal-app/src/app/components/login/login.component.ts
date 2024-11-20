import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService)
  private router = inject(Router)
  private messageService = inject(MessageService)

  invalidUSerLogin: boolean = false

  login = {
    email: '',
    password: ''
  }

  onLogin() {
    const { email, password } = this.login;
  
    this.authService.login(email, password).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.router.navigate(['home']);
          this.invalidUSerLogin = false;
        } else {
          this.invalidUSerLogin = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Fejl',
            detail: 'Ugyldigt brugernavn eller adgangskode',
          });
        }
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Fejl',
          detail: 'Noget gik galt, prøv igen',
        });
      },
    });
  }
}  

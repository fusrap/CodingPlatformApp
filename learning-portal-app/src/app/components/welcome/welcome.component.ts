import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    ButtonModule,
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  email: string | null = null;
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.email = this.authService.getUserEmail();
    this.userRole = this.authService.getUserRole();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}

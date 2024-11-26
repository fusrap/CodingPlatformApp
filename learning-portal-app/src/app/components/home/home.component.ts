import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { UserService } from '../../services/user.service';
import { TableModule } from 'primeng/table';
import { User } from '../../interfaces/auth';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth.service';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    ToolbarModule,
    InputTextModule,
    ScrollPanelModule,
    TableModule,
    CardModule,
    ButtonModule,
    RippleModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private userServcie = inject(UserService)
  private authService = inject(AuthService)
  private router = inject(Router)


  users: User[] = []; 
  roleId = -1

  constructor(private primengConfig: PrimeNGConfig) {
    //this.userServcie.getAllUsers().subscribe({
     // next: (user) => {
      //  this.users = user
    //  }
   // })
  }

  ngOnInit() {
    const roleString = sessionStorage.getItem('role'); 
    this.roleId = roleString ? parseInt(roleString, 10) : -1; 
    this.primengConfig.ripple = true; 
  }



}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { UserService } from '../../services/user.service';
import { TableModule } from 'primeng/table';
import { User } from '../../interfaces/auth';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth.service';


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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor() {
    this.userServcie.getAllUsers().subscribe({
      next: (user) => {
        this.users = user
      }
    })
  }

  ngOnInit() {
    this.isTeacher = this.authService.getUserRole() == 'teacher';
  }

  isTeacher = false;

  private userServcie = inject(UserService)
  private authService = inject(AuthService)
  private router = inject(Router)


  users: User[] = []; 

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login'])
  }
}

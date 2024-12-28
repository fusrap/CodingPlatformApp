import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ProgressBarModule } from 'primeng/progressbar';
import { GamificationService } from '../../services/gamification.service';
import { ButtonModule } from 'primeng/button';

interface XPResponse {
  totalXP: number;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    ProgressBarModule,
    ButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private router = inject(Router);
  private gamificationService = inject(GamificationService);

  userRole: string | null = null;
  totalXP: number = 0;
  currentLevel: number = 0;
  remainingXP: number = 0;
  progress: number = 0;

  items: any[] = [];
  
  constructor() {}

  ngOnInit() {
    this.userRole = sessionStorage.getItem('role');
    console.log('User Role:', this.userRole);

    this.fetchUserXP();

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home',
      },
      {
        label: 'Kurser',
        icon: 'pi pi-palette',
        routerLink: '',
        items: [
          {
            label: 'Nyt kursus', 
            icon: 'pi pi-plus', 
            routerLink: '/create-course'
          }
        ]
      },
      {
        label: 'Spil',
        icon: 'pi pi-rocket',
        items: [
          {
            label: 'Jeopardy',
            icon: 'pi pi-star',
            items: [
              { label: 'Opret Jeopardy', icon: 'pi pi-plus', routerLink: '/create-jeopardy' },
            ]
          }
        ]
      },
      {
        label: 'Brugere',
        icon: 'pi pi-user',
        routerLink: '',
      },
      {
        label: 'Vejledning',
        icon: 'pi pi-book',
        routerLink: '/documentation',
      },
      {
        label: 'Log ud',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }


  fetchUserXP() {
    this.gamificationService.getCurrentUserTotalXP().subscribe({
      next: (response) => {
        this.totalXP = response['total_xp'] || 0; 
  
        this.currentLevel = Math.floor(this.totalXP / 1000);
  
        this.remainingXP = this.totalXP % 1000;
  
        this.progress = (this.remainingXP / 1000) * 100;
      },
      error: (err) => {
        console.error('Error fetching user XP:', err);
  
        this.totalXP = 0;
        this.currentLevel = 0;
        this.remainingXP = 0;
        this.progress = 0;
      },
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}

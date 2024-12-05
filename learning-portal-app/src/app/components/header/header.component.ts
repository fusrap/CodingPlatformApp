import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private router = inject(Router);

  userRole: string | null = null;
  
  items: any[] = [];
  
  constructor() {}

  ngOnInit() {
    this.userRole = sessionStorage.getItem('role');
    console.log('User Role:', this.userRole);
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
        label: 'Log ud',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
    
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}

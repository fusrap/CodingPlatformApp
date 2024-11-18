import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private router = inject(Router)

  items: any[] = []
  
  constructor() {}

  ngOnInit() {
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
    this.router.navigate(['login'])
  }
}

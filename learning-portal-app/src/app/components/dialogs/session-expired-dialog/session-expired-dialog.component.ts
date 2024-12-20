import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-session-expired-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule
  ],
  templateUrl: './session-expired-dialog.component.html',
  styleUrls: ['./session-expired-dialog.component.css']
})
export class SessionExpiredDialogComponent {
  visible: boolean = true; // Egenskab til at styre synligheden

  constructor(private router: Router) {}

  onClose(): void {
    this.visible = false; // Luk dialogen
    this.router.navigate(['/']); // Naviger til startsiden
  }

  onLogin(): void {
    this.visible = false; // Luk dialogen
    this.router.navigate(['/login']); // Naviger til login-siden
  }
}

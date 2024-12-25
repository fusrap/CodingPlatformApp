import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../../services/auth.service';


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
  visible: boolean = true;
  isRefreshing: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onLogin(): void {
    this.visible = false;
    this.router.navigate(['/login']);
  }

  onRefresh(): void {
    console.log("onRefresh called. Attempting to refresh token...");
  
    this.authService.refreshToken().subscribe(
      (success) => {
        console.log("Refresh token response received:", success);
  
        if (success) {
          console.log("Token refreshed successfully. Closing dialog.");
          this.visible = false; 
          this.router.navigate(['/']);
        } else {
          console.error("Token refresh failed. Redirecting to login.");
          this.router.navigate(['/login']); 
        }
      },
      (error) => {
        console.error("Error occurred during token refresh:", error);
        this.router.navigate(['/login']); 
      }
    );
  }
  
  
}

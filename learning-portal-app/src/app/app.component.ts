import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { BASE_URL } from './app.tokens';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Button,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'learning-portal-app';

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {  }


}  

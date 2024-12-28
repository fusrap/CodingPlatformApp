import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  constructor(private authService: AuthService) {}

  protected getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); 
    if (!token) {
      throw new Error('Brugeren er ikke logget ind eller token mangler');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
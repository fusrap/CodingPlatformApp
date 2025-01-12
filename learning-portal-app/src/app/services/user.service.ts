import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../app.tokens';
import { User } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { BaseService } from './base-service.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string,
    authService: AuthService
  ) {
    super(authService); 
  }

  getAllUsers(): Observable<User[]> {
    const url = `${this.baseUrl}/users`;
    return this.http.get<User[]>(url, { headers: this.getAuthHeaders() });
  }

  getCurrentUser(): Observable<User> {
    const url = `${this.baseUrl}/users/current`;
    return this.http.get<User>(url, { headers: this.getAuthHeaders() });
  }
}

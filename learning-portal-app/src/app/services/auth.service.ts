import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RegisterPostData, User } from '../interfaces/auth';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { BASE_URL, TOKEN_KEY } from '../app.tokens';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string,
    @Inject(TOKEN_KEY) private tokenKey: string

  ) {}


  registerUser(postData: RegisterPostData) {
    return this.http.post(`${this.baseUrl}/register`, postData)
  }

  login(email: string, password: string): Observable<boolean> {
    const loginPayload = { email, password };
  
    return this.http.post<any>(`${this.baseUrl}/login`, loginPayload).pipe(
      tap((response) => {
        const token = response.access_token;
  
        localStorage.setItem(this.tokenKey, token);
  
        const decodedToken: any = jwtDecode(token);
  
        sessionStorage.setItem('email', decodedToken.sub.email);
        sessionStorage.setItem('role', decodedToken.sub.role_id.toString());
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }
  
  getUserRole(): string | null {
    return sessionStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('email');
  }

  logout() {
    sessionStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); 
  }
}

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

  private roles: { [key: number]: string } = {
    0: 'Studerende',
    1: 'Underviser',
    2: 'Admin'
  };

  constructor(
    private http: HttpClient, 
    @Inject(BASE_URL) private baseUrl: string, 
    @Inject(TOKEN_KEY) private tokenKey: string
  ) {}
  

  registerUser(postData: RegisterPostData) {
    return this.http.post(`${this.baseUrl}/register`, postData);
  }

  

  login(email: string, password: string): Observable<boolean> {
    const loginPayload = { email, password };

    return this.http.post<any>(`${this.baseUrl}/login`, loginPayload).pipe(
      tap((response) => {
        const accessToken = response.access_token;
        const refreshToken = response.refresh_token;

        localStorage.setItem(this.tokenKey, accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const decodedToken: any = jwtDecode(accessToken);

        sessionStorage.setItem('email', decodedToken.sub.email);
        sessionStorage.setItem('role', decodedToken.sub.role_id.toString());
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  getRoleDescription(roleId: number): string {
    return this.roles[roleId] || 'Ukendt';
  }

  getCurrentRoleDescription(): string {
    const role = this.getUserRole(); 
    if (role === null) {
      return 'Ukendt';
    }
  
    const roleId = parseInt(role, 10);
    return this.roles[roleId] || 'Ukendt'; 
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

  getUserEmail(): string | null {
    return sessionStorage.getItem('email');
  }  

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  refreshToken(): Observable<boolean> {
    const token = this.getToken();
    console.log("refreshToken called. Current token:", token);

    if (!token) {
      console.warn("No token found in localStorage.");
      return of(false);
    }

    return this.http.post<any>(
      `${this.baseUrl}/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
        }
      }
    ).pipe(
      tap((response) => {
        console.log("Token refresh successful. New token:", response.access_token);

        const newToken = response.access_token;
        localStorage.setItem(this.tokenKey, newToken);

        const decodedToken: any = jwtDecode(newToken);
        sessionStorage.setItem('email', decodedToken.sub.email);
        sessionStorage.setItem('role', decodedToken.sub.role_id.toString());
      }),
      map(() => true),
      catchError((error) => {
        console.error("Token refresh failed. Error:", error);
        return of(false);
      })
    );
  }
}

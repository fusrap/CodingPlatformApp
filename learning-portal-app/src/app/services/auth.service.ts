import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RegisterPostData, User } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {}


  registerUser(postData: RegisterPostData) {
    postData.role = 'student';
    return this.http.post(`${this.baseUrl}/users`, postData)
  }

  getUserDetails(email: string, password: string): Observable<User[]> {
    const url = `${this.baseUrl}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return this.http.get<User[]>(url);
  }
   

  saveUserSession(user: User) {
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('role', user.role);
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
}

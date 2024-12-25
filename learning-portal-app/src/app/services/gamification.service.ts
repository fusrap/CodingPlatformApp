import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.tokens';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GamificationService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Brugeren er ikke logget ind eller token mangler');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  addXP(courseId: number, xpEarned: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = this.buildUrl('/xp'); 
    const body = { course_id: courseId, xp_earned: xpEarned };
    return this.http.post(url, body, { headers });
  }
  
  getTotalXP(userId: number): Observable<{ totalXP: number }> {
    const headers = this.getAuthHeaders();
    const url = this.buildUrl(`/xp/${userId}/total`); 
    return this.http.get<{ totalXP: number }>(url, { headers });
  }

  getCurrentUserTotalXP(): Observable<{
    [x: string]: number; totalXP: number 
}> {
    const headers = this.getAuthHeaders();
    const url = this.buildUrl(`/xp/total`); 
    return this.http.get<{ totalXP: number }>(url, { headers });
  }
  
  getLeaderboard(): Observable<{ leaderboard: any[] }> {
    const headers = this.getAuthHeaders();
    const url = this.buildUrl('/xp/leaderboard'); 
    return this.http.get<{ leaderboard: any[] }>(url, { headers });
  }  
}

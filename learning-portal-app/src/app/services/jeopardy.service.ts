import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../app.tokens';
import { Jeopardy } from '../interfaces/jeopardy';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JeopardyService {

  constructor(private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string) { }

    saveJeopardy(data: Jeopardy): Observable<any> {
      const url = `${this.baseUrl}/jeopardy`;
      return this.http.post(url, data);
    }

    getAllJeopardy(): Observable<Jeopardy[]> {
      const url = `${this.baseUrl}/jeopardy`;
      return this.http.get<{ jeopardy_games: Jeopardy[] }>(url).pipe(
          map(response => response.jeopardy_games), 
          catchError(err => {
              console.error('Error fetching Jeopardy games:', err);
              return of([]);  
          })
      );
  }
  
    getJeopardyById(id: string): Observable<any> {
      const url = `${this.baseUrl}/jeopardy/${id}`;
      return this.http.get(url);
    }

    deleteJeopardyById(id: number): Observable<any> {
      const url = `${this.baseUrl}/jeopardy/${id}`;
      return this.http.delete(url);
    }

}

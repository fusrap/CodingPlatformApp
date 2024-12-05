import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../app.tokens';
import { Jeopardy } from '../interfaces/jeopardy';
import { Observable } from 'rxjs';

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

}

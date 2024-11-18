import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPostData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) {  }


  registerUser(postData: RegisterPostData) {
      return this.http.post(`${this.baseUrl}/users`, postData)
  }
}

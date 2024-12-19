import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../app.tokens';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Course } from '../interfaces/course';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string,
    private authService: AuthService
  ) {}

  saveCourse(course: Course): Observable<Course> {
    const url = `${this.baseUrl}/course`;
    return this.http.post<Course>(url, course); 
  }

  deleteCourseById(id: number): Observable<any> {
    const url = `${this.baseUrl}/course/${id}`;
    return this.http.delete(url);
  }

  getCourseById(id: string): Observable<any> {
    const url = `${this.baseUrl}/course/${id}`;
    return this.http.get(url);
  }

  getCourses(): Observable<Course[]> {
    const url = `${this.baseUrl}/course`;
    return this.http.get<{ courses: Course[] }>(url).pipe(
        map(response => response.courses), 
        catchError(err => {
            console.error('Error fetching courses:', err);
            return of([]); 
        })
    );
  }

  enrollInCourse(courseId: number): Observable<any> {
    const token = this.authService.getToken(); 
    if (!token) {
      throw new Error('Brugeren er ikke logget ind eller token mangler');
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  
    const url = `${this.baseUrl}/course/enrollment/${courseId}`;
    return this.http.post(url, {}, { headers }); 
  }
  

  unenrollFromCourse(courseId: number): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Brugeren er ikke logget ind eller token mangler');
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  
    const url = `${this.baseUrl}/course/enrollment/${courseId}`;
    return this.http.delete(url, { headers }); 
  }
  
  
  getEnrollmentStatus(courseId: number): Observable<{ status: string }> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Brugeren er ikke logget ind eller token mangler');
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    const url = `${this.baseUrl}/course/enrollment/${courseId}`;
    return this.http.get<{ status: string }>(url, { headers });
  }
  

}
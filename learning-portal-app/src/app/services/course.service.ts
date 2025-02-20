import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../app.tokens';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Course, ExtendedCourse } from '../interfaces/course';
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
    const headers = this.getAuthHeaders();
    const url = this.buildUrl(`/course/enrollment/${courseId}`);
    return this.http.post(url, {}, { headers });
  }

  unenrollFromCourse(courseId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = this.buildUrl(`/course/enrollment/${courseId}`);
    return this.http.delete(url, { headers });
  }

  getEnrollmentStatus(courseId: number): Observable<{ status: string }> {
    const headers = this.getAuthHeaders();
    const url = this.buildUrl(`/course/enrollment/${courseId}`);
    return this.http.get<{ status: string }>(url, { headers });
  }

  completeCourse(courseId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = this.buildUrl(`/course/enrollment/${courseId}/complete`);
    return this.http.post(url, {}, { headers });
  }

  isCourseCompleted(courseId: number): Observable<{ completed: boolean }> {
    const headers = this.getAuthHeaders();
    const url = this.buildUrl(`/course/enrollment/${courseId}/complete`); 
    return this.http.get<{ completed: boolean }>(url, { headers }).pipe(
      catchError((err) => {
        console.error('Fejl ved kontrol af kursus fuldførelse:', err);
        return throwError(() => new Error('Kunne ikke kontrollere kursus fuldførelse'));
      })
    );
  }

  getEnrolledCourses(): Observable<ExtendedCourse[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl}/course/enrollment/enrolled`; 
    return this.http.get<{ courses: ExtendedCourse[] }>(url, { headers }).pipe(
      map(response => response.courses),
      catchError(err => {
        console.error('Error fetching enrolled courses:', err);
        return of([]);
      })
    );
  }
  
  
  
}
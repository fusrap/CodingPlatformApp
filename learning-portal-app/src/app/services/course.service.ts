import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../app.tokens';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {}

  saveCourse(course: Course): Observable<Course> {
    const url = `${this.baseUrl}/course`;
    return this.http.post<Course>(url, course); 
  }

  deleteCourseById(id: number): Observable<any> {
    const url = `${this.baseUrl}/course/${id}`;
    return this.http.delete(url);
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

}
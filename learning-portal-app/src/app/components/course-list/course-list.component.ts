import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { ExtendedCourse } from '../../interfaces/course';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  private courseService = inject(CourseService);
  private router = inject(Router);

  courses: ExtendedCourse[] = [];
  selectedCourse: ExtendedCourse | null = null; 

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses.map(course => ({
          ...course,
          enrolled: false,
          completed: false,
        }));
        this.updateCourseStatuses();
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  }

  updateCourseStatuses() {
    this.courses.forEach(course => {
      this.courseService.getEnrollmentStatus(course.id).subscribe({
        next: (status) => {
          course.enrolled = status.status === 'Enrolled';
        },
        error: (err) => {
          console.error(`Error fetching enrollment status for course ${course.id}:`, err);
          course.enrolled = false;
        }
      });

      this.courseService.isCourseCompleted(course.id).subscribe({
        next: (response) => {
          course.completed = response.completed;
        },
        error: (err) => {
          console.error(`Error checking completion status for course ${course.id}:`, err);
          course.completed = false;
        }
      });
    });
  }

  navigateToCourse(courseId: number) {
    this.router.navigate(['/course', courseId]);
  }

  enrollInCourse(course: ExtendedCourse) {
    this.courseService.enrollInCourse(course.id).subscribe({
      next: () => {
        alert('Du er nu tilmeldt kurset!');
        course.enrolled = true;
        course.completed = false;
      },
      error: (err) => {
        console.error('Error enrolling in course:', err);
        alert('Der opstod en fejl ved tilmeldingen.');
      }
    });
  }

  unenrollFromCourse(course: ExtendedCourse) {
    this.courseService.unenrollFromCourse(course.id).subscribe({
      next: () => {
        alert('Du er nu afmeldt fra kurset!');
        course.enrolled = false;
      },
      error: (err) => {
        console.error('Error unenrolling from course:', err);
        alert('Der opstod en fejl ved afmeldingen.');
      }
    });
  }
}

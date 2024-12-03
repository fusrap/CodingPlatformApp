import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { UserService } from '../../services/user.service';
import { TableModule } from 'primeng/table';
import { User } from '../../interfaces/auth';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth.service';
import { PrimeNGConfig } from 'primeng/api';
import { CourseService } from '../../services/course.service';
import { Course } from '../../interfaces/course';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    ToolbarModule,
    InputTextModule,
    ScrollPanelModule,
    TableModule,
    CardModule,
    ButtonModule,
    RippleModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private userService = inject(UserService);
  private courseService = inject(CourseService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private primengConfig = inject(PrimeNGConfig);

  courses: Course[] = [];
  users: User[] = [];
  roleId = -1;

  ngOnInit() {
    const roleString = sessionStorage.getItem('role');
    this.roleId = roleString ? parseInt(roleString, 10) : -1;

    this.primengConfig.ripple = true;

    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        console.log('Courses fetched:', this.courses);
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      },
    });
  }

  removeCourse(courseToRemove: Course) {
    this.courses = this.courses.filter(course => course.id !== courseToRemove.id);
  }
  
}

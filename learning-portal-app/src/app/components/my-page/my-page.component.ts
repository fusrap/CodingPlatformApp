import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamificationService } from '../../services/gamification.service';
import { ChartModule } from 'primeng/chart';
import { HeaderComponent } from '../header/header.component';
import { CourseService } from '../../services/course.service';
import { ExtendedCourse } from '../../interfaces/course';
import { ListboxModule } from 'primeng/listbox';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    HeaderComponent,
    ListboxModule,
    CardModule,
    TableModule,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})

export class MyPageComponent implements OnInit {
  private gamificationService = inject(GamificationService);
  private courseService = inject(CourseService);
  private router = inject(Router);
  private userService = inject(UserService)
  private authService = inject(AuthService);


  totalXP: number = 0;
  remainingXP: number = 0;
  currentLevel: number = 0;
  chartData: any;
  chartOptions: any;

  isDialogVisible: boolean = false;

  userRoleDescription: string = 'Ukendt'; 
  userInfo: { fullName: string; email: string; role: string } | null = null;
  enrolledCourses: ExtendedCourse[] = [];
  selectedCourse: ExtendedCourse | null = null;

  ngOnInit() {
    this.fetchUserInfo();
    this.fetchUserXP();
    this.fetchEnrolledCourses();
  }

  unenrollFromCourse(course: ExtendedCourse) {
    if (confirm(`Er du sikker på, at du vil afmelde kurset: ${course.courseTitle}?`)) {
      this.courseService.unenrollFromCourse(course.id).subscribe({
        next: () => {
          this.enrolledCourses = this.enrolledCourses.filter(c => c.id !== course.id);
          alert(`Du er nu afmeldt fra kurset: ${course.courseTitle}`);
        },
        error: (err) => {
          console.error('Error unenrolling from course:', err);
          alert('Der opstod en fejl ved afmeldingen af kurset.');
        },
      });
    }
  }

  navigateToCourse(event: any) {
    const course = event.data;
    this.router.navigate(['/course', course.id]);
  }

  fetchUserXP() {
    this.gamificationService.getCurrentUserTotalXP().subscribe({
      next: (response) => {
        this.totalXP = response['total_xp'] || 0;
        this.currentLevel = Math.floor(this.totalXP / 1000);
        this.remainingXP = this.totalXP % 1000;

        this.updateChart();
      },
      error: (err) => {
        console.error('Error fetching user XP:', err);
      },
    });
  }

  updateChart() {
    this.chartData = {
      labels: ['Point', 'XP Til næste level'],
      datasets: [
        {
          data: [this.remainingXP, 1000 - this.remainingXP],
          backgroundColor: ['#42A5F5', '#D6D6D6'],
          hoverBackgroundColor: ['#64B5F6', '#E0E0E0']
        }
      ]
    };

    this.chartOptions = {
      cutout: '70%',
      animation: {
        animateRotate: true,
        animateScale: true
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label || '';
              const value = context.raw;
              return `${label}: ${value} XP`;
            }
          }
        },
        legend: {
          display: true
        }
      }
    };
  }

  fetchEnrolledCourses() {
    this.courseService.getEnrolledCourses().subscribe({
      next: (courses) => {
        this.enrolledCourses = courses.filter(course => course.enrolled === true);
      },
      error: (err) => {
        console.error('Error fetching enrolled courses:', err);
      }
    });
  }

  fetchUserInfo() {
    this.userService.getCurrentUser().subscribe({
      next: (info) => {
        this.userInfo = info;
        this.userRoleDescription = this.authService.getCurrentRoleDescription(); 
      },
      error: (err) => {
        console.error('Error fetching user info:', err);
      }
    });
  }

  editDetails() {
    this.isDialogVisible = true; 
  }

  closeDialog() {
    this.isDialogVisible = false; 
  }
  
}

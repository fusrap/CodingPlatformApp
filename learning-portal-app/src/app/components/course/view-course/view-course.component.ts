import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { Course, ExtendedCourse } from '../../../interfaces/course';
import { ExtendedContentElement, ExtendedInputElement, ExtendedTextElement } from '../../../interfaces/extended-content-element';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { GamificationService } from '../../../services/gamification.service';


@Component({
  selector: 'app-view-course',
  standalone: true,
  imports: [
    ButtonModule,
    ProgressSpinnerModule,
    FormsModule,
    HeaderComponent,
    MessageModule,
    MessagesModule,
    CardModule,
    InputTextModule,
    RouterLink,
    DialogModule,
  ],
  templateUrl: './view-course.component.html',
})
export class ViewCourseComponent {

    courseId: string | null = null;
    courseData: ExtendedCourse | null = null;
    isLoading: boolean = true;
    isProcessing: boolean = false;
    errorMessage: string = '';
    isEnrolled: boolean | null = null;
    isCourseCompleted: boolean = false;
    isCourseCompletedDialogVisible: boolean = false; 
  
    maxScore: number = 0;
    currentScore: number = 0;
    earnedXP: number = 0;
  
    constructor(private route: ActivatedRoute, private courseService: CourseService, private gamificationService: GamificationService, private router: Router) {}
  
    ngOnInit() {
      this.courseId = this.route.snapshot.paramMap.get('id');
      if (this.courseId) {
        this.loadCourseData();
        this.checkCourseCompletion();
      }
    }
  
    checkCourseCompletion() {
      this.courseService.isCourseCompleted(Number(this.courseId)).subscribe({
        next: (response) => {
          this.isCourseCompleted = response.completed;
        },
        error: (err) => {
          console.error('Fejl ved tjek af kursus fuldførelse:', err);
          this.isCourseCompleted = false;
        },
      });
    }
  
    loadCourseData() {
      this.courseService.getCourseById(this.courseId!).subscribe({
        next: (data: { course: Course }) => {
          const extendedElements = data.course.elements.map((element) => {
            if (element.type === 'Input') {
              return {
                ...element,
                userAnswer: '',
                isCorrect: null,
              } as ExtendedInputElement;
            }
            return element as ExtendedTextElement;
          });
          this.courseData = {
            ...data.course,
            elements: extendedElements,
          } as ExtendedCourse;
  
          this.maxScore = extendedElements.filter(
            (element) => element.type === 'Input'
          ).length;
  
          this.isLoading = false;
          this.checkEnrollmentStatus();
        },
        error: () => {
          this.errorMessage = 'Kunne ikke hente kursusdata.';
          this.isLoading = false;
        },
      });
    }
  
    checkEnrollmentStatus() {
      this.courseService.getEnrollmentStatus(Number(this.courseId)).subscribe({
        next: (response) => {
          this.isEnrolled = response.status === 'Enrolled';
        },
        error: () => {
          this.isEnrolled = null;
        },
      });
    }
  
    enroll() {
      this.isProcessing = true;
      this.courseService.enrollInCourse(Number(this.courseId)).subscribe({
        next: () => {
          this.isEnrolled = true;
          this.isProcessing = false;
        },
        error: () => {
          alert('Der opstod en fejl under tilmelding.');
          this.isProcessing = false;
        },
      });
    }
  
    unenroll() {
      this.isProcessing = true;
      this.courseService.unenrollFromCourse(Number(this.courseId)).subscribe({
        next: () => {
          this.isEnrolled = false;
          this.isProcessing = false;
        },
        error: () => {
          alert('Der opstod en fejl under afmelding.');
          this.isProcessing = false;
        },
      });
    }
  
    checkAnswer(element: ExtendedInputElement) {
      if (element.userAnswer?.trim().toLowerCase() === element.answer.trim().toLowerCase()) {
        if (element.isCorrect === null || element.isCorrect === false) {
          this.currentScore++;
        }
        element.isCorrect = true;
      } else {
        if (element.isCorrect === true) {
          this.currentScore--;
        }
        element.isCorrect = false;
      }
    
      if (this.currentScore === this.maxScore) {
        this.calculateXP(); 
        this.markCourseAsCompleted();
      }
    }  
  
    markCourseAsCompleted() {
      this.courseService.completeCourse(Number(this.courseId)).subscribe({
        next: () => {
          this.updateXP(); 
          this.isCourseCompletedDialogVisible = true;
        },
        error: (error) => {
          console.error('Fejl under afslutning af kurset:', error);
          alert('Der opstod en fejl under registrering af gennemførelsen.');
        },
      });
    }
    
    updateXP() {
      this.gamificationService.addXP(Number(this.courseId), this.earnedXP).subscribe({
        next: (response) => {
          console.log('XP gemt i databasen:', response);
        },
        error: (err) => {
          console.error('Fejl ved opdatering af XP:', err);
          alert('Kunne ikke gemme XP.');
        }
      });
    }
    
  
    isTextElement(element: ExtendedContentElement): element is ExtendedTextElement {
      return element.type === 'Text';
    }
  
    isInputElement(element: ExtendedContentElement): element is ExtendedInputElement {
      return element.type === 'Input';
    }

    completeCourse() {
      this.isCourseCompletedDialogVisible = false;
      this.router.navigate(['/']); 
    }

    calculateXP() {
      const baseXP = 350;
      const xpPerInput = 75;
      this.earnedXP = baseXP + this.maxScore * xpPerInput;
    }
  }
  
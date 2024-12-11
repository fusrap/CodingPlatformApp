import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from "../../header/header.component";
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Course, CoursePostData } from '../../../interfaces/course';
import { CourseContentManagerComponent } from "../course-content-manager/course-content-manager.component";
import { CommonModule } from '@angular/common';
import { ContentElement, ContentType, InputElement, TextElement } from '../../../interfaces/content-element';
import { CourseService } from '../../../services/course.service';


@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterLink,
    HeaderComponent,
    TooltipModule,
    InputTextareaModule,
    FloatLabelModule,
    CourseContentManagerComponent,
    CommonModule
],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})

export class CreateCourseComponent {

  constructor(
    private courseService: CourseService,
    private router: Router 
  ) {}

  courseForm = new FormGroup({
    courseTitle: new FormControl('', [Validators.required]),
    courseDescription: new FormControl()
  });

  courseElements: ContentElement[] = []; 
  isEditable: boolean = true;
  courseData: Course | null = null; 
  loading: boolean = false;

  onCreateCourse() {
    this.courseData = {
      ...this.courseForm.value as CoursePostData,
      elements: [...this.courseElements], 
      id: Date.now() 
    };
    this.isEditable = false;

    console.log('Course created:', this.courseData);
  }

  onElementsChange(updatedElements: ContentElement[]) {
    this.courseElements = updatedElements;
    console.log('Updated elements in CreateCourseComponent:', this.courseElements);
  }

  editCourse() {
    this.isEditable = true;
  }

  saveCourse() {
    if (this.courseData) {
      const sanitizedElements = this.courseElements.map((element) => {
        if ('text' in element) {
          const textElement = element as TextElement;
          return {
            id: textElement.id,
            isEditing: textElement.isEditing,
            type: ContentType.Text,
            text: textElement.text,
          };
        } else if ('label' in element && 'answer' in element) {
          const inputElement = element as InputElement;
          return {
            id: inputElement.id,
            isEditing: inputElement.isEditing,
            type: ContentType.Input, 
            label: inputElement.label,
            answer: inputElement.answer,
          };
        }
  
        throw new Error(`Unknown element type for element: ${JSON.stringify(element)}`); 
      });
  
      const sanitizedCourseData = {
        ...this.courseData,
        elements: sanitizedElements,
      };
      this.loading = true;
      this.courseService.saveCourse(sanitizedCourseData).subscribe({
        next: (response) => {
          console.log('Course saved successfully:', response);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Failed to save course:', err);
          this.loading = false;
        },
      });
    } else {
      console.error('No course data to save.');
      this.loading = false;
    }
  }

  synchronizeElements() {
    this.onElementsChange([...this.courseElements]);
  }

  get courseTitle() {
    return this.courseForm.controls['courseTitle'];
  }

  get courseDescription() {
    return this.courseForm.controls['courseDescription'];
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterLink,
    HeaderComponent
],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})

export class CreateCourseComponent {

  courseForm = new FormGroup({
    courseTitle: new FormControl('', [Validators.required])
  })

  onCreateCourse() {}

  get courseTitle() {
    return this.courseForm.controls['courseTitle']
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-view-course',
  standalone: true,
  imports: [],
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.css'
})
export class ViewCourseComponent {
  courseId: string | null = null;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    console.log('Course ID:', this.courseId);
  }
}

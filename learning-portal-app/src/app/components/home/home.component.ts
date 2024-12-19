import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CourseService } from '../../services/course.service';
import { JeopardyService } from '../../services/jeopardy.service';

import { User } from '../../interfaces/auth';
import { Course } from '../../interfaces/course';
import { Jeopardy } from '../../interfaces/jeopardy';
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private courseService = inject(CourseService);
  private jeopardyService = inject(JeopardyService);
  private primengConfig = inject(PrimeNGConfig);
  private router = inject(Router);

  combinedList: any[] = [];
  filteredCombinedList: any[] = []; 
  selectedItem: any | null = null;
  users: User[] = [];
  roleId: number = -1;
  searchQuery: string = ''; 

  ngOnInit() {
    this.initializeUserRole();
    this.enablePrimeNgRippleEffect();

    this.fetchCourses();
    this.fetchJeopardyGames();
  }

  onRowSelect(event: any) {
    const selectedItem = event.data;
    if (selectedItem.type === 'course') {
      this.router.navigate(['/course', selectedItem.id]);
    } else if (selectedItem.type === 'jeopardy') {
      this.router.navigate(['/jeopardy', selectedItem.id]);
    }
  }

  private initializeUserRole() {
    const roleString = sessionStorage.getItem('role');
    this.roleId = roleString ? parseInt(roleString, 10) : -1;
  }

  private enablePrimeNgRippleEffect() {
    this.primengConfig.ripple = true;
  }

  private fetchCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => this.handleFetchedData(data, 'course'),
      error: (err) => this.handleError('courses', err),
    });
  }

  private fetchJeopardyGames() {
    this.jeopardyService.getAllJeopardy().subscribe({
      next: (data) => this.handleFetchedData(data, 'jeopardy'),
      error: (err) => this.handleError('Jeopardy games', err),
    });
  }

  private handleFetchedData(data: any[], type: string) {
    const formattedData = data.map((item) => ({
      ...item,
      type,
    }));
    this.updateCombinedList(formattedData);
  }

  private handleError(context: string, error: any) {
    console.error(`Error fetching ${context}:`, error);
  }

  private updateCombinedList(data: any[]) {
    this.combinedList = [...this.combinedList, ...data];
    this.filteredCombinedList = [...this.combinedList]; 
  }

  filterData() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.filteredCombinedList = [...this.combinedList]; 
      return;
    }
    this.filteredCombinedList = this.combinedList.filter((item) =>
      (item.courseTitle || item.title || '').toLowerCase().includes(query) ||
      (item.courseDescription || item.description || '').toLowerCase().includes(query)
    );
  }

  removeItem(item: any) {
    if (item.type === 'course') {
      this.deleteCourse(item);
    } else if (item.type === 'jeopardy') {
      this.deleteJeopardy(item);
    }
  }

  private deleteCourse(course: Course) {
    this.courseService.deleteCourseById(course.id).subscribe({
      next: () => this.removeFromCombinedList(course.id),
      error: (err) => this.handleError('course deletion', err),
    });
  }

  private deleteJeopardy(jeopardy: Jeopardy) {
    this.jeopardyService.deleteJeopardyById(jeopardy.id).subscribe({
      next: () => this.removeFromCombinedList(jeopardy.id),
      error: (err) => this.handleError('Jeopardy deletion', err),
    });
  }

  private removeFromCombinedList(itemId: number) {
    this.combinedList = this.combinedList.filter((item) => item.id !== itemId);
    this.filterData(); 
  }
}

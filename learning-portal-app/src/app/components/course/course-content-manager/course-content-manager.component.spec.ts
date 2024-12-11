import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseContentManagerComponent } from './course-content-manager.component';

describe('CourseContentManagerComponent', () => {
  let component: CourseContentManagerComponent;
  let fixture: ComponentFixture<CourseContentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseContentManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseContentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

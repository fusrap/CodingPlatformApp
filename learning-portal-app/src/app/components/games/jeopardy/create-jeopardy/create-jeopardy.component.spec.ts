import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJeopardyComponent } from './create-jeopardy.component';

describe('CreateJeopardyComponent', () => {
  let component: CreateJeopardyComponent;
  let fixture: ComponentFixture<CreateJeopardyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateJeopardyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateJeopardyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

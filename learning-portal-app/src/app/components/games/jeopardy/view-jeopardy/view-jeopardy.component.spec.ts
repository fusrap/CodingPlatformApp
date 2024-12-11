import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJeopardyComponent } from './view-jeopardy.component';

describe('ViewJeopardyComponent', () => {
  let component: ViewJeopardyComponent;
  let fixture: ComponentFixture<ViewJeopardyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewJeopardyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJeopardyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

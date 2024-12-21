import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayJeopardyComponent } from './play-jeopardy.component';

describe('PlayJeopardyComponent', () => {
  let component: PlayJeopardyComponent;
  let fixture: ComponentFixture<PlayJeopardyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayJeopardyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayJeopardyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

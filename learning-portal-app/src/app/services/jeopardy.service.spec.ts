import { TestBed } from '@angular/core/testing';

import { JeopardyService } from './jeopardy.service';

describe('JeopardyService', () => {
  let service: JeopardyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JeopardyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

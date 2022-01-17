import { TestBed } from '@angular/core/testing';

import { TaskStaticService } from './task-static.service';

describe('TaskStaticService', () => {
  let service: TaskStaticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStaticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

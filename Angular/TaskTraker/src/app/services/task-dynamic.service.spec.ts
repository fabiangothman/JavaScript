import { TestBed } from '@angular/core/testing';

import { TaskDynamicService } from './task-dynamic.service';

describe('TaskDynamicService', () => {
  let service: TaskDynamicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDynamicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

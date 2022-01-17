import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TASKS } from 'src/app/mock-tasks';
import { Task } from 'src/app/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskStaticService {

  constructor() { }

  getTasks = (): Observable<Task[]> => {
    const tasks = of(TASKS);
    return tasks;
  }
}

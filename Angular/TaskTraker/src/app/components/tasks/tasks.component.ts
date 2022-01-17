import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
// import { TaskStaticService } from 'src/app/services/task-static.service';
import { TaskDynamicService } from 'src/app/services/task-dynamic.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public tasks: Task[] = [];

  // constructor(private taskStaticService: TaskStaticService) { }
  constructor(private TaskDynamicService: TaskDynamicService) { }

  ngOnInit(): void {
    // this.taskStaticService.getTasks().subscribe(tasks => this.tasks = tasks);
    this.TaskDynamicService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  deleteTask = (task: Task) => {
    this.TaskDynamicService.deleteTask(task).subscribe(
      () => this.tasks = this.tasks.filter((t) => t.id !== task.id),
    );
  }

  toggleReminder = (task: Task) => {
    task.reminder = !task.reminder;
    this.TaskDynamicService.updateTask(task).subscribe();
  }

  addTask = (task: Task) => {
    this.TaskDynamicService.createTask(task).subscribe(task => this.tasks.push(task));
  }

}

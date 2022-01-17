import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/Task';

const httpClientOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TaskDynamicService {
  private apiUrl: string = "http://localhost:5000/tasks";

  constructor(private httpClient: HttpClient) { }

  getTasks = (): Observable<Task[]> => {
    return this.httpClient.get<Task[]>(`${this.apiUrl}`);
  }

  deleteTask = (task: Task): Observable<Task> => {
    return this.httpClient.delete<Task>(`${this.apiUrl}/${task.id}`);
  }

  updateTask = (task: Task): Observable<Task> => {
    return this.httpClient.put<Task>(`${this.apiUrl}/${task.id}`, task, httpClientOptions);
  }

  createTask = (task: Task): Observable<Task> => {
    return this.httpClient.post<Task>(`${this.apiUrl}`, task, httpClientOptions);
  }
}

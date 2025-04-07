import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  createTask(description: string): Observable<any> {
    return this.http.post(this.api, { description });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ITodo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly API_URL = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  // GET all todos
  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.API_URL).pipe(
      map((todos) =>
        todos.map((todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }))
      )
    );
  }

  // POST a new todo
  addTodo(todo: Omit<ITodo, 'id'>): Observable<ITodo> {
    return this.http.post<ITodo>(this.API_URL, todo);
  }

  // PATCH to toggle completion
  toggleTodoCompletion(id: number): Observable<ITodo> {
    return this.http.patch<ITodo>(`${this.API_URL}/${id}`, {
      completed: true, // placeholder — effect will handle actual logic
    });
  }
}

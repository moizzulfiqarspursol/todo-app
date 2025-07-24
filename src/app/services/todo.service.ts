import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { ITodo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSubject = new BehaviorSubject<ITodo[]>([]);
  todos$ = this.todosSubject.asObservable();

  private readonly API_URL = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {
    this.loadTodos();
  }

  // Load todos from the mock backend
  private loadTodos(): void {
    this.http
      .get<ITodo[]>(this.API_URL)
      .pipe(
        map((todos) =>
          todos.map((todo) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
          }))
        )
      )
      .subscribe((todos) => this.todosSubject.next(todos));
  }

  // // Add new todo via POST request
  // addTodo(todo: ITodo): void {
  //   this.http.post<ITodo>(this.API_URL, todo).subscribe((createdTodo) => {
  //     const current = this.todosSubject.getValue();
  //     this.todosSubject.next([...current, createdTodo]);
  //   });
  // }


  addTodo(todo: ITodo): void {
    this.http.post<ITodo>(this.API_URL, todo).subscribe((createdTodo) => {
      const current = this.todosSubject.getValue();
      this.todosSubject.next([...current, createdTodo]); // Use returned todo with correct id
    });
  }


  // Toggle completion via PATCH request
  toggleTodoCompletion(id: number): void {
    const currentTodos = this.todosSubject.getValue();
    const targetTodo = currentTodos.find((t) => t.id === id);
    if (!targetTodo) return;

    const updatedStatus = { completed: !targetTodo.completed };

    this.http
      .patch<ITodo>(`${this.API_URL}/${id}`, updatedStatus)
      .subscribe((updatedTodo) => {
        const updatedTodos = currentTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
        );
        this.todosSubject.next(updatedTodos);
      });
  }
}

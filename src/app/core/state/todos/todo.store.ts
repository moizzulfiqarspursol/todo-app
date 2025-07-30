import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TodoActions from './todo.actions';
import {
  selectAllTodos,
  todoFeature,
} from './todo.feature';
import { ITodo } from '../../../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private store = inject(Store);
  
  todos$: Observable<ITodo[]> = this.store.select(selectAllTodos);
  loading$: Observable<boolean> = this.store.select(todoFeature.selectLoading);
  loaded$: Observable<boolean> = this.store.select(todoFeature.selectLoaded);
  error$: Observable<string | null> = this.store.select(todoFeature.selectError);

  loadTodos(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  addTodo(todo: Omit<ITodo, 'id'>): void {
    console.log("addTodo called with todo:", todo);
    this.store.dispatch(TodoActions.addTodo({ todo }));
  }

  toggleTodo(id: number): void {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }
}
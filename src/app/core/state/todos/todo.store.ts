import { Injectable } from '@angular/core';
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
  todos$!: Observable<ITodo[]>;
  loading$!: Observable<boolean>;
  loaded$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
    this.loading$ = this.store.select(todoFeature.selectLoading);
    this.loaded$ = this.store.select(todoFeature.selectLoaded);
    this.error$ = this.store.select(todoFeature.selectError);
  }

  loadTodos(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  addTodo(todo: Omit<ITodo, 'id'>): void {
    this.store.dispatch(TodoActions.addTodo({ todo }));
  }

  toggleTodo(id: number): void {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }
}

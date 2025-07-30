import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, concatMap, of } from 'rxjs';
import * as TodoActions from './todo.actions';
import { TodoService } from '../../../services/todo.service';
import { ITodo } from '../../../models/todo.model';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private todoService = inject(TodoService);

  // Effect: Load Todos
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map((todos: ITodo[]) =>
            TodoActions.loadTodosSuccess({ todos })
          ),
          catchError((error) =>
            of(TodoActions.loadTodosFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Effect: Add Todo
  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      concatMap(({ todo }) =>
        this.todoService.addTodo(todo).pipe(
          map((createdTodo: ITodo) =>
            TodoActions.addTodoSuccess({ todo: createdTodo })
          ),
          catchError((error) =>
            of(TodoActions.addTodoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Effect: Toggle Completion
  toggleTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.toggleTodo),
      concatMap(({ id }) =>
        this.todoService.toggleTodoCompletion(id).pipe(
          map((updatedTodo: ITodo) =>
            TodoActions.toggleTodoSuccess({ updatedTodo })
          ),
          catchError((error) =>
            of(TodoActions.toggleTodoFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
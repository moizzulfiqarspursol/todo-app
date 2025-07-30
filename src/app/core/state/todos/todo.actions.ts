import { createAction, props } from '@ngrx/store';
import { ITodo } from '../../../models/todo.model';

// Load All Todos
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: ITodo[] }>()
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: string }>()
);

// Add Todo
export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: Omit<ITodo, 'id'> }>()
);
export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ todo: ITodo }>()
);
export const addTodoFailure = createAction(
  '[Todo] Add Todo Failure',
  props<{ error: string }>()
);

// Toggle Completion
export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ id: number }>()
);
export const toggleTodoSuccess = createAction(
  '[Todo] Toggle Todo Success',
  props<{ updatedTodo: ITodo }>()
);
export const toggleTodoFailure = createAction(
  '[Todo] Toggle Todo Failure',
  props<{ error: string }>()
);

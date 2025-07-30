import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ITodo } from '../../../models/todo.model';
import * as TodoActions from './todo.actions';

// 1. Extend EntityState to include custom metadata
export interface TodoState extends EntityState<ITodo> {
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

// 2. Create adapter
export const todoAdapter = createEntityAdapter<ITodo>();

// 3. Define initial state
export const initialState: TodoState = todoAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
});

// 4. Create the reducer using createFeature
export const todoFeature = createFeature({
  name: 'todos',
  reducer: createReducer(
    initialState,

    // Load Todos
    on(TodoActions.loadTodos, state => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(TodoActions.loadTodosSuccess, (state, { todos }) =>
      todoAdapter.setAll(todos, {
        ...state,
        loading: false,
        loaded: true,
      })
    ),
    on(TodoActions.loadTodosFailure, (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    })),

    // Add Todo
    on(TodoActions.addTodo, state => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(TodoActions.addTodoSuccess, (state, { todo }) =>
      todoAdapter.addOne(todo, {
        ...state,
        loading: false,
      })
    ),
    on(TodoActions.addTodoFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    // Toggle Completion
    on(TodoActions.toggleTodo, state => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(TodoActions.toggleTodoSuccess, (state, { updatedTodo }) =>
      todoAdapter.updateOne(
        { id: updatedTodo.id, changes: updatedTodo },
        {
          ...state,
          loading: false,
        }
      )
    ),
    on(TodoActions.toggleTodoFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
});

// 5. Export selectors
export const {
  selectAll: selectAllTodos,
  selectEntities: selectTodoEntities,
  selectIds: selectTodoIds,
  selectTotal: selectTodoTotal,
} = todoAdapter.getSelectors(todoFeature.selectTodosState);

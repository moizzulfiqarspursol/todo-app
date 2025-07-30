import { CommonModule, NgFor } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { TodoStore } from '../../core/state/todos/todo.store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private todoStore = inject(TodoStore);
  todos = toSignal(this.todoStore.todos$);

  incompleteTodos = computed(() =>
    this.todos()?.filter((t) => !t.completed) ?? []
  );
  completedTodos = computed(() =>
    this.todos()?.filter((t) => t.completed) ?? []
  );

  toggleCompletion(todoId: number): void {
    setTimeout(() => {
      this.todoStore.toggleTodo(todoId);
    }, 300);
  }
}

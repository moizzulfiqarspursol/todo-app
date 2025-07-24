import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { delay } from 'rxjs';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
   @Input() todos: ITodo[] = [];

  incompleteTodos: ITodo[] = [];
  completedTodos: ITodo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todos']) {
      this.incompleteTodos = this.todos.filter(t => !t.completed);
      this.completedTodos = this.todos.filter(t => t.completed);
    }
  }

  toggleCompletion(todoId: number): void {
    setTimeout(() => {
      this.todoService.toggleTodoCompletion(todoId);
    }, 300);
  }
}

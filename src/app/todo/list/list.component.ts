import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  incompleteTodos: ITodo[] = [];
  completedTodos: ITodo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.todos$.subscribe((todos) => {
      this.incompleteTodos = todos.filter(t => !t.completed);
      this.completedTodos = todos.filter(t => t.completed);
    });
  }

  toggleCompletion(todoId: number): void {
    this.todoService.toggleTodoCompletion(todoId);
  }
}

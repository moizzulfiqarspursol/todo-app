import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../models/todo.model';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from '../todo/form/form.component';
import { ListComponent } from '../todo/list/list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FormComponent, ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
todos: ITodo[] = [];

  constructor(private todoService: TodoService) {
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
    });
  }

  handleSubmit(todoData: Omit<ITodo, 'id'>) {
    this.todoService.addTodo(todoData as ITodo);
  }
}

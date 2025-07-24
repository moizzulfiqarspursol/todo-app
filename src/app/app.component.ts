import { Component } from '@angular/core';
import { Event, RouterOutlet } from '@angular/router';
import { TodoModule } from './todo/todo.module';
import { FormComponent } from "./todo/form/form.component";
import { ListComponent } from "./todo/list/list.component";
import { CommonModule } from '@angular/common';
import { ITodo } from './models/todo.model';
import { FormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoModule, FormComponent, ListComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
   title = 'todo-app';
  todos: ITodo[] = [];

  constructor(private todoService: TodoService) {
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
    });
  }

  handleTodoSubmit(todoData: Omit<ITodo, 'id'>) {
    this.todoService.addTodo(todoData as ITodo);
  }
}

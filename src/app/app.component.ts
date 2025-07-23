import { Component } from '@angular/core';
import { Event, RouterOutlet } from '@angular/router';
import { TodoModule } from './todo/todo.module';
import { FormComponent } from "./todo/form/form.component";
import { ListComponent } from "./todo/list/list.component";
import { CommonModule } from '@angular/common';
import { ITodo } from './models/model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoModule, FormComponent, ListComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-app';
  todoItems: ITodo[] = [];

  addTodo(value: ITodo): void {
    this.todoItems = [...this.todoItems, value];
  }

}

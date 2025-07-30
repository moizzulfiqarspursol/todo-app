import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from '../todo/form/form.component';
import { ListComponent } from '../todo/list/list.component';
import { TodoStore } from '../core/state/todos/todo.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FormComponent, ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private todoStore: TodoStore) {}

  ngOnInit(): void {
    this.todoStore.loadTodos(); // Dispatch load action on init
  }
}

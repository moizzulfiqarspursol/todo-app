import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ITodo, Priority } from '../../models/todo.model'
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  title: string = '';
  description: string = '';
  priority: Priority = Priority.LOW;
  priorities: Priority[] = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];

  @ViewChild('titleInput') titleInputRef!: ElementRef<HTMLInputElement>;
  private cleanupTimer: any;

  constructor(private todoService: TodoService) {}

  onSubmitForm(): void {
    const newTodo: Omit<ITodo, 'id'> = {
      title: this.title,
      description: this.description,
      priority: this.priority,
      createdAt: new Date(),
      completed: false
    };
    this.todoService.addTodo(newTodo as ITodo);
    this.clearForm();
  }

  private clearForm() {
    this.title = '';
    this.description = '';
    this.priority = Priority.LOW;
    this.titleInputRef?.nativeElement.focus();
  }

  ngAfterViewInit(): void {
    this.titleInputRef?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
  }
}

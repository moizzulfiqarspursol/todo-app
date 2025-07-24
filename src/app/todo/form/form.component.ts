import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ITodo, Priority } from '../../models/todo.model'
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, NgFor, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements AfterViewInit, OnDestroy {
  title: string = '';
  description: string = '';
  priority: Priority = Priority.LOW;

  priorities: Priority[] = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];
  savedMessage: string = '';
  private toastTimer: any;

  @ViewChild('titleInput') titleInputRef!: ElementRef<HTMLInputElement>;

  constructor(private todoService: TodoService) {}

  onSubmitForm(): void {
    if (!this.title.trim()) return;

    const newTodo: Omit<ITodo, 'id'> = {
      title: this.title,
      description: this.description,
      priority: this.priority,
      createdAt: new Date(),
      completed: false
    };

    this.todoService.addTodo(newTodo as ITodo);
    this.showToast('✅ Todo added!');
    this.clearForm();
  }

  private showToast(message: string): void {
    this.savedMessage = message;

    this.toastTimer = setTimeout(() => {
      this.savedMessage = '';
    }, 3000);
  }

  private clearForm(): void {
    this.title = '';
    this.description = '';
    this.priority = Priority.LOW;
    this.titleInputRef?.nativeElement.focus();
  }

  ngAfterViewInit(): void {
    this.titleInputRef?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }
}

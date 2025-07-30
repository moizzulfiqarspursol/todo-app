import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Priority } from '../../models/todo.model';
import { TodoStore } from '../../core/state/todos/todo.store';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, NgFor, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements AfterViewInit, OnDestroy {
  title = '';
  description = '';
  priority: Priority = Priority.LOW;
  priorities = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];
  savedMessage = '';
  toastType: 'success' | 'error' = 'success';
  private toastTimer: any;

  @ViewChild('titleInput') titleInputRef!: ElementRef<HTMLInputElement>;

  constructor(private todoStore: TodoStore) {}

  onSubmitForm(): void {
    console.log("onSubmitForm form component called");
    debugger
    if (!this.title?.trim() || !this.description?.trim()) {
      this.savedMessage = 'Title and Description are required!';
      this.toastType = 'error';
      setTimeout(() => (this.savedMessage = ''), 2500);
      return;
    }

    this.todoStore.addTodo({
      title: this.title,
      description: this.description,
      priority: this.priority,
      createdAt: new Date(),
      completed: false,
    });

    this.showToast('Todo added!');
    this.clearForm();
  }

  private showToast(message: string): void {
    this.savedMessage = message;
    this.toastTimer = setTimeout(() => (this.savedMessage = ''), 3000);
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
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }
}

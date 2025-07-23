import { Component, EventEmitter, Output } from '@angular/core';
import { ITodo, Priority } from '../../models/model'
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

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
  priority: Priority | null = Priority.LOW;

  priorities: Priority[] = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];
  
  @Output() onSubmit: EventEmitter<ITodo> = new EventEmitter<ITodo>();


  // onChangeTitle(event: any): void {
  //   this.title = event.target.value;
  // }

  // onChangeDesc(event: any): void {
  //   this.description = event.target.value;
  // }

  onSubmitForm(): void {
      const newTodo: ITodo = {
        id: Date.now(), // Using timestamp as a unique ID
        title: this.title,
        description: this.description,
        priority: this.priority || Priority.LOW // Default to LOW if no priority is set
      };  
      this.onSubmit.emit(newTodo);
    }
}

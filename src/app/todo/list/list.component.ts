import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ITodo } from '../../models/model';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
 @Input() todoItems: ITodo[] = [];

 onDelete(index: number): void {
   this.todoItems.splice(index, 1);
 }
}

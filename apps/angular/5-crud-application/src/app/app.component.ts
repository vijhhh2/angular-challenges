import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TodoService } from './data-access/todo.service';
import { TodoItemComponent } from './UI/todo-item/todo-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TodoItemComponent],
  selector: 'app-root',
  template: `
    @if (loading()) {
      <mat-spinner></mat-spinner>
    } @else {
      @for (todo of todos(); track $index) {
        <app-todo-item [todo]="todo" />
      }
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService);

  todos = this.todoService.todos;
  loading = this.todoService.loading;

  ngOnInit(): void {
    this.todoService.getAllTodos();
  }
}

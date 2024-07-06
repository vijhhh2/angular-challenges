import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TodoItemComponent } from './UI/todo-item/todo-item.component';
import { TodosStore } from './store/todos.store';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TodoItemComponent],
  selector: 'app-root',
  template: `
    @if (loading()) {
      <mat-spinner></mat-spinner>
    }

    @if (!todosStore.error() && !loading()) {
      @for (todo of todos(); track $index) {
        <app-todo-item [todo]="todo" />
      }
    }

    @if (todosStore.error() && !loading()) {
      Encountered error {{ todosStore.error() }}
    }
  `,
  styles: [],
  providers: [TodosStore],
})
export class AppComponent {
  readonly todosStore = inject(TodosStore);

  todos = this.todosStore.todos;
  loading = this.todosStore.loading;
}

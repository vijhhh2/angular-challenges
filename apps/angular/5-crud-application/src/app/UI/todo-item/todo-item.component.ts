import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TodoService } from '../../data-access/todo.service';
import { Todo } from '../../model/todo.model';
import { TodoStore } from './todo-item.store';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (store.error()) {
      {{ store.error()?.message }}
    } @else {
      <div class="todo-item">
        {{ todo().title }}
        <button (click)="update(todo())" [disabled]="store.updating()">
          Update
        </button>
        <button (click)="delete(todo())" [disabled]="store.updating()">
          Delete
        </button>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoStore],
})
export class TodoItemComponent {
  readonly store = inject(TodoStore);
  private readonly todoService = inject(TodoService);
  todo = input.required<Todo>();

  update(todo: Todo) {
    this.store.updateUpdating(true);
    this.todoService.update(todo).subscribe({
      next: () => {
        this.store.updateUpdating(false);
      },
      error: (error: any) => {
        this.store.updateError(error);
      },
    });
  }

  delete(todo: Todo) {
    this.todoService.delete(todo);
  }
}

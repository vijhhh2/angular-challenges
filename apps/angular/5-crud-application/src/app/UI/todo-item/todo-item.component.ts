import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
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
        {{ store.todo()?.title }}
        <button (click)="update(store.todo()!)" [disabled]="store.updating()">
          Update
        </button>
        <button (click)="delete(store.todo()!)" [disabled]="store.updating()">
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
  @Input() set todo(value: Todo) {
    this.store.updateTodo(value);
  }

  update(todo: Todo) {
    this.store.updateTodoItem(todo);
  }

  delete(todo: Todo) {
    this.store.deleteTodoItem(todo);
  }
}

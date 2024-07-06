import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { tap } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  todos = signal<Todo[]>([]);
  loading = signal<boolean>(false);

  getAllTodos(): void {
    this.loading.set(true);
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todos.set(todos);
        this.loading.set(false);
      });
  }

  update(todo: Todo) {
    return this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(
        tap((todoUpdated) => {
          const isError = Math.random() < 0.5;
          if (isError) {
            throw new Error('Deliberate error');
          } else {
            const todoIndex = this.todos().findIndex((to) => to.id === todo.id);
            this.todos.set([
              ...this.todos().slice(0, todoIndex),
              todoUpdated,
              ...this.todos().slice(todoIndex + 1),
            ]);
          }
        }),
      );
  }

  delete(todo: Todo): void {
    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .subscribe(() => {
        this.todos.set(this.todos().filter((t) => t.id !== todo.id));
      });
  }
}

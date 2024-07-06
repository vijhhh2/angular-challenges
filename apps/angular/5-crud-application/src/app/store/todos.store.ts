import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withHooks, withState } from '@ngrx/signals';

import { inject } from '@angular/core';
import { TodoService } from '../data-access/todo.service';
import { Todo } from '../model/todo.model';

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: Error | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

export const TodosStore = signalStore(
  withState(initialState),
  withHooks((store) => {
    const todoService = inject(TodoService);
    return {
      onInit() {
        patchState(store, { loading: true });
        todoService
          .getAllTodos()
          .pipe(takeUntilDestroyed())
          .subscribe({
            next: (todos: Todo[]) => {
              patchState(store, { todos, loading: false });
            },
            error: (error) => {
              patchState(store, { error, loading: false });
            },
          });
      },
    };
  }),
);

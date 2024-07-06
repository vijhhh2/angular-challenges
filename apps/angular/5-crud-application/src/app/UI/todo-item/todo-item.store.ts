import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { TodoService } from '../../data-access/todo.service';
import { Todo } from '../../model/todo.model';

export interface TodoState {
  todo: Todo | null;
  updating: boolean;
  error: Error | null;
}

const initialState: TodoState = {
  todo: null,
  updating: false,
  error: null,
};

export const TodoStore = signalStore(
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
    updateUpdating(value: boolean): void {
      patchState(store, (state) => ({
        ...state,
        updating: value,
      }));
    },
    updateError(value: Error | null): void {
      patchState(store, (state) => ({
        ...state,
        error: value,
      }));
    },
    updateTodo(todo: Todo): void {
      patchState(store, (state) => ({ ...state, todo }));
    },
    updateTodoItem: rxMethod<Todo>(
      pipe(
        tap(() => patchState(store, (state) => ({ ...state, updating: true }))),
        switchMap((todo) =>
          todoService.update(todo).pipe(
            tapResponse({
              next: () =>
                patchState(store, (state) => ({ ...state, updating: false })),
              error: (err: Error) => {
                patchState(store, { updating: false, error: err });
                console.error(err);
              },
            }),
          ),
        ),
      ),
    ),
    deleteTodoItem: rxMethod<Todo>(
      pipe(
        tap(() => patchState(store, (state) => ({ ...state, updating: true }))),
        switchMap((todo) =>
          todoService.delete(todo).pipe(
            tapResponse({
              next: () =>
                patchState(store, (state) => ({ ...state, updating: false })),
              error: (err: Error) => {
                patchState(store, { updating: false, error: err });
                console.error(err);
              },
            }),
          ),
        ),
      ),
    ),
  })),
);

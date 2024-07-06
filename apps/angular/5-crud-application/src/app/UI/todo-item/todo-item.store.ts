import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface TodoState {
  updating: boolean;
  error: Error | null;
}

const initialState: TodoState = {
  updating: false,
  error: null,
};

export const TodoStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
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
  })),
);

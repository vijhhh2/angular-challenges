import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { TodoService } from '../data-access/todo.service';

export function httpLoadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const toddService = inject(TodoService);
  toddService.loading.set(true);
  return next(req).pipe(
    finalize(() => {
      toddService.loading.set(false);
    }),
  );
}

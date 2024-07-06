import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection;
    }
    console.log(error?.message || 'Undefined client error', error?.status);
  }
}

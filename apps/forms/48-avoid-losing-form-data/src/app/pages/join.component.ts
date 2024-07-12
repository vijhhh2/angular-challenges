import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../gurads/can-deactivate.guard';
import { AlertDialogComponent } from '../ui/dialog.component';
import { FormComponent } from '../ui/form.component';

@Component({
  standalone: true,
  imports: [FormComponent, ReactiveFormsModule],
  template: `
    <section class="mx-auto	max-w-screen-sm">
      <form
        class="rounded-lg bg-white p-8 shadow-lg lg:p-12"
        [formGroup]="form"
        (ngSubmit)="onSubmit()">
        <app-form />
        <div class="mt-4">
          <button
            [disabled]="this.form.invalid"
            type="submit"
            class="inline-block w-full rounded-lg border bg-gray-50 px-5 py-3 font-medium text-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto">
            Submit
          </button>
        </div>
      </form>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent implements CanComponentDeactivate {
  private readonly fb = inject(FormBuilder);
  private readonly dialog = inject(Dialog);
  form = this.fb.nonNullable.group({});

  onSubmit() {
    if (this.form.valid) this.form.reset();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.form.dirty) {
      const value = this.openDailog();
      return value;
    }
    return true;
  }

  openDailog() {
    const ref = this.dialog.open<boolean>(AlertDialogComponent);
    return ref.closed as Observable<boolean>;
  }
}

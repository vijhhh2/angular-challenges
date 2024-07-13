import {
  ChangeDetectionStrategy,
  Component,
  model,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [MatFormField, FormsModule, MatInput],
  template: `
    <mat-form-field class="w-4/5" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown.enter)="onEnterPressed()" />
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full',
  },
})
export class SearchInputComponent {
  label = model('');
  enterPressed = output<string>();

  onEnterPressed() {
    this.enterPressed.emit(this.label());
    this.label.set('');
  }
}

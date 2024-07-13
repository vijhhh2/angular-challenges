import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ListComponent } from './list.component';
import { SearchInputComponent } from './search-input.component';
import { TitleComponent } from './title.component';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    CDFlashingDirective,
    SearchInputComponent,
    TitleComponent,
    ListComponent,
  ],
  template: `
    <app-title [title]="title()"></app-title>
    <app-search-input (enterPressed)="handleKey($event)"></app-search-input>
    <app-list [names]="names"></app-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() names: string[] = [];
  title = input.required<string>();

  handleKey(label: string) {
    this.names = [label, ...this.names];
  }
}

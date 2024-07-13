import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatList, MatListItem, MatDivider],
  template: `
    <mat-list class="flex w-full">
      @for (name of names(); track $index) {
        <mat-list-item cd-flash class="text-orange-500">
          <div MatListItemLine class="flex justify-between">
            <h3 title="Name">
              {{ name }}
            </h3>
          </div>
        </mat-list-item>
      } @empty {
        <div class="empty-list-label">Empty list</div>
      }
      @if (names().length !== 0) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full',
  },
})
export class ListComponent {
  names = input.required<string[]>();
}

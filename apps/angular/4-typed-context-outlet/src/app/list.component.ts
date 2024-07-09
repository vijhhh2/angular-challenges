import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';
import { ListTemplateDirective } from './list-template.directive';

@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let item of list(); index as i">
      <ng-container
        *ngTemplateOutlet="
          listTemplateRef() || emptyRef;
          context: { $implicit: item, appList: item, index: i }
        "></ng-container>
    </div>

    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<TItem extends object> {
  list = input.required<TItem[]>();

  listTemplateRef = contentChild.required(ListTemplateDirective, {
    read: TemplateRef<TItem>,
  });
}

import { Directive, input } from '@angular/core';

export interface ListTemplateContext<T> {
  $implicit: T;
  appList: T;
  index: number;
}

@Directive({
  selector: 'ng-template[appList]',
  standalone: true,
})
export class ListTemplateDirective<T extends object> {
  appList = input<T[]>();

  static ngTemplateContextGuard<TContext extends object>(
    dir: ListTemplateDirective<TContext>,
    ctx: unknown,
  ): ctx is ListTemplateContext<TContext> {
    return true;
  }
}

import { Directive } from '@angular/core';

export interface PersonTemplateContext {
  $implicit: string;
  age: number;
}

@Directive({
  selector: 'ng-template[person]',
  standalone: true,
})
export class PersonTemplateDirective {
  static ngTemplateContextGuard(
    dir: PersonTemplateDirective,
    ctx: unknown,
  ): ctx is PersonTemplateContext {
    return true;
  }
}

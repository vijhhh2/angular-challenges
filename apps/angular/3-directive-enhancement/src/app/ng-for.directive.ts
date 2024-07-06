import { NgFor } from '@angular/common';
import {
  Directive,
  EmbeddedViewRef,
  inject,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
// appNgFor="let item of items; empty emptyBlock"
// appNgForOf=items

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngForEmpty]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgFor,
      inputs: ['ngForOf:ngForEmptyOf'],
    },
  ],
})
export class NgForDirective<T> implements OnChanges {
  vcr = inject(ViewContainerRef);

  @Input({ required: true }) ngForEmptyOf: T[] = [];
  @Input() ngForEmptyElse: TemplateRef<any> | undefined;

  private embeddedRef?: EmbeddedViewRef<any>;
  ngOnChanges() {
    console.log(this.ngForEmptyOf, this.ngForEmptyElse);

    this.embeddedRef?.destroy();
    if (this.ngForEmptyOf?.length === 0 && this.ngForEmptyElse) {
      this.vcr.clear();
      this.embeddedRef = this.vcr.createEmbeddedView(this.ngForEmptyElse);
    }
  }
}

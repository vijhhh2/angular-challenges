import { Directive, inject, Input } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: '[currenyCode]',
  providers: [CurrencyService],
  standalone: true,
})
export class CurrencyCodeDirective {
  currencySerivce = inject(CurrencyService);

  @Input() set code(value: string) {
    this.currencySerivce.patchState({ code: value });
  }
}

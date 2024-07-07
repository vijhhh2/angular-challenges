import { NgIf } from '@angular/common';
import { Directive, inject, Input } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { pipe, tap } from 'rxjs';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasRole],[hasRoleSuperAdmin]',
  hostDirectives: [NgIf],
  standalone: true,
  providers: [ComponentStore],
})
export class PermissionsDirective {
  private store = inject(UserStore);
  private componentStore = inject(ComponentStore);
  private ngIf = inject(NgIf, { host: true });

  @Input() set hasRole(value: Role | Role[]) {
    this.showTemplate(this.store.hasAnyRole(value));
  }
  @Input() set hasRoleSuperAdmin(value: boolean) {
    this.showTemplate(this.store.isAdmin$);
  }

  private readonly showTemplate = this.componentStore.effect<
    boolean | undefined
  >(pipe(tap((showTemplate) => (this.ngIf.ngIf = showTemplate))));
}

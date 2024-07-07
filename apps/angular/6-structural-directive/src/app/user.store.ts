import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private user = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.user.asObservable();
  isAdmin$ = this.user$.pipe(map((user) => (user ? user.isAdmin : false)));
  isUserLoggedIn$ = this.user$.pipe(map(Boolean));

  add(user: User) {
    this.user.next(user);
  }

  hasAnyRole(role: Role | Role[]) {
    return this.user$.pipe(
      map((user) => {
        if (user) {
          if (user.isAdmin) {
            return true;
          }

          const roles = Array.isArray(role) ? role : [role];
          return user.roles.some((role) => roles.includes(role));
        } else {
          return false;
        }
      }),
    );
  }
}

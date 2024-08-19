import { inject, Injectable } from '@angular/core';
import { forkJoin, iif, map, mergeMap, Observable, of, take } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAll$ = this.dbService.infos$;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    return this.dbService.searchByType(type).pipe(
      take(1),
      mergeMap((topicToDelete) => {
        return iif(
          () => topicToDelete.length > 0,
          forkJoin(
            topicToDelete.map((t) => this.dbService.deleteOneTopic(t.id)),
          ).pipe(map((values) => values.every(Boolean))),
          of(true),
        );
      }),
    );
  }
}

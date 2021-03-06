import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Member } from './model/member.model';
import { select } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MembersService extends EntityCollectionServiceBase<Member> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Member', serviceElementsFactory);
  }

  getSelf() {
    return this.store.pipe(
      select('login'),
      map((login: any) => login.email),
      switchMap(email =>
        this.entities$.pipe(
          map(members =>
            members.find(
              member =>
                !!member && member.email.toLowerCase() === email.toLowerCase(),
            ),
          ),
        ),
      ),
    );
  }
}

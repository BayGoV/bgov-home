import { Injectable } from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Member} from './model/member.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService extends EntityCollectionServiceBase<Member> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Member', serviceElementsFactory);
  }
}

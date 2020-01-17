import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import {Meetup} from './model/meetup.model';

@Injectable({
  providedIn: 'root',
})
export class MeetupService extends EntityCollectionServiceBase<Meetup> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Meetup', serviceElementsFactory);
  }
}

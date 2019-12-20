import { Injectable } from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Member} from './model/member.model';
import {Preference} from './model/preference.model';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService extends EntityCollectionServiceBase<Preference> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Preference', serviceElementsFactory);
  }
}

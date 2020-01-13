import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { PreferencesService } from '../preferences.service';
import { EntityActionFactory, EntityOp } from '@ngrx/data';

@Injectable()
export class MemberEffects {
  memberLoad$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          new EntityActionFactory().create(
            'Member',
            EntityOp.QUERY_BY_KEY_SUCCESS,
          ).type,
        ),
        switchMap((action: any) =>
          this.preferencesService.getByKey(action.payload.data.id),
        ),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private preferencesService: PreferencesService,
  ) {}
}

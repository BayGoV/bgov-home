import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MembersService } from '../members.service';
import { switchMap } from 'rxjs/operators';
import { login } from './login.actions';

@Injectable()
export class LoginEffects {
  loggedIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        switchMap(action => this.membersService.getByKey(action.email)),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private membersService: MembersService,
  ) {}
}

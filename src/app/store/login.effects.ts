import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MembersService } from '../members.service';
import {switchMap, tap} from 'rxjs/operators';
import { login } from './login.actions';
import { SocketService } from '../socket.service';

@Injectable()
export class LoginEffects {
  loggedIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        tap(() => this.socketService.ping()),
        switchMap(action => this.membersService.getByKey(action.email)),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private membersService: MembersService,
    private socketService: SocketService,
  ) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { snackbar } from './snackbar.actions';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Injectable()
export class SnackbarEffects {
  snackbarRef;
  snackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(snackbar),
        map((action: any) => {
          const config = action.progress ? {} : { duration: 3000 };
          if (action.active) {
            this.snackbarRef = this.snackBar.openFromComponent(
              SnackbarComponent,
              config,
            );
          } else {
            this.snackbarRef.dismiss();
          }
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}
}

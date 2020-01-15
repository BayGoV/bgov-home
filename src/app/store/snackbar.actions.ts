import { createAction, props } from '@ngrx/store';
import {SnackbarState} from './snackbar.reducer';

export const snackbar = createAction(
  'Snackbar',
  props<SnackbarState>(),
);

import { Action, createReducer, on } from '@ngrx/store';
import { snackbar } from './snackbar.actions';

export interface SnackbarState {
  message?: string;
  action?: string;
  progress?: boolean;
  active: boolean;
}

export const initialState: SnackbarState = { active: null };

export const snackbarReducer = createReducer(
  initialState,
  on(snackbar, (state, action) => {
    return {
      message: action.message,
      token: action.action,
      progress: action.progress,
      active: action.active,
    };
  }),
);

export function aotSnackbarReducer(
  state: SnackbarState | undefined,
  action: Action,
) {
  return snackbarReducer(state, action);
}

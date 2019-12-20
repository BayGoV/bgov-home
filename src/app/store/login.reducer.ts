import {Action, createReducer, on} from '@ngrx/store';
import {login, logout} from './login.actions';

export interface LoginState {
  email: string;
  token: string;
}

export const initialState: LoginState = {email: null, token: null};

export const loginReducer = createReducer(
  initialState,
  on(login, (state, action) => {
    return {
      email: action.email, token: action.token
    };
  }),
  on(logout, () => initialState),
);

export function aotLoginReducer(
  state: LoginState | undefined,
  action: Action) {
  return loginReducer(state, action);
}

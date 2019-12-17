import {Action, createReducer, on} from '@ngrx/store';
import {login, logout} from './login.actions';

export interface LoginState {
  username: string;
  token: string;
}

export const initialState: LoginState = {username: '', token: ''};

export const loginReducer = createReducer(
  initialState,
  on(login, (state, action) => {
    return {
      username: action.username, token: action.token
    };
  }),
  on(logout, () => initialState),
);

export function aotLoginReducer(
  state: LoginState | undefined,
  action: Action) {
  return loginReducer(state, action);
}

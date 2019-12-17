import {createAction, props} from '@ngrx/store';

export const login = createAction('Login', props<{
    username: string;
    token: string;
  }>())
;
export const logout = createAction('Logout');

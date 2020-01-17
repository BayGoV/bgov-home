import {createAction, props} from '@ngrx/store';
import {LoginState} from './login.reducer';

export const login = createAction('Login', props<LoginState>())
;
export const logout = createAction('Logout');

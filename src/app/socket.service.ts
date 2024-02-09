import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { AuthService } from './auth.service';
import { EntityActionFactory, EntityOp } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { API_URL } from './constants';

const socketConfig: SocketIoConfig = {
  url: API_URL,
  options: {},
};

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(
    private authService: AuthService,
    private store: Store<{}>,
  ) {
  }

  async subscribe() {
    const socket = new Socket(socketConfig);
    socket.fromEvent('update').subscribe((message: any) => {
      const action = new EntityActionFactory().create(
        message.type,
        EntityOp.QUERY_BY_KEY_SUCCESS,
        message.payload,
      );
      this.store.dispatch(action);
    });
    const token = await this.authService.token();
    socket.emit('subscribe', token);
  }
}

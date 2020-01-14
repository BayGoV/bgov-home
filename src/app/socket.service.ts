import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';
import { EntityActionFactory, EntityOp } from '@ngrx/data';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(
    private socket: Socket,
    private authService: AuthService,
    private store: Store<{}>,
  ) {
    socket.fromEvent('update').subscribe((message: any) => {
      const action = new EntityActionFactory().create(
        message.type,
        EntityOp.QUERY_BY_KEY_SUCCESS,
        message.payload,
      );
      this.store.dispatch(action);
    });
  }

  async subscribe() {
    const token = await this.authService.token();
    this.socket.emit('subscribe', token);
  }
}

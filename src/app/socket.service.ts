import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket, private authService: AuthService) {}

  async ping() {
    const token = await this.authService.token();
    this.socket.emit('subscribe', token, r => console.log(r));
  }
}

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor( private socket: Socket ) {

    this.checkStatus();

  }

  checkStatus(): void {

    this.socket.on('connect', () => {

      console.log('Connected to the server');

      this.socketStatus = true;

    });

    this.socket.on('disconnect', () => {

      console.log('Disconnected from the server');

      this.socketStatus = false;

    });

  }

  emit( evento: string, payload?: any, callback?: () => void ): void {

    console.log('Emitting event', evento);

    this.socket.emit( evento, payload, callback);

  }

}

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

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

  // * EMITS ANY KIND OD EVENT
  emit( evento: string, payload?: any, callback?: () => void ): void {

    console.log('Emitting event', evento);

    this.socket.emit( evento, payload, callback);

  }

  // * LISTEN TO ANY KIND OF EVENT
  listen( evento: string ): Observable<any> {

    return this.socket.fromEvent(evento);

  }

}

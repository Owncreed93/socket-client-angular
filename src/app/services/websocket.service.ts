import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario;

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

  // * EMITS ANY KIND OF EVENT
  emit( evento: string, payload?: any, callback?: (resp) => void ): void {

    console.log('Emitting event', evento);

    this.socket.emit( evento, payload, callback);

  }

  // * LISTEN TO ANY KIND OF EVENT
  listen( evento: string ): Observable<any> {

    return this.socket.fromEvent(evento);

  }

  // * SET UP USER
  loginWS( nombre: string ): void{

    console.log('Set up user:', nombre);

    this.emit('configurar-usuario', {nombre}, (resp) => { console.log(resp); } );

    // this.socket.emit( 'configurar-usuario', {nombre}, ( resp: string ) => {
    //   console.log( resp );
    // });

  }

}

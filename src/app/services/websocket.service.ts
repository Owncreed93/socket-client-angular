import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario;

  constructor(
    private socket: Socket,
    private router: Router
    ) {

    this.cargarStorage();
    this.checkStatus();

  }

  checkStatus(): void {

    this.socket.on('connect', () => {

      console.log('Connected to the server');

      this.socketStatus = true;

      this.cargarStorage();

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
  loginWS( nombre: string ): Promise<any>{

    return new Promise( ( resolve, reject ) => {

      this.emit('configurar-usuario', {nombre}, (resp) => {

        this.usuario = new Usuario( nombre );

        this.guardarStorage();

        console.log(resp);

      });

      resolve(  );

    });

    // this.socket.emit( 'configurar-usuario', {nombre}, ( resp: string ) => {
    //   console.log( resp );
    // });

  }

  logoutWS( ) {

    this.usuario = null;

    localStorage.removeItem('usuario');

    const payload = {
      nombre: 'Something Doe'
    };

    this.emit('configurar-usuario', payload, () => {});

    this.router.navigateByUrl('');

  }

  getUsuario(): Usuario {

    return this.usuario;

  }

  guardarStorage(): void {

    localStorage.setItem('usuario', JSON.stringify( this.usuario ));

  }

  cargarStorage(): void {

    const usuario = localStorage.getItem('usuario');

    if ( usuario ) {

      this.usuario = JSON.parse( usuario );

      this.loginWS( this.usuario.nombre );

    }

  }



}

import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public wsService: WebsocketService ) { }

  sendMessage( mensaje: string ): void {

    const payload = {
      de: 'Christian',
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);

  }

}

import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'basico';

  constructor(
    public wsSocket: WebsocketService,
    public chatService: ChatService
    ) {}

  ngOnInit(): void {
    this.chatService.sendMessage('Hello from Angular!');
  }

}

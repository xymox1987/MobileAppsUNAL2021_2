import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class RealTimePlayerService {

  NuevaRondaReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();
  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;
  hubURL: string;
  baseUrl='https://localhost:44311/';

  constructor() {
    
    
      this.hubURL = this.baseUrl + 'tictocHub/';
      this.createConnection();
      this.registerOnServerEvents();
      this.startConnection();

   
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubURL)
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
       // setTimeout(function () { this.startConnection(); }, 5000);
       setTimeout(() => {
        this.startConnection();
       }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('ReceiveMessage', (user: string,message:string) => {
      
      this.NuevaRondaReceived.emit({user,message}as Message);
    });
    
  }

  
}
export class MessageRT {
  clientuniqueid: string;
  type: string;
  payload: string;
  summary: string;
  rondaId: string;
}

export class Message {
  user: string;
  message: string;
}

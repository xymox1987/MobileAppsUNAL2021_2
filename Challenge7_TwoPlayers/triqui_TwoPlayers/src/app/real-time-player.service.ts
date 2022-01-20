import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class RealTimePlayerService {

  SendMessageEvent = new EventEmitter<Message>();
  MoveEvent = new EventEmitter<String>();
  WinnerEvent = new EventEmitter<String>();
  ChangeModeEvent = new EventEmitter<String>();
  StartGameEvent = new EventEmitter();
  RestartGameEvent = new EventEmitter();


  
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
      this.SendMessageEvent.emit({user,message}as Message);
    });

    this._hubConnection.on('start_game', () => {      
      this.StartGameEvent.emit();
    });
    this._hubConnection.on('move', (point:string) => {      
      this.MoveEvent.emit(point);
    });
    this._hubConnection.on('winner', (mode:string) => {      
      this.WinnerEvent.emit(mode);
    });
    this._hubConnection.on('change_mode', (mode:string) => {      
      this.ChangeModeEvent.emit(mode);
    });
    this._hubConnection.on('restart_game', () => {      
      this.RestartGameEvent.emit();
    });
    
  }

  SendMessage(){
    this._hubConnection.invoke('SendMessage',Message);
  }
  StartGame(){
    this._hubConnection.invoke('StartGame');
  }
  Move(point:string){
    this._hubConnection.invoke('Move',point);
  }
  Winner(mode:string){
    this._hubConnection.invoke('Winner',mode);
  }
  ChangeMode(mode:string){
    this._hubConnection.invoke('ChangeMode',mode);
  }
  RestartGame(){
    this._hubConnection.invoke('RestartGame');
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

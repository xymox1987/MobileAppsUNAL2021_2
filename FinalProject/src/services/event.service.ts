import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';


@Injectable({
  providedIn: 'root'
})
export class EventService extends GenericService {

  constructor(private http: HttpClient) {
    super(http);
    this.apiURL = environment.serverBackUrl + 'api/Event';
  }


  public async getEvents(): Promise<any> {
    return await this.httpClient.get<any>(this.apiURL+'/getEvents').toPromise();
  }

  public async getEventsType(): Promise<any> {
    return await this.httpClient.get<any>(this.apiURL+'/getEventsType').toPromise();
  }

  public async createEventAsync(entity: any): Promise<any> {
    const reqHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const entityJson = JSON.stringify(entity);
    return await this.httpClient.post<any>(this.apiURL + '/createEvent', entityJson, { headers: reqHeaders }).toPromise();
  }



}

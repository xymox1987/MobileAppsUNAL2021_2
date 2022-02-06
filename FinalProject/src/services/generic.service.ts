import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService {
  public apiURL: string;
  public ssoURL: string;
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }


  public async createAsync(entity: any): Promise<any> {
    const reqHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const entityJson = JSON.stringify(entity);
    return await this.httpClient.post<any>(this.apiURL, entityJson, { headers: reqHeaders }).toPromise();
  }

  public async updateAsync(entity: any, id: string): Promise<any> {
    const reqHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const entityJson = JSON.stringify(entity);
    return await this.httpClient.put<any>(this.apiURL + '/' + id, entityJson, { headers: reqHeaders }).toPromise();
  }



  public async deleteAsync(id: any): Promise<any> {
    return await this.httpClient.delete<any>(this.apiURL + '/' + id).toPromise();
  }

  public async getByIdAsync(id: any): Promise<any> {
    return this.httpClient.get(this.apiURL + '/' + id).toPromise();
  }

  public async getAllAsync(): Promise<any> {
    return await this.httpClient.get<any>(this.apiURL).toPromise();
  }

  public create(entity: any): Observable<any> {
    const reqHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const entityJson = JSON.stringify(entity);
    return this.httpClient.post<any>(this.apiURL, entityJson, { headers: reqHeaders });
  }

  public update(entity: any, id: string): Observable<any> {
    const reqHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const entityJson = JSON.stringify(entity);
    return this.httpClient.put<any>(this.apiURL + '/' + id, entityJson, { headers: reqHeaders });
  }
  public delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.apiURL + '/' + id);
  }

  public getById(id: any): Observable<any> {
    return this.httpClient.get(this.apiURL + '/' + id);
  }

  public getAll(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL);
  }


}

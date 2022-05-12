import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';


@Injectable({
  providedIn: 'root'
})
export class FarmingService  extends GenericService {

  constructor(private http: HttpClient) {
    super(http);
    this.apiURL = environment.serverBackUrl + 'api/Farming';
  }

  public async getAllFarmings(): Promise<any> {

    return await this.httpClient.get<any>(this.apiURL + '/getFarmings').toPromise();
  }

}

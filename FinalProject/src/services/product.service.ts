import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService extends GenericService {

  constructor(private http: HttpClient) {
    super(http);
    this.apiURL = environment.serverBackUrl + 'api/ProductService';
  }

  public async getAllProduct(): Promise<any> {

    return await this.httpClient.get<any>(this.apiURL + '/getProductsServices').toPromise();
  }

  public async createProductAsync(entity: any): Promise<any> {
    const reqHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const entityJson = JSON.stringify(entity);
    return await this.httpClient.post<any>(this.apiURL + '/createProductService', entityJson, { headers: reqHeaders }).toPromise();
  }

  public async deleteProductAsync(id: any): Promise<any> {
    return await this.httpClient.delete<any>(this.apiURL + '/deleteProductService/:idProduct?idProduct=' + id).toPromise();
  }


}

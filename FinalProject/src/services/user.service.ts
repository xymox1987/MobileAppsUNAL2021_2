import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService {

  constructor(private http: HttpClient) {
    super(http);
    this.apiURL = environment.serverBackUrl + 'api/User';
  }

  public async getCitiesAsync(): Promise<any> {
    return await this.httpClient.get<any>(this.apiURL+'/getCities').toPromise();
  }

  public  getToken(): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZ2FsZGFuYXdAdW5hbC5lZHUuY28iLCJqdGkiOiI5OTNhY2QxMi01YTc2LTRiODAtODI2Yi05NzMxM2Q3N2U5N2MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ2NjI0NTgzLTI4ZDYtNDNkYy04ZDBlLTUzODlkNjI3MGM5NCIsIlJPTEUiOiJBRE1JTiIsImV4cCI6MTY0NzA4NjMwMiwiaXNzIjoiaHR0cDovL3d3dy5wYWxtYXBwLmNvbSIsImF1ZCI6Imh0dHA6Ly93d3cucGFsbWFwcC5jb20ifQ.y43mI0X6jZdtgxG-5YqIKB6fwTSzDRCTXsPzz85cyVc';
  }

}

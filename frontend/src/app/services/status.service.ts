import { Status } from './../models/status';
import { STATUS_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient: HttpClient) { }

  public getAllStatuses(): Observable<any> {
    return this.httpClient.get(`${STATUS_URL}`);
  }

  public addStatus(status: Status): Observable<any> {
    status.id = 0;
    return this.httpClient.post(`${STATUS_URL}`, status);
  }

  public updateStatus(status: Status): Observable<any> {
    return this.httpClient.put(`${STATUS_URL}`, status);
  }

  public deleteStatus(id: number): Observable<any> {
    return this.httpClient.delete(`${STATUS_URL}/${id}`);
  }




}

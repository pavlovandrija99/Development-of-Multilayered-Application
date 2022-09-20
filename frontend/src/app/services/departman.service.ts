import { DEPARTMAN_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departman } from '../models/departman';


@Injectable({
  providedIn: 'root'
})
export class DepartmanService {

  constructor(private httpClient: HttpClient) { }

  public getAllDepartmants(): Observable<any> {
    return this.httpClient.get(`${DEPARTMAN_URL}`);
  }

  public addDepartman(departman: Departman): Observable<any> {
    departman.id = 0;
    return this.httpClient.post(`${DEPARTMAN_URL}`, departman);
  }

  public updateDepartman(departman: Departman): Observable<any> {
    return this.httpClient.put(`${DEPARTMAN_URL}`, departman);
  }

  public deleteDepartman(id: number): Observable<any> {
    return this.httpClient.delete(`${DEPARTMAN_URL}/${id}`);
  }


}

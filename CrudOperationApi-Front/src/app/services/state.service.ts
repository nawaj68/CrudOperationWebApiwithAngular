import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BaseUrl = environment.baseUrl+"/api/state";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http:HttpClient) { }

  getDropdownByCountry<T>(countryId: number): Observable<T[]> {
    let params = new HttpParams().set("countryId", countryId.toString());
    return this.http.get<T[]>(`${BaseUrl}/dropdown?${params.toString()}`);
  }

  getStateDetail<T>(stateId: number): Observable<T> {
    return this.http.get<T>(`${BaseUrl}/${stateId}`);
  }

  addStateDetail<T>(state: T): Observable<T> {
    return this.http.post<T>(BaseUrl, state);
  }
  
  updateStateDetail<T>(stateId: number, state  : any): Observable<T> {
    return this.http.put<T>(`${BaseUrl}/${stateId}`, state);
  }

}

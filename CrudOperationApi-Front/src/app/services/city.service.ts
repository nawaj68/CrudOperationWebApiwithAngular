import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BaseUrl = environment.baseUrl+"/api/city";


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http:HttpClient) { }

  getDropdownByState<T>(stateId: number): Observable<T[]> {
    let params = new HttpParams().set("stateId", stateId.toString());
    return this.http.get<T[]>(`${BaseUrl}/dropdown?${params.toString()}`);
  }
  
  getAllCityDetail<T>(): Observable<T> {
    return this.http.get<T>(`${BaseUrl}`);
  }

  getCityDetail<T>(cityId: number): Observable<T> {
    return this.http.get<T>(`${BaseUrl}/${cityId}`);
  }

  addCityDetail<T>(city: T): Observable<T> {
    return this.http.post<T>(BaseUrl, city);
  }
  
  updateCityDetail<T>(cityId: number, city  : any): Observable<T> {
    return this.http.put<T>(`${BaseUrl}/${cityId}`, city);
  }

}

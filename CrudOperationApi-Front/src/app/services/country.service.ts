import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BaseUrl = environment.baseUrl+"/api/country";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

  getAllCountryDetail<T>(): Observable<T> {
    return this.http.get<T>(`${BaseUrl}`);
  }

  getCountryDetail<T>(countryId: number): Observable<T> {
    return this.http.get<T>(`${BaseUrl}/${countryId}`);
  }

  addCountryDetail<T>(country: T): Observable<T> {
    return this.http.post<T>(BaseUrl, country);
  }
  
  updateCountryDetail<T>(countryId: number, country  : any): Observable<T> {
    return this.http.put<T>(`${BaseUrl}/${countryId}`, country);
  }

}

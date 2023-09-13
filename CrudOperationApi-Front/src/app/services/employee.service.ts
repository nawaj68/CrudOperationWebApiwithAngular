import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BaseUrl = environment.baseUrl+"/api/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getAllEmployeeDetail<T>(): Observable<T[]> {
    return this.http.get<T[]>(`${BaseUrl}`);
  }
  
  getEmployeeDetail<T>(employeeId: number): Observable<T> {
    return this.http.get<T>(`${BaseUrl}/${employeeId}`);
  }

  addEmployeeDetail<T>(employee: T): Observable<T> {
    return this.http.post<T>(BaseUrl, employee);
  }
  updateEmployeeDetail<T>(employeeId: number, employee  : any): Observable<T> {
    return this.http.put<T>(`${BaseUrl}/${employeeId}`, employee);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${BaseUrl}/${id}`);
  }

}

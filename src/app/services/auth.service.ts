import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = 'https://car-service.in/luxuryfix/boauth';

  constructor(private _router: Router, private http: HttpClient) {}

  public loginUser(data: any, headers?: HttpHeaders): Observable<HttpResponse<any>> {
    const options = {
      observe: 'response' as const,
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
    };
    return this.http.post<any>(this._loginUrl, data, options);
  }
  
}

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl: string = 'https://car-service.in/luxuryfix/boauth';

  constructor(private router: Router, private http: HttpClient) {}

  public loginUser(data: any, headers?: HttpHeaders): Observable<HttpResponse<any>> {
    const options = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }),
      withCredentials: true,
      observe: 'response' as const 
    };

    return this.http.post<any>(this.loginUrl, data, options);
  }
}

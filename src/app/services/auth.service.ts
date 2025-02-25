import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private boauthUrl: string = 'https://car-service.in/luxuryfix/boauth';
  private bodataUrl: string = 'https://car-service.in/luxuryfix/bodata';

  constructor(private http: HttpClient) {}

  public loginUser(data: any, headers?: HttpHeaders): Observable<HttpResponse<any>> {
    const options = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }),
      withCredentials: true,
      observe: 'response' as const 
    };
    return this.http.post<any>(this.boauthUrl, data, options);
  }

  public logoutUser(data: any, headers?: HttpHeaders): Observable<HttpResponse<any>> {
    const options = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }),
      withCredentials: true,
      observe: 'response' as const 
    };
    return this.http.post<any>(this.boauthUrl, data, options);
  }

  public dataUser(data: any, headers?: HttpHeaders): Observable<HttpResponse<any>> {
    const options = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }),
      withCredentials: true,
      observe: 'response' as const 
    };
    return this.http.post<any>(this.bodataUrl, data, options);
  }

}

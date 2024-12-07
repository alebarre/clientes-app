import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, ɵgetUnknownElementStrictMode } from '@angular/core';
import { Usuario } from './login/usuario';
import { Observable } from 'rxjs';

import { environments } from './environments/environments';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environments.apiURL + "/users";
  private tokenKey = 'accessToken'; // Local storage key for JWT
  private tokenUrl: string = environments.apiURL + '/login';
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if(this.isLoggedIn()){
      const isExpired = this.jwtHelper.isTokenExpired(token);
      return !isExpired;
    }
    return false;
  }

  salvar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  tentarLogar(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post(`${this.tokenUrl}`, credentials); // Simplified response body
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getUserAuthenticated(){
    const token = this.getToken();
    if(token){
      const userAuthenticated = this.jwtHelper.decodeToken(token).username;
      return userAuthenticated;
    } else {
      return null;
    }
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

}

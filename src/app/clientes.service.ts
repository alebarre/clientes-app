import { Injectable } from '@angular/core';
import { Clientes } from './clientes/clientes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../app/environments/environments';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environments.apiURL;

  constructor(private http: HttpClient,  private authService: AuthService) { }

  salvarCliente(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.apiURL + '/api/clientes', cliente, httpOptions);
  }

  atualizarCliente(cliente: Clientes): Observable<any> {
    return this.http.put<Clientes>(this.apiURL + `/api/clientes/${cliente.id}`, cliente, httpOptions);
  }

  listarTodosClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.apiURL + '/api/clientes');
  }

  listarPorId(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(this.apiURL + `/api/clientes/${id}`);
  }

  deletar(id?: number): Observable<any> {
    return this.http.delete<any>(this.apiURL + `/api/clientes/${id}`);
  }

}

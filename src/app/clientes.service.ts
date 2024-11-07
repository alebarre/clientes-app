import { Injectable } from '@angular/core';
import { Clientes } from './clientes/clientes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  salvarCliente(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>('http://localhost:8080/api/clientes', cliente);
  }

  atualizarCliente(cliente: Clientes): Observable<any> {
    return this.http.put<Clientes>(`http://localhost:8080/api/clientes/${cliente.id}`, cliente);
  }

  listarTodosClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>('http://localhost:8080/api/clientes');
  }

  listarPorId(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`http://localhost:8080/api/clientes/${id}`);
  }

  deletar(id?: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/api/clientes/${id}`);
  }

}

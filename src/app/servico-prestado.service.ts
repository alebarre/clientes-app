import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../app/environments/environments'
import { ServicoPrestado } from './servico-prestado/servico-prestado';
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-busca';


@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environments.apiURL + "/api/servicos-prestados";

  constructor(private http: HttpClient) { }

  public salvar (servicoPrestado: ServicoPrestado): Observable<ServicoPrestadoService> {
    return this.http.post<ServicoPrestadoService>(this.apiURL, servicoPrestado)
  }

  public buscar(nome: string, mes: number): Observable<ServicoPrestadoBusca[]> {

    const httpParams = new HttpParams()
      .set("nome", nome)
      .set("mes", mes);
    
    const url = this.apiURL + "?" + httpParams.toString();

    console.log(url)

    return this.http.get<any>(url)

  }

}

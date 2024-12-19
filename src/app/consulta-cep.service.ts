
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

    consultaCEP(cep: string) {
        cep = cep.replace(/\D/g, '');
        if (cep !== '') {
          const validacep = /^[0-9]{8}$/;
          if (validacep.test(cep)) {
            return this.http.get(`https://viacep.com.br/ws/${cep}/json`).pipe(
              map((dados: any) => {
                if (dados.erro) {
                  throw new Error('CEP não encontrado');
                }
                return dados;
              }),
              catchError((error) => {
                console.error('HTTP Error:', error);
                return throwError(() => new Error('CEP não encontrado'));
              })
            );
          }
        }
        return throwError(() => new Error('CEP inválido'));
      }
}
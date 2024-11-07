import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormataCpfService {

  constructor() { }

  formatCpf(cpf?: any):  | undefined {
    const numericCpf = cpf?.replace(/\D/g, '');
    if (numericCpf && numericCpf?.length === 11) {
      return numericCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
  }

}
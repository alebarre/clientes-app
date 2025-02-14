import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCpfCnpjMask]',
  standalone: true,
})
export class CpfCnpjMaskDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Aplica a máscara de CPF ou CNPJ
    if (value.length <= 11) {
      input.value = this.formatCPF(value);
    } else {
      input.value = this.formatCNPJ(value);
    }

    // Atualiza o valor do controle reativo (se estiver usando forms reativos)
    this.ngControl.control?.setValue(input.value, { emitEvent: false });
  }

  private formatCPF(value: string): string {
    return value
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
      .replace(/(\d{3})(\d{1,2})/, '$1-$2'); // Adiciona o traço
  }

  private formatCNPJ(value: string): string {
    return value
      .replace(/(\d{2})(\d)/, '$1.$2') // Adiciona o primeiro ponto
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
      .replace(/(\d{3})(\d)/, '$1/$2') // Adiciona a barra
      .replace(/(\d{4})(\d{1,2})/, '$1-$2'); // Adiciona o traço
  }
}

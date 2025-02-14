import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { FormsModule } from '@angular/forms';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClienteCardModalComponent } from '../modal/cliente-card-modal/cliente-card-modal.component';
import { CpfCnpjMaskDirective } from '../util/cpf-cnpj-mask.directive';

@NgModule({
  declarations: [
    ClientesFormComponent,
    ClientesListaComponent,
    ClienteCardModalComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ClientesRoutingModule,
    CpfCnpjMaskDirective,
  ],
  exports: [
    ClientesFormComponent,
    ClientesListaComponent,
    CpfCnpjMaskDirective,
  ],
})
export class ClientesModule {}

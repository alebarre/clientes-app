import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { FormsModule } from '@angular/forms';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClienteCardModalComponent } from '../modal/cliente-card-modal/cliente-card-modal.component';


@NgModule({
  declarations: [
    ClientesFormComponent,
    ClientesListaComponent,
    ClienteCardModalComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ClientesRoutingModule,
  ],
  exports: [
    ClientesFormComponent,
    ClientesListaComponent
  ]
})
export class ClientesModule { }

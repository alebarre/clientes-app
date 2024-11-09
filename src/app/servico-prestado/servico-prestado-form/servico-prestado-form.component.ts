import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../clientes/clientes';
import { ClientesService } from '../../clientes.service';
import { ServicoPrestado } from '../servico-prestado';
import { ServicoPrestadoService } from '../../servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrl: './servico-prestado-form.component.scss'
})
export class ServicoPrestadoFormComponent implements OnInit{

  cliente: Clientes = new Clientes();
  success: boolean = false;
  error: String[] = [];
  clientes: Clientes[] = [];
  servicoPrestado: ServicoPrestado = new ServicoPrestado();
  

  constructor(private clienteService: ClientesService,
              private servicoPrestadoService: ServicoPrestadoService){
                this.servicoPrestado = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService
      .listarTodosClientes()
      .subscribe(res => this.clientes = res);
  }

  onSubmit(){
    this.servicoPrestadoService
      .salvar(this.servicoPrestado)
      .subscribe(res => {
        this.success = true;
        this.error = [];
        this.servicoPrestado = new ServicoPrestado();
      }, errorResponse => {
        this.success = false;
        this.error = errorResponse.error.errors
      }
    );
  }

}

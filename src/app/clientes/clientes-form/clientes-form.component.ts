import { Component, OnInit } from '@angular/core';
import { Clientes } from '../clientes';
import { ClientesService } from '../../clientes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormataCpfService } from '../formata-cpf.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.scss'
})
export class ClientesFormComponent implements OnInit {
  
  cliente: Clientes = new Clientes();
  success: boolean = false;
  errors: String[] = [];
  id?: number;
  
  constructor(private service: ClientesService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formataCpfService: FormataCpfService
  ) { 
    this.cliente = new Clientes();
   }
  
  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    if (params){
      params.subscribe(urlParams => {
        this.id = urlParams['id']
        if (this.id){
          this.service.listarPorId(this.id)
          .subscribe(res => {this.cliente.id = res.id
            , this.cliente.nome = res.nome
            , this.cliente.cpf = this.formataCpfService.formatCpf(res.cpf)
            , this.cliente.dataCadastro = res.dataCadastro}
          )
        }
      });
    }
  }
  
  onSubmit() {
    this.errors = [];
    if(this.id){
      this.cliente.cpf = this.cliente.cpf?.replace(/\D/g, '')
      this.service
      .atualizarCliente(this.cliente)
      .subscribe( res => {
        this.success = true;
          this.cliente.id = res.id
        , this.cliente.nome = res.nome
        , this.cliente.cpf = this.formataCpfService.formatCpf(res.cpf)
        , this.cliente.dataCadastro = res.dataCadastro
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
        if(!this.errors[0].includes('nome')){
          this.cliente.cpf = '';
        }
      });
    } else {
      this.cliente.cpf = this.cliente.cpf?.replace(/\D/g, '')
      this.service
      .salvarCliente(this.cliente)
      .subscribe( res => {
          this.cliente.id = res.id
        , this.cliente.nome = res.nome
        , this.cliente.cpf = this.formataCpfService.formatCpf(res.cpf)
        , this.cliente.dataCadastro = res.dataCadastro
        this.success = true;
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
        if(!this.errors[0].includes('nome')){
          this.cliente.cpf = '';
        }
      });
    }
  }

  voltarPartaListagem(){
    this.router.navigate(['/clientes-lista'])
  }

}

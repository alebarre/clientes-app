import { Component, OnInit } from '@angular/core';
import { Clientes } from '../clientes';
import { ClientesService } from '../../clientes.service';
import { Router, RouterLink } from '@angular/router';
import { FormataCpfService } from '../formata-cpf.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrl: './clientes-lista.component.scss'
})
export class ClientesListaComponent implements OnInit {

  clientes: Clientes[] = [];
  clienteSelecinado: Clientes = new Clientes();
  menssagemSucesso: String = '';
  menssagemErro: String = '';

  constructor(private clienteService: ClientesService,
              private router: Router,
              private formataCpfservice: FormataCpfService
  ){ }

  ngOnInit(): void { 
    this.clienteService
      .listarTodosClientes()
      .subscribe(res => {
        if (res){
          this.clientes = res
          .map(item => ({
            ...item, cpf: this.formataCpfservice.formatCpf(item.cpf)
          }));
        }
      });
  }

  novoCadastro(){
    this.router.navigate(['/clientes/form']);
  }

  preparaDelecao(cliente: Clientes){
    this.clienteSelecinado.nome = cliente.nome;
    this.clienteSelecinado.id = cliente.id;
  }

  deletarCliente(){
    console.log(this.clienteSelecinado.id)
    this.clienteService.deletar(this.clienteSelecinado.id)
    .subscribe (  res => {
                            this.menssagemSucesso = 'Cliente deletado com sucesso!',
                            this.ngOnInit();
                          },
                  erro => this.menssagemErro = 'Erro ao deletar o Cliente'
    )
  }

}

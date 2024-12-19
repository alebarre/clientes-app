import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Clientes } from '../clientes';
import { ClientesService } from '../../clientes.service';
import { Router } from '@angular/router';
import { FormataCpfService } from '../formata-cpf.service';
import { ServicoPrestadoService } from '../../servico-prestado.service';


@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrl: './clientes-lista.component.scss'
})
export class ClientesListaComponent implements OnInit {

  @ViewChild('modalCard') modalCard!: ElementRef;

  clientes: Clientes[] = [];
  clientesCard: Clientes = new Clientes();
  clienteSelecinado: Clientes = new Clientes();
  menssagemSucesso: String = '';
  menssagemErro: String = '';
  numeroServicosNoMes: string = '';

  constructor(private clienteService: ClientesService,
              private router: Router,
              private formataCpfservice: FormataCpfService,
              private servicoPrestadoService: ServicoPrestadoService
  ){ }

  ngOnInit(): void { 
    this.clienteService
      .listarTodosClientes()
      .subscribe(res => {
        if (res) {
          this.clientes = res.map(item => ({
            ...item,
            cpf: this.formataCpfservice.formatCpf(item.cpf),
            endereco:(item.endereco)
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

  buscarDadosCardCliente(id?: any){
    const card = this.clientes.find((cliente: any) => cliente.id === id);
    this.clientesCard.nome = card?.nome;
    this.clientesCard.dataCadastro = card?.dataCadastro;
    this.clientesCard.tel1 = card?.tel1;
    this.clientesCard.email = card?.email;
    if (card?.endereco) {
      this.clientesCard.endereco = card.endereco;
    } else {
      this.clientesCard.endereco = [];
    }
  }

}

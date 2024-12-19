import { Component, OnInit } from '@angular/core';
import { Clientes } from '../clientes';
import { ClientesService } from '../../clientes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormataCpfService } from '../formata-cpf.service';
import { Observable } from 'rxjs';
import { Endereco } from '../../model/endereco';
import { ConsultaCepService } from '../../consulta-cep.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.scss',
})
export class ClientesFormComponent implements OnInit {
  cliente: Clientes = new Clientes();
  endereco: Endereco = new Endereco();
  success: boolean = false;
  errors: String[] = [];
  enderecoForm: any[] = [];
  id?: number;
  cepValue: string = '';

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formataCpfService: FormataCpfService,
    private cepService: ConsultaCepService
  ) {
    this.cliente = new Clientes();
  }

  ngOnInit(): void {
    this.cliente = new Clientes();
    this.endereco = new Endereco();
    let params: Observable<Params> = this.activatedRoute.params;
    if (params) {
      params.subscribe((urlParams) => {
        this.id = urlParams['id'];
        if (this.id) {
          this.service.listarPorId(this.id).subscribe((res) => {
            (this.cliente.id = res.id), this.populateClienteFromResponse(res);
          });
        }
      });
    }
  }

  onSubmit() {
    this.errors = [];
    this.cliente.cpf = this.cliente.cpf?.replace(/\D/g, '');

    this.cliente.endereco.push({
      cep: this.endereco.cep
        ? parseInt(this.endereco.cep.toString().replace(/\D/g, ''), 10)
        : 0,
      numero: this.endereco?.numero || 0,
      complemento: this.endereco?.complemento || '',
      rua: this.endereco?.rua || '',
      bairro: this.endereco?.bairro || '',
      cidade: this.endereco?.cidade || '',
      estado: this.endereco?.estado || '',
    });

    if (this.id) {
      this.service.atualizarCliente(this.cliente).subscribe(
        (res) => {
          this.success = true
          this.populateClienteFromResponse(res);
        },
        (errorResponse) => {
          this.errors = [];
          this.success = false;
          this.handleError(errorResponse);
        }
      );
    } else {
      this.service.salvarCliente(this.cliente).subscribe(
        (res) => {
          this.success = true
          this.populateClienteFromResponse(res);

        },
        (errorResponse) => {
          this.errors = [];
          this.success = false;
          this.handleError(errorResponse);
        }
      );
    }
  }

  private populateClienteFromResponse(res: any) {
    this.cliente.id = res.id;
    this.cliente.nome = res.nome;
    this.cliente.cpf = this.formataCpfService.formatCpf(res.cpf);
    this.cliente.tel1 = res.tel1;
    this.cliente.tel2 = res.tel2;
    this.cliente.email = res.email;
    this.cliente.dataCadastro = res.dataCadastro;

    if (res.endereco && res.endereco[0]) {
      Object.keys(res.endereco[0]).forEach((key) => {
        if(key === "cep"){
          this.cepValue = res.endereco[0][key];
        } else {
          (this.endereco as any)[key] = res.endereco[0][key];
        }
      });
    }

  }

  private handleError(errorResponse: any) {
    this.success = false;
    this.errors = errorResponse.error.errors;
    if (!this.errors.some((error: any) => error.includes('nome'))) {
      this.cliente.cpf = '';
    } else {
      this.cliente.nome = '';
    }
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes/lista']);
  }

  consultaCep() {
    const cep = this.cepValue.replace(/\D/g, '');

    if (cep) {
      this.cepService.consultaCEP(cep).subscribe(
        (dados) => {
          this.populaDadosForm(dados);
          this.errors = [];
        },
        (erro) => {
          console.error('Error callback:', erro.message);
          this.endereco = new Endereco();
          this.success = false;
          this.errors = [erro.message];
        }
      );
    } else {
      this.errors = ['Por favor, insira um CEP válido.'];
      this.success = false;
    }
  }

  populaDadosForm(dados: any) {
    console.log(dados);
    this.endereco.cep = dados.cep;
    this.endereco.rua = dados.logradouro;
    this.endereco.bairro = dados.bairro;
    this.endereco.cidade = dados.localidade;
    this.endereco.estado = dados.uf;
  }
}

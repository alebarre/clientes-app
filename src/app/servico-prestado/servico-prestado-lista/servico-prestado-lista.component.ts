import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoBusca } from '../servico-prestado-busca';
import { ServicoPrestadoService } from '../../servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrl: './servico-prestado-lista.component.scss'
})
export class ServicoPrestadoListaComponent implements OnInit{
  
  nome: string = "";
  mes: number = 0;
  meses: number[] = [];
  lista: ServicoPrestadoBusca[] = [];
  message: string = "";
  
  constructor(private service: ServicoPrestadoService){ 
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }
  
  ngOnInit(): void {
  }

  consultar(){
    this.message = "";
    this.service
    .buscar(this.nome, this.mes)
    .subscribe(res => {
      if(res.length <= 0){
        this.message = "Nenhum registro encontrado";
      }
      this.lista = res
    });
  }

}

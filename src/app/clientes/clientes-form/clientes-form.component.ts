import { Component, OnInit } from '@angular/core';
import { Clientes } from '../clientes';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.scss'
})
export class ClientesFormComponent implements OnInit {
  
  cliente: Clientes = new Clientes();
  
  constructor() { }
  
  ngOnInit(): void { }
  
  onSubmit() {
    console.log(this.cliente);
  }
}

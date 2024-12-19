import { Component, Input } from "@angular/core";
import { Clientes } from "../../clientes/clientes";

@Component({
  selector: 'app-cliente-card-modal',
  templateUrl: './cliente-card-modal.component.html',
  styleUrls: ['./cliente-card-modal.component.scss']
})
export class ClienteCardModalComponent {
  @Input() clientesCard: Clientes | undefined; 
}
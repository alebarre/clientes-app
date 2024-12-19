import { Endereco } from "../model/endereco";
import { ServicoPrestado } from "../servico-prestado/servico-prestado";

export class Clientes{
    id: number  | undefined = 0;
    nome: string | undefined = "";
    cpf: string  | undefined = "";
    dataCadastro: string  | undefined = "";
    tel1: string  | undefined = "";
    tel2: string  | undefined = "";
    email: string  | undefined = "";
    servico: ServicoPrestado[] = [];
    endereco: Endereco[] = [];
}
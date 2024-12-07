import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from '../auth.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = "";
  password: string = "";
  errors: string[] = [];
  loginError: boolean = false;
  cadastrando: boolean = false;
  mensagemSucesso: string | undefined | null;


  constructor(private router: Router, 
              private authService: AuthService){}

  onSubmit(){
    if (this.authService.getToken()) {
      this.authService.logout();
    }
    this.authService
      .tentarLogar(this.username, this.password)
      .subscribe(response => {
        const token = response.accessToken;
        const expiresIn = response.expiresIn;
          localStorage.setItem('accessToken', token);
          this.authService.saveToken(token);
          this.router.navigate(['/home'])
      }, error => {
        this.errors = [];
        this.mensagemSucesso = null;
        this.errors = ['Usuário e/ou senha incorreto(s).'];
      })
    
  }

  // onSubmit(): void {
  //   this.authService.tentarLogar(this.username, this.password).subscribe(
  //     (response: any) => {
  //       const token = response.headers.get('Authorization');
  //       this.authService.saveToken(token);
  //       console.log('Login successful!');
  //     },
  //     (error) => console.error('Login failed!', error)
  //   );
  // }

  public prepararParaCadastro(event: any){
    event.preventDefault();
    this.cadastrando = true;
    this.errors = [];
  }

  public cancelaCadastro(){
    this.cadastrando = false;
  }

  public cadastrar(){
    const usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService
      .salvar(usuario)
      .subscribe( response => {
        this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o Login."
        this.cadastrando = false;
        this.username = '';
        this.password = '';
        this.errors = [];
    }, errorResponse => {
        this.mensagemSucesso = null;
        this.errors = errorResponse.error.errors;
        
    })
  }

}

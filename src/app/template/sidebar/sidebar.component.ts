import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  public usuarioLogado?: string;

  constructor (private authService: AuthService, private router: Router){ }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getUserAuthenticated();
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

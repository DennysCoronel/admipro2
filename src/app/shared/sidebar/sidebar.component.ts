import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuariosService } from '../../services/usuarios.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public usuario!: Usuario;
  constructor(private sidebarService: SidebarService, private usuariosService: UsuariosService) {
    this.menuItems = sidebarService.menu;
    this.usuario = usuariosService.usuario;
  }


  logaut() {
    this.usuariosService.logFuera();
  }

  ngOnInit(): void { }
}

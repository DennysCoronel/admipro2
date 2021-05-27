import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario!: Usuario;

  constructor(private usuariosService: UsuariosService) {
    this.usuario = usuariosService.usuario;


  }

  ngOnInit(): void {
  }


  logaut() {
    this.usuariosService.logFuera();
  }

}

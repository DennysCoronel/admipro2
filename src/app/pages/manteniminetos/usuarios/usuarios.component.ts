import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';

import Swal from 'sweetalert2';
import { ModalService } from '../../../services/modal.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  public totalUsuario: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public desde: number = 0;
  public cargando: boolean = true;

  constructor(
    private usuariosService: UsuariosService,
    private busquedasService: BusquedasService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.cargarTodosUsuario();

  }

  cargarTodosUsuario() {
    this.cargando = true;

    this.usuariosService.cargarUsuarios(this.desde).subscribe(({ total, usuarios }) => {
      this.totalUsuario = total;

      if (usuarios.length !== 0) {
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      }
    })
  }

  cambiarPag(valor: number) {
    this.desde += valor
    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.totalUsuario) {
      this.desde -= valor
    }

    this.cargarTodosUsuario();
  }


  estado(es: any) {
    if (es === false) {
      return false;
    } return true;
  }

  busqueda(termino: string) {
    if (termino.length == 0) {
      return this.usuarios = this.usuariosTemp;
    }
    return this.busquedasService.buscar('usuario', termino).
      subscribe(resp => this.usuarios = resp)
  }



  botonActive(termino: string) {
    if (termino.length == 0) {
      return true;
    }
    return false;
  }


  cambioEstado(usuario: Usuario) {


    if (usuario.id === this.usuariosService.id) {

      return Swal.fire(
        'Error',
        `No se puede Cambiar el Estado del Usuario logeado `,
        'error'
      );

    }

    return Swal.fire({
      title: 'Cambio de Estado',
      text: `Desea cambiar el estado del Usuario ${usuario.nombreUsuario} de ${usuario.estado} a ${!usuario.estado}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.cambioEstado(usuario)
          .subscribe(resp => {
            this.cargarTodosUsuario();
            Swal.fire(
              'Cambio de Estado!',
              `A cambiado el estado del usuario ${usuario.nombreUsuario} a  ${!usuario.estado} `,
              'success'
            );
          }
          );
      }
    })
  }


  mostrarModal(usuario: Usuario) {
    this.modalService.abrirModal(usuario);
  }
}

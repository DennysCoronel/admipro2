import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  public perfilUsuario!: FormGroup;
  public usuario!: Usuario;


  constructor(private fb: FormBuilder, public modalService: ModalService, private usuariosService: UsuariosService) {
    this.usuario = this.usuariosService.usuario;
    console.log(this.usuario)
  }


  ngOnInit(): void {


    this.perfilUsuario = this.fb.group({
      nombreUsuario: ["", Validators.required],
      nombres: ["", Validators.required],
      apellidos: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      rol: [""]
    })






  }



  cerrarModal() {
    this.borraePerfil();
    this.actulizarPerfil()
    this.modalService.cerrarModal();
  }



  borraePerfil() {
    this.perfilUsuario = this.fb.group({
      nombreUsuario: ["", Validators.required],
      nombres: ["", Validators.required],
      apellidos: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      rol: [""]
    })
  }


  actulizarPerfil() {


    this.perfilUsuario = this.fb.group({
      nombreUsuario: [this.usuario.nombreUsuario, Validators.required],
      nombres: [this.usuario.nombres, Validators.required],
      apellidos: [this.usuario.apellidos, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      rol: [""]
    });


    //this.modalService.abrirModal(this.perfilUsuario.value)


    // .subscribe((resp: any) => {
    //   const { email, nombreUsuario } = this.perfilUsuario.value;
    //   console.log(this.perfilUsuario.value)
    //   this.usuario.nombreUsuario = nombreUsuario;
    //   this.usuario.email = email;
    //   Swal.fire('success', 'Bienvenido', 'success');
    // }, (err) => {
    //   Swal.fire('Error', err.error.msg, 'error');
    // });
  }

}

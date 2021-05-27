import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {

  public perfilUsuario!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;
  public validator = '';


  constructor(private fb: FormBuilder, private usuariosService: UsuariosService, private fileUploadService: FileUploadService) { this.usuario = usuariosService.usuario }

  ngOnInit(): void {
    this.perfilUsuario = this.fb.group({
      nombreUsuario: [this.usuario.nombreUsuario, Validators.required],
      nombres: [this.usuario.nombres, Validators.required],
      apellidos: [this.usuario.apellidos, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      rol: [this.usuario.role]
    })
  }

  actulizarPerfil() {
    this.usuariosService.actulizarPerfil(this.perfilUsuario.value)
      .subscribe((resp: any) => {
        const { email, nombreUsuario } = this.perfilUsuario.value;
        console.log(this.perfilUsuario.value)
        this.usuario.nombreUsuario = nombreUsuario;
        this.usuario.email = email;
        Swal.fire('success', 'Bienvenido', 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  cambiarImagen(evt: any): any {

    console.log(evt);
    if (evt?.target?.files[0]) {

      this.imagenSubir = evt?.target?.files[0];

      if (!evt) {
        return this.imgTemp = null;
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.imagenSubir);

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
    }
  }

  subirImagen() {

    this.fileUploadService.actulizarfoto(this.imagenSubir, 'Usuarios', this.usuario.id || '')
      .then(img => {
        if (img === false) {
          Swal.fire('Error', 'EXTENCION NO VALIDA', 'error');
        } else {
          this.usuario.img = img;
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        }

      }).catch(err => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

}

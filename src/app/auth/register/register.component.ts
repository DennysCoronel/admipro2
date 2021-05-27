import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {


  public formsSUbmitted = false;
  public registerForm = this.fb.group({
    nombreUsuario: ['Dennys', Validators.required],
    email: ['dennys@hotmail.com', [Validators.required, Validators.email]],
    password: ['admin', Validators.required],
    passwork2: ['admin', Validators.required],
    terminos: [false, Validators.required]
  }, {
    validators: this.constraseniaIgual('password', 'passwork2')
  }

  );


  constructor(private router: Router, private fb: FormBuilder, private UsuariosService: UsuariosService) {


  }

  ngOnInit(): void { }





  crearUsuario() {
    this.formsSUbmitted = true;

    if (this.registerForm.valid && this.registerForm.get('terminos')?.value) {

      this.UsuariosService.crearUsuario(this.registerForm.value)
        .subscribe(resp => {
          Swal.fire('success', 'Usuario Creado Correctamente porfavor comuniquese con el administrador para que habilite su usaurio', 'success');

          this.router.navigateByUrl('/');
        }, (err) => {

          Swal.fire('Error', err.error.Msg, 'error');

        }

        );

    } else {

      console.log('Incorrecto');
    }
    // console.log(this.registerForm.value);
  }


  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo)?.invalid && this.formsSUbmitted) {
      return true;

    } else {
      return false;
    }

  }

  campoTerminoValidador(campo: string) {
    return !this.registerForm.get('terminos')?.value && this.formsSUbmitted;
  }

  validarContrasenia() {

    const pas1 = this.registerForm.get('password')?.value;
    const pas2 = this.registerForm.get('passwork2')?.value;

    if ((pas1 !== pas2) && this.formsSUbmitted) {
      return true;
    } else {
      return false;
    }




  }

  constraseniaIgual(pasw1: string, pasw2: string) {

    return (formGroup: FormGroup) => {

      const pasw1C = formGroup.get(pasw1);
      const pasw2C = formGroup.get(pasw2);

      if (pasw1C?.value === pasw2C?.value) {
        pasw2C?.setErrors(null);
      } else {
        pasw2C?.setErrors({ noEsIgual: true });

      }

    };


  }



}

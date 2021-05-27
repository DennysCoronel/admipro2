import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';

declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent implements OnInit {

  public formsSUbmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    nombreUsuario: [localStorage.getItem('nombreUsuario') || 'admin', Validators.required],
    password: ['admin', Validators.required],
    remember: [false]
  });

  constructor(private router: Router, private fb: FormBuilder, private usuariosService: UsuariosService, private _ngZone: NgZone) { }

  ngOnInit(): void {

    this.renderButton();
  }

  login() {
    this.usuariosService.login(this.loginForm.value)
      .subscribe(resp => {
        Swal.fire('success', 'Bienvenido', 'success');

        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('nombreUsuario', this.loginForm.get('nombreUsuario')?.value);
        } else {
          localStorage.removeItem('nombreUsuario');
        }
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      })
    // console.log(this.loginForm.value);
  };



  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  };




  async startApp() {

    await this.usuariosService.googleInit();
    this.auth2 = this.usuariosService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));

  };




  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        var id_token = googleUser.getAuthResponse().id_token;
        const a = this.usuariosService.googlelogin(id_token).subscribe(resp => {

          this._ngZone.run(() => {
            this.router.navigateByUrl('/');
          });

        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
      }, function (error: any) {
        alert(JSON.stringify(error, undefined, 2));
      });
  };






}





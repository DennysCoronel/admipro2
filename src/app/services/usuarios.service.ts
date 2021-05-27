import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';





const baseUrl = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})


export class UsuariosService {

  public auth2: any;
  public usuario!: Usuario;
  constructor(private http: HttpClient,
    private _ngZone: NgZone,
    private router: Router,
  ) {


    this.googleInit();
  }


  valodartoken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';
    return this.http.get(`${baseUrl}/login/renew`, { headers: { 'x-token': token } }).pipe(
      map((resp: any) => {

        const { email, estado, google, img, nombreUsuario, role, id, nombres, apellidos } = resp.usuario;
        this.usuario = new Usuario(nombreUsuario, email, id, nombres, apellidos, role, img, google, estado, '',);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(err => of(false)
      )
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }
  login(formData: LoginForm) {
    return this.http.post(`${baseUrl}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)

        })
      );
  }
  googlelogin(token: any) {

    return this.http.post(`${baseUrl}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }
  logFuera() {

    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {

      this._ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
  googleInit() {

    return new Promise<void>(resolve => {

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '257826372329-4n7r7b0jschokmjbflnaqqjqmc4a4b8h.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })
  }
  get token(): string {

    return localStorage.getItem('token') || '';
  }
  get id(): string {
    return this.usuario.id || ' ';
  }
  get headers() {

    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  actulizarPerfil(data: { email: string, nombreusuario: string, nombres: string, apellidos: string }) {
    console.log(`${baseUrl}/usuarios/${this.id}`);
    return this.http.put(`${baseUrl}/usuarios/${this.id}`, data, { headers: { 'x-token': this.token } });

  }
  cargarUsuarios(desde: number = 0) {

    const url = `${baseUrl}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers);

  }




cambioEstado(usuario: Usuario){

  const url = `${baseUrl}/usuarios/${usuario.id }`;
  return this.http.delete(url,this.headers);

}


}


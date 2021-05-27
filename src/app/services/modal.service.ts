import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _ocultarModal: boolean = true;

  public usuario!: Usuario;

  constructor(private http: HttpClient) {
  }


  get ocultarModal() {

    return this._ocultarModal;
  }

  get id(): string {
    return this.usuario.id || ' ';
  }



  get token(): string {

    return localStorage.getItem('token') || '';
  }

  get headers() {

    return {
      headers: {
        'x-token': this.token
      }
    }
  }




  abrirModal(usuario: Usuario) {
    this._ocultarModal = false;
    this.usuario = usuario;
    console.log(usuario);

    // console.log(`${baseUrl}/usuarios/${this.id}`);
    // return this.http.put(`${baseUrl}/usuarios/${this.id}`, { headers: { 'x-token': this.token } });

  }

  


  cerrarModal() {

    this._ocultarModal = true

  }



}

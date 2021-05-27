import { environment } from 'src/environments/environment';

const base_url = environment.base_url;


export class Usuario {
  constructor(
    public nombreUsuario: string,
    public email: string,
    public id: string,
    public nombres?: string,
    public apellidos?: string,
    public role?: string,
    public img?: string,
    public google?: boolean,
    public estado?: boolean,
    public password?: string,

  ) { }


  get imagenURl() {
    if (this.img?.includes('https')) {
      return this.img;
    }
    if (this.img) {
      return `${base_url}/upload/usuarios/${this.img}`;
    } else {
      return `${base_url}/upload/sistema/noimage.jpg`;
    }
  }




}







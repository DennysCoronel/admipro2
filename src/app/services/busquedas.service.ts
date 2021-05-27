import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }



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



  buscar(tipo: 'usuario' | 'coperativas' | 'datos',
    termino: string = '') {
    const url = `${baseUrl}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => resp.resultados)
      );


  }

}

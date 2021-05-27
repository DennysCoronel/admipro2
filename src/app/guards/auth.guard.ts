import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuariosService } from '../services/usuarios.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private usuariosService: UsuariosService, private router: Router) {

  }

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {


     return this.usuariosService.valodartoken().pipe(tap(estadoAu => {
       if (!estadoAu) {
         this.router.navigateByUrl('/login');
         console.log(estadoAu)
       }
     }));


  }

}

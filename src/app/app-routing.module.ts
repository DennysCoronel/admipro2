import { NgModule, Component } from '@angular/core';
// sistema de rutas
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';

import { NopagfoundComponent } from './nopagfound/nopagfound.component';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [
  // publicas
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

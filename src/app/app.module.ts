import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { NopagfoundComponent } from './nopagfound/nopagfound.component';

@NgModule({
  declarations: [AppComponent, NopagfoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    PagesModule,
    AuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';


import { IncrementarComponent } from './incrementar/incrementar.component';
import { DonaComponent } from './dona/dona.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [IncrementarComponent, DonaComponent, ModalComponent],
  exports: [IncrementarComponent, DonaComponent,ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule
  ],
})
export class CompomentrsModule {}

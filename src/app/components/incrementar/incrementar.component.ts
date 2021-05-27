import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { __importDefault } from 'tslib';

@Component({
  selector: 'app-incrementar',
  templateUrl: './incrementar.component.html',
  styles: [],
})
export class IncrementarComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input('valor') progreso: number = 0;
  @Input() btnClass: string = 'btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  // get getPorcentaje() {
  //   return `${this.progreso}%`;
  // }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && this.progreso >= 0) {
      this.valorSalida.emit(100);
      return (this.progreso = 100);
    }

    if (this.progreso <= 0 && this.progreso < 0) {
      this.valorSalida.emit(0);
      return (this.progreso = 0);
    }

    this.progreso = this.progreso + valor;
    return this.valorSalida.emit(this.progreso);
  }

  onChange(event: any) {
    console.log(event)
    this.valorSalida.emit(this.progreso);
  }
}

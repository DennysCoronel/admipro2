import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  progreso1: number = 25;
  progreso2: number = 35;

  get getProgest1() {
    return `${this.progreso1}%`;
  }

  get getProgest2() {
    return `${this.progreso2}%`;
  }

  cambioValorHijo(valor: number) {
    this.getProgest1 + valor;
  
  }
}

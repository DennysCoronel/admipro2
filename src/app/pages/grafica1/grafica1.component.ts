import { Component, OnInit } from '@angular/core';
import {  Color } from 'ng2-charts';

//Instalacion de las graficas
// npm install --save ng2-charts@2.3.0
// npm install --save chart.js@2.9.3

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public tituloG1: string = 'La vida es Bella ';

  public labels1: string[] = ['PAN', 'COMIDA', 'BEBIDA'];

  public data1 = [[10, 15, 400]];

  public colors1: Color[] = [
    {
      backgroundColor: ['#242A33', '#FD9FB3', '#FD9FB3'],
    },
  ];
}

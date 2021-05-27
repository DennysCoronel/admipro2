import { Component, Input, OnInit } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent implements OnInit {
  @Input() titulo: string = '';

  constructor() {}

  ngOnInit(): void {}

  @Input('labels') TitulosLabels: Label[] = ['Data 1 ', 'Data 2', 'Data 3 '];
  @Input('datas') doughnutChartData: MultiDataSet = [[350, 450, 100]];

  public doughnutChartType: ChartType = 'doughnut';

  @Input('colors') colors: Color[] = [
    {
      backgroundColor: ['#242A33', '#FD9FB3', '#FD9FB3'],
    },
  ];
}

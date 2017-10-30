import { Component, OnInit, Input } from '@angular/core';
import {single, multi} from './data';

@Component({
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css']
})
export class VerticalBarChartComponent implements OnInit {

  single: any[];
  multi: any[];
  @Input() height: number;
  @Input() width: number;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Day';
  showYAxisLabel = true;
  yAxisLabel = 'Downloads';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#D8B42C', '#AAAAAA', '#784D78', '#56F2F1', '#87DDFF']
  };

  constructor() {
    Object.assign(this, {single, multi});
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }
}

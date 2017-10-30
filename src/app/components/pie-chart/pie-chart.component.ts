import { Component, OnInit, Input } from '@angular/core';
import {single, multi} from './data';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  single: any[];
  multi: any[];

  view: any[] = [200, 200];
  gradient = false;
  showLegend = false;
  @Input() firstColor: string;
  @Input() secondColor: string;

  // pie
  showLabels = false;
  explodeSlices = false;
  doughnut = true;

  constructor() {
    Object.assign(this, {single, multi});
  }

  onSelect(event) {
    console.log(event);
  }

    ngOnInit() {
  }

}

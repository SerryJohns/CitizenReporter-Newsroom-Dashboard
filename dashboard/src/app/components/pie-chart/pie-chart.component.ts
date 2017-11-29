import {
  Component, OnInit, Input, OnChanges,
  SimpleChange
} from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {

  single: any[] = [];

  view: any[] = [200, 200];
  gradient = false;
  showLegend = false;
  @Input() firstColor: string;
  @Input() secondColor: string;
  @Input() usersToday: number;
  @Input() totalUsers: number;
  currentUsers: number;
  currentTotal: number;
  showProgressBar = true;

  // pie-chart options
  showLabels = false;
  explodeSlices = false;
  doughnut = true;

  constructor() {
    Object.assign(this, {single: this.single});
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
    for (const propName in changes) {
      const simpleChange = changes[propName];
      if (propName === 'usersToday') {
        this.currentUsers = simpleChange.currentValue;
      }
      if (propName === 'totalUsers') {
        this.currentTotal = simpleChange.currentValue;
      }
    }
    this.updatePieChartData();
    if (!(this.single.length === 0)) {
      this.showProgressBar = false;
    }
  }

  updatePieChartData() {
    this.single = [
      {
        'name': 'Today',
        'value': this.currentUsers || 0
      },
      {
        'name': 'Total',
        'value': this.currentTotal || 0
      }
    ];
  }

}

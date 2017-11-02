import {
  Component, OnInit, Input, OnChanges,
  SimpleChange
} from '@angular/core';
import {AppAnalyticsSummary} from '../analytics/AppAnalyticsSummary.model';
import {Entry} from './entry.model';
import { getDayOfTheWeek } from '../../utils/utils';

@Component({
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css']
})
export class VerticalBarChartComponent implements OnInit, OnChanges {

  single: any[] = [];
  @Input() height: number;
  @Input() width: number;
  @Input() data: AppAnalyticsSummary[];
  @Input() chart: string;
  @Input() countryChart: string;
  entries: Entry[] = [];
  showLegend = false;
  showProgressBar = true;

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
    this.populateWeeklyBarGraphData(this.data);
    Object.assign(this, {single: this.single});
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    if (this.countryChart === 'CountryChart') {
      this.xAxisLabel = 'Country';
      this.yAxisLabel = 'Number';
      this.showXAxisLabel = false;
      this.showLegend = true;
    }
  }

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
    for (const propName in changes) {
      const simpleChange = changes[propName];
      if (propName === 'data') {
        this.populateWeeklyBarGraphData(simpleChange.currentValue);
      }
    }
  }

  public populateWeeklyBarGraphData(appSummary: AppAnalyticsSummary[]) {
    const dictionary = {};
    if (appSummary) {
      for (let i = 0; i < appSummary.length; i++) {
        const formattedDate = (appSummary[i].dateTime).substring(0, 10);
        const day = new Date(formattedDate);
        this.addToDictionary(appSummary[i], day, dictionary);
      }
      if (!(this.chart === 'CountryChart')) {
        this.extrapolateValuesBasedOnDate(dictionary);
      }
      this.single = this.entries;
    }
    this.showProgressBar = false;
  }

  public addToDictionary(appSummary: AppAnalyticsSummary, day: Date, dictionary: {}) {
    if (this.chart === 'WeeklyUsers') {
      dictionary[day.getDay()] = appSummary.activeDevices;
    } else if (this.chart === 'WeeklyDownloads') {
      dictionary[day.getDay()] = appSummary.newDevices;
    } else if (this.chart === 'CountryChart') {
      this.entries.push(new Entry(appSummary.country, appSummary.activeDevices));
    }
  }

  public extrapolateValuesBasedOnDate(dictionary: {}) {
    this.entries = [];
    const date = new Date();
    for (let iterator = 0; iterator < 7; iterator++) {
      date.setDate(date.getDate() - 1);
      const key = date.getDay();
      if (!(key in dictionary)) {
        dictionary[key] = 0;
      }
    }
    for (let dayIterator = 7; dayIterator > 0; dayIterator--) {
      const day = new Date();
      day.setDate(new Date().getDate() - dayIterator);
      const dayKey = day.getDay();
      this.entries.push(new Entry(
        getDayOfTheWeek(dayKey), dictionary[dayKey]));
    }
  }

}

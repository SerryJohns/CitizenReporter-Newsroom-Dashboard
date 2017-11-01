import {
  Component, OnInit, Input, OnChanges,
  SimpleChange
} from '@angular/core';
import {multi} from './data';
import {Entry} from '../vertical-bar-chart/entry.model';
import {getDayOfTheWeek} from '../../utils/utils';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {

  multi: any[];
  @Input() height: number;
  @Input() width: number;
  @Input() data: any;
  entries: any[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#3EC556', '#ED684A']
  };

  // line, area
  autoScale = true;

  constructor() {
    Object.assign(this, {multi});
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
    for (const propName in changes) {
      const simpleChange = changes[propName];
      if (propName === 'data') {
        this.populateWeeklyBarGraphData(simpleChange.currentValue);
      }
    }
  }

  public populateWeeklyBarGraphData(appSummary: any) {
    const eventsDictionary = {};
    const keys = [];
    if (appSummary) {
      for (let i = 0; i < appSummary.length; i++) {
        const seriesDictionary = {};
        const formattedDate = (appSummary[i].dateTime).substring(0, 10);
        const day = new Date(formattedDate);
        const value = appSummary[i].occurrences;
        const key = appSummary[i].name;

        if (!(key in eventsDictionary)) {
          eventsDictionary[key] = seriesDictionary;
          keys.push(key);
        }
        eventsDictionary[key][day.getDay()] = value;
      }
      this.extrapolateValuesBasedOnDate(eventsDictionary, keys);
      this.multi = this.entries;
    }
  }

  public extrapolateValuesBasedOnDate(dictionary: {}, keys: string[]) {
    this.entries = [];

    for (let keyIterator = 0; keyIterator < keys.length; keyIterator++) {
      const key = keys[keyIterator];
      const serie = dictionary[key];
      this.entries.push(
        {
          'name': key,
          'series': this.getEventSeriesData(serie)
        });
    }
  }

  public getEventSeriesData (dictionary: {}) {
    const series = [];
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
      series.push(new Entry(
        getDayOfTheWeek(dayKey), dictionary[dayKey]));
    }
    return series;
  }

}

import {AfterViewInit, Component, OnInit} from '@angular/core';
import { EventsAnalyticsService } from '../../services/events-analytics.service';

declare var $: any;

@Component({
  selector: 'app-events-analytics',
  templateUrl: './events-analytics.component.html',
  styleUrls: ['./events-analytics.component.css'],
  providers: [EventsAnalyticsService]
})
export class EventsAnalyticsComponent implements OnInit, AfterViewInit {

  analyticsSummary: any[] = [];
  weeklyEvents: any[] = [];
  monthlyEvents: any[] = [];
  showPeriod = 'Week';

  constructor(private _eventsAnalyticsService: EventsAnalyticsService) { }

  ngOnInit() {
    this.getEventsAnalyticsData();
    this.getWeeklyAnalyticsData();
    this.getMonthlyAnalyticsData();
  }

  ngAfterViewInit() {
    $('#radioBtn a').on('click', function(){
        const sel = $(this).data('title');
        const tog = $(this).data('toggle');
        $('#' + tog).prop('value', sel);
        $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
        $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
    });
  }

  public getEventsAnalyticsData () {
    this._eventsAnalyticsService.getEventsSummary()
      .subscribe((data) => {
      if (data.rows.length === 0) {
        console.log('There is no event data');
      } else {
        this.analyticsSummary = [];
        this.populateEventsData(data, this.analyticsSummary);
      }
      },
        (error) => {
      console.log(error);
    });
  }

  public getWeeklyAnalyticsData () {
    this._eventsAnalyticsService.getWeeklyEvents()
      .subscribe((data) => {
      if (data.rows.length === 0) {
        console.log('There is no event data');
      } else {
        this.weeklyEvents = [];
        this.populateEventsData(data, this.weeklyEvents);
      }
      },
        (error) => {
      console.log(error);
    });
  }

  public getMonthlyAnalyticsData () {
    this._eventsAnalyticsService.getMonthlyEvents()
      .subscribe((data) => {
      if (data.rows.length === 0) {
        console.log('There is no event data');
      } else {
        this.monthlyEvents = [];
        this.populateEventsData(data, this.monthlyEvents);
      }
      },
        (error) => {
      console.log(error);
    });
  }

  public populateEventsData (rawData: any, outputArray: any[]) {
    for (let iterator = 0; iterator < rawData.rows.length; iterator++) {
      const row = rawData.rows[iterator]['event|name'];
      const occurrences = rawData.rows[iterator]['occurrences'];
      const averageTimePerDevice = rawData.rows[iterator]['averageTimePerDevice'];
      const dateTime = rawData.rows[iterator]['dateTime'];
      const averageTimePerSession = rawData.rows[iterator]['averageTimePerSession'];
      outputArray.push({
        'name': row,
        'occurrences': occurrences,
        'averageTimePerDevice': averageTimePerDevice,
        'dateTime': dateTime,
        'averageTimePerSession': averageTimePerSession
      });
    }
    console.log('');
  }

  public togglePeriod(period) {
    if (period === 'M') {
      this.showPeriod = 'Month';
    } else if (period === 'W') {
      this.showPeriod = 'Week';
    } else if (period === 'Y') {
      this.showPeriod = 'Year';
    }
  }

}

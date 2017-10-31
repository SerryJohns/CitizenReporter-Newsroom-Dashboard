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

  constructor(private _eventsAnalyticsService: EventsAnalyticsService) { }

  ngOnInit() {
    this.getEventsAnalyticsData();
    this.getWeeklyAnalyticsData();
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
        console.log('There is event data');
      } else {
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
        console.log('There is event data');
      } else {
        this.populateEventsData(data, this.weeklyEvents);
        console.log('');
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
      const averageTimePerSession = rawData.rows[iterator]['averageTimePerSession'];
      outputArray.push({
        'name': row,
        'occurrences': occurrences,
        'averageTimePerDevice': averageTimePerDevice,
        'averageTimePerSession': averageTimePerSession
      });
    }
  }

}

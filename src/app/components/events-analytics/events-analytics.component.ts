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

  constructor(private _eventsAnalyticsService: EventsAnalyticsService) { }

  ngOnInit() {

    this._eventsAnalyticsService.getEventsSummary()
      .subscribe((data) => {
      if (data.rows.length === 0) {
        console.log('There are no users today');
      } else {
        for (let iterator = 0; iterator < data.rows.length; iterator++) {
          const row = data.rows[iterator]['event|name'];
          const occurrences = data.rows[iterator]['occurrences'];
          const averageTimePerDevice = data.rows[iterator]['averageTimePerDevice'];
          const averageTimePerSession = data.rows[iterator]['averageTimePerSession'];
          this.analyticsSummary.push({
            'name': row,
            'occurrences': occurrences,
            'averageTimePerDevice': averageTimePerDevice,
            'averageTimePerSession': averageTimePerSession
          });
          console.log('just');
        }
        console.log('There is data');
      }
      },
        (error) => {
      console.log(error);
    });

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

}

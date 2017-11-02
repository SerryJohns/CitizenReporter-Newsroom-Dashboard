import { Injectable } from '@angular/core';
import {
  Http,
  Headers
} from '@angular/http';
import 'rxjs/add/operator/map';

import { formatDate, getHeaders, getWeekDateRange, getMonthDateRange } from '../../utils/utils';

@Injectable()
export class EventsAnalyticsService {

  public eventsSummaryUrl = 'https://api-metrics.flurry.com/public/v1/data/' +
    'appEvent/all/app/event?metrics=activeDevices,newDevices,timeSpent,' +
    'averageTimePerDevice,averageTimePerSession,occurrences&dateTime=' +
    '2017-10-01/' + formatDate(new Date());
  public weeklyEventsUrl = 'https://api-metrics.flurry.com/public/v1/data/' +
    'appEvent/day/app/event?metrics=activeDevices,newDevices,timeSpent,' +
    'averageTimePerDevice,averageTimePerSession,' +
    'occurrences&dateTime=' + getWeekDateRange();
  public monthlyEventsUrl = 'https://api-metrics.flurry.com/public/v1/data/' +
    'appEvent/day/app/event?metrics=activeDevices,newDevices,timeSpent,' +
    'averageTimePerDevice,averageTimePerSession,' +
    'occurrences&dateTime=' + getMonthDateRange();
  public headers: Headers;
  public token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImZsdXJyeS56dXVsLnByb2Qua2V5c3' +
    'RvcmUua2V5LjIifQ.eyJpc3MiOiJodHRwczovL3p1dWwuZmx1cnJ5LmNvbTo0NDMvdG9rZW' +
    '4iLCJpYXQiOjE1MDgxNjY3OTMsImV4cCI6MzMwNjUwNzU1OTMsInN1YiI6IjQwNjQ2MCIs' +
    'ImF1ZCI6IjQiLCJ0eXBlIjo0LCJqdGkiOiIyMjU4In0.dsr3hGkC3O8FUR_zVxMDZ6F' +
    'taU7r7dnWJ6sR82vcsDE';

  constructor(private http: Http) {
    this.headers = getHeaders();
    this.headers.set('Authorization', `Bearer ${this.token}`);
  }

  public getEventsSummary() {
    return this.http.get(this.eventsSummaryUrl, {
      headers: this.headers
    }).map((response) => response.json());
  }

  public getWeeklyEvents() {
    return this.http.get(this.weeklyEventsUrl, {
      headers: this.headers
    }).map((response) => response.json());
  }

  public getMonthlyEvents() {
    return this.http.get(this.monthlyEventsUrl, {
      headers: this.headers
    }).map((response) => response.json());
  }
}

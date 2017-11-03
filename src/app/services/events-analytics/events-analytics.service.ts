import { Injectable } from '@angular/core';
import {
  Http
} from '@angular/http';
import 'rxjs/add/operator/map';

import { getWeekDateRange, getMonthDateRange, makeGetHttpRequest } from '../../utils/utils';

@Injectable()
export class EventsAnalyticsService {

  public weeklyEventsUrl = 'https://api-metrics.flurry.com/public/v1/data/' +
    'appEvent/day/app/event?metrics=activeDevices,newDevices,timeSpent,' +
    'averageTimePerDevice,averageTimePerSession,' +
    'occurrences&dateTime=' + getWeekDateRange();
  public monthlyEventsUrl = 'https://api-metrics.flurry.com/public/v1/data/' +
    'appEvent/day/app/event?metrics=activeDevices,newDevices,timeSpent,' +
    'averageTimePerDevice,averageTimePerSession,' +
    'occurrences&dateTime=' + getMonthDateRange();

  constructor(private http: Http) {
  }

  public getEventsSummary() {
    return makeGetHttpRequest(this.http, this.weeklyEventsUrl);
  }

  public getWeeklyEvents() {
    return makeGetHttpRequest(this.http, this.weeklyEventsUrl);
  }

  public getMonthlyEvents() {
    return makeGetHttpRequest(this.http, this.monthlyEventsUrl);
  }
}

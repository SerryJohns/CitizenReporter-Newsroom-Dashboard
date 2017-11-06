import { Injectable } from '@angular/core';
import {
  Http
} from '@angular/http';
import 'rxjs/add/operator/map';

import { getWeekDateRange, getMonthDateRange, makeGetHttpRequest, formatDate } from '../../utils/utils';

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
  public analyticsEventsUrl = 'https://api-metrics.flurry.com/public/v1/data/' +
    'appEvent/all/app/event?metrics=activeDevices,newDevices,timeSpent,' +
    'averageTimePerDevice,averageTimePerSession,' +
    'occurrences&dateTime=2017-10-01/' + formatDate(new Date());

  constructor(private http: Http) {
  }

  public getEventsSummary() {
    return makeGetHttpRequest(this.http, this.analyticsEventsUrl);
  }

  public getWeeklyEvents() {
    return makeGetHttpRequest(this.http, this.weeklyEventsUrl);
  }

  public getMonthlyEvents() {
    return makeGetHttpRequest(this.http, this.monthlyEventsUrl);
  }
}

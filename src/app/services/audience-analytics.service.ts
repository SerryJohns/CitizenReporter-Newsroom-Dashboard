import { Injectable } from '@angular/core';
import {
  Http,
  Headers
} from '@angular/http';
import 'rxjs/add/operator/map';

import { formatDate, getHeaders, getWeekDateRange } from '../utils/utils';

@Injectable()
export class AudienceAnalyticsService {

  public url = 'https://api-metrics.flurry.com/public/v1/data/appUsage/all' +
    '/app?metrics=sessions,activeDevices,newDevices,timeSpent' +
    ',averageTimePerDevice,averageTimePerSession' +
    '&dateTime=2017-10-13/2017-10-15';
  public dailyUsersUrl = 'https://api-metrics.flurry.com/public/v1/data/appUsage/all' +
    '/app?metrics=newDevices&dateTime=' + this.getTodaysDateRange();
  public weeklyUsersUrl = 'https://api-metrics.flurry.com/public/v1/data/' +
    'appUsage/day/app?metrics=newDevices&dateTime=' + getWeekDateRange();
  public headers: Headers;
  public token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImZsdXJyeS56dXVsLnByb2Qua2V5c3' +
    'RvcmUua2V5LjIifQ.eyJpc3MiOiJodHRwczovL3p1dWwuZmx1cnJ5LmNvbTo0NDMvdG9rZW' +
    '4iLCJpYXQiOjE1MDgxNjY3OTMsImV4cCI6MzMwNjUwNzU1OTMsInN1YiI6IjQwNjQ2MCIs' +
    'ImF1ZCI6IjQiLCJ0eXBlIjo0LCJqdGkiOiIyMjU4In0.dsr3hGkC3O8FUR_zVxMDZ6F' +
    'taU7r7dnWJ6sR82vcsDE';
  private today: Date;
  private previousDay: Date;

  constructor(private http: Http) {
    this.headers = getHeaders();
    this.headers.set('Authorization', `Bearer ${this.token}`);
  }

  public getAppAnalyticsSummary() {
    return this.http.get(this.url, {
      headers: this.headers
    }).map((response) => response.json());
  }

  public getTotalUsersToday() {
    return this.http.get(this.dailyUsersUrl, {
      headers: this.headers
    }).map((response) => response.json());
  }

  public getWeeklyUsers() {
    return this.http.get(this.weeklyUsersUrl, {
      headers: this.headers
    }).map((response) => response.json());
  }

  public getTodaysDateRange() {
    this.today = new Date();
    this.previousDay = new Date(this.today);
    this.previousDay.setDate(this.today.getDate() - 1);
    return formatDate(this.previousDay) + '/' + formatDate(this.today);
  }

}

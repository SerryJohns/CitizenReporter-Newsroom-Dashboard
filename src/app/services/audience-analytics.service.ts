import { Injectable } from '@angular/core';
import {
  Http,
  Headers
} from '@angular/http';
import 'rxjs/add/operator/map';

import { formatDate, getHeaders, getWeekDateRange } from '../utils/utils';

@Injectable()
export class AudienceAnalyticsService {

  public analyticsSummaryUrl = 'https://api-metrics.flurry.com/public/v1/data/appUsage/all' +
    '/app?metrics=sessions,activeDevices,newDevices,timeSpent' +
    ',averageTimePerDevice,averageTimePerSession' +
    '&dateTime=2017-10-01/' + formatDate(new Date());
  public dailyStatisticsUrl = 'https://api-metrics.flurry.com/public/v1/data/appUsage/all' +
    '/app?metrics=activeDevices,newDevices&dateTime=' + this.getTodaysDateRange();
  public weeklyStatisticsUrl = 'https://api-metrics.flurry.com/public/v1/data/' +
    'appUsage/day/app?metrics=activeDevices,newDevices&dateTime=' + getWeekDateRange();
  public countryStatisticsUrl = 'https://api-metrics.flurry.com/public/v1/data/' +
    'appUsage/hour/country?metrics=activeDevices,newDevices&' +
    'dateTime=2017-10-01/' + formatDate(new Date());
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
    return this.http.get(this.analyticsSummaryUrl, {
      headers: this.headers
    }).map((response) => response.json());
  }

  public getDailyStatistics() {
    return this.http.get(this.dailyStatisticsUrl, {
      headers: this.headers
    }).map((response) => response.json());
  }

  public getWeeklyStatistics() {
    return this.http.get(this.weeklyStatisticsUrl, {
      headers: this.headers
    }).map((response) => response.json());
  }

  public getCountryStatistics() {
    return this.http.get(this.countryStatisticsUrl, {
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

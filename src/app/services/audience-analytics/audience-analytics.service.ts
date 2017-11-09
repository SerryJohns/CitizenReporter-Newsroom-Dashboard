import { Injectable } from '@angular/core';
import {
  Http,
  Headers
} from '@angular/http';
import 'rxjs/add/operator/map';

import { getTodaysDateRange, formatDate, getWeekDateRange, makeGetHttpRequest } from '../../utils/utils';

@Injectable()
export class AudienceAnalyticsService {

  public analyticsSummaryUrl = 'https://api-metrics.flurry.com/public/v1/data/appUsage/all' +
    '/app?metrics=sessions,activeDevices,newDevices,timeSpent' +
    ',averageTimePerDevice,averageTimePerSession' +
    '&dateTime=2017-10-01/' + formatDate(new Date());
  public dailyStatisticsUrl = 'https://api-metrics.flurry.com/public/v1/data/appUsage/all' +
    '/app?metrics=activeDevices,newDevices&dateTime=' + getTodaysDateRange();
  public weeklyStatisticsUrl = 'https://api-metrics.flurry.com/public/v1/data/' +
    'appUsage/day/app?metrics=activeDevices,newDevices&dateTime=' + getWeekDateRange();
  public countryStatisticsUrl = 'https://api-metrics.flurry.com/public/v1/data/' +
    'appUsage/hour/country?metrics=activeDevices,newDevices&' +
    'dateTime=2017-10-01/' + formatDate(new Date());
  public appVersionStatisticsUrl = 'https://api-metrics.flurry.com/public/v1/' +
    'data/technical/day/app/osVersion?metrics=activeDevices,newDevices,' +
    'timeSpent,averageTimePerDevice,averageTimePerSession&' +
    'dateTime=2017-10-01/' + formatDate(new Date());

  constructor(private http: Http) {
  }

  public getAppAnalyticsSummary() {
    return makeGetHttpRequest(this.http, this.analyticsSummaryUrl);
  }

  public getDailyStatistics() {
    return makeGetHttpRequest(this.http, this.dailyStatisticsUrl);
  }

  public getWeeklyStatistics() {
    return makeGetHttpRequest(this.http, this.weeklyStatisticsUrl);
  }

  public getCountryStatistics() {
    return makeGetHttpRequest(this.http, this.countryStatisticsUrl);
  }

  public getOsVersionStatistics() {
    return makeGetHttpRequest(this.http, this.appVersionStatisticsUrl);
  }
}

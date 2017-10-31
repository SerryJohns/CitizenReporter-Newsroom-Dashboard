import { Injectable } from '@angular/core';
import {
  Http,
  Headers
} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsAnalyticsService {

  public eventsSummaryUrl = 'https://api-metrics.flurry.com/public/v1/data/' +
    'appEvent/all/app/event?metrics=activeDevices,newDevices,timeSpent,' +
    'averageTimePerDevice,averageTimePerSession,occurrences&dateTime=' +
    '2017-10-01/' + EventsAnalyticsService.formatDate(new Date());
  public headers: Headers;
  public token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImZsdXJyeS56dXVsLnByb2Qua2V5c3' +
    'RvcmUua2V5LjIifQ.eyJpc3MiOiJodHRwczovL3p1dWwuZmx1cnJ5LmNvbTo0NDMvdG9rZW' +
    '4iLCJpYXQiOjE1MDgxNjY3OTMsImV4cCI6MzMwNjUwNzU1OTMsInN1YiI6IjQwNjQ2MCIs' +
    'ImF1ZCI6IjQiLCJ0eXBlIjo0LCJqdGkiOiIyMjU4In0.dsr3hGkC3O8FUR_zVxMDZ6F' +
    'taU7r7dnWJ6sR82vcsDE';

  constructor(private http: Http) {
    // console.log('The current range is ' + this.getTodaysDateRange());
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.set('Authorization', `Bearer ${this.token}`);
  }

  private static formatDate(date: Date) {
    let dd: any = date.getDate();
    let mm: any = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
  }

  public getEventsSummary() {
    return this.http.get(this.eventsSummaryUrl, {
      headers: this.headers
    }).map((response) => response.json());
  }
}

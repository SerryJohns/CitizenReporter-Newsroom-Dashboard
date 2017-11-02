import { Component, OnInit } from '@angular/core';
import { AudienceAnalyticsService } from '../../services/audience-analytics/audience-analytics.service';
import {
  AppAnalyticsSummary
} from './AppAnalyticsSummary.model';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  providers: [AudienceAnalyticsService]
})
export class AnalyticsComponent implements OnInit {

  height = 200;
  width = 300;
  green = '#3EC556';
  darkColor = '#F7F7F7';
  orange = '#ED684A';
  weeklyUsersChart = 'WeeklyUsers';
  weeklyDownloadsChart = 'WeeklyDownloads';
  totalUsers: number;
  totalDownloads: number;
  usersToday: number;
  downloadsToday: number;
  countryChart = 'CountryChart';

  appAnalyticsSummary: AppAnalyticsSummary;
  weeklyAnalytics: AppAnalyticsSummary[];
  countryAnalytics: AppAnalyticsSummary[];

  constructor(private _audienceAnalyticsService: AudienceAnalyticsService) {
  }

  ngOnInit() {
    this.getSummary();
    this.getDailyStatistics();
    this.getWeeklyStatistics();
    this.getCountryStatistics();
  }

  private getSummary() {
    this._audienceAnalyticsService.getAppAnalyticsSummary()
      .subscribe((data) => {
      if (data.rows.length === 0) {
        console.log('Application summary statistics not available at the moment');
        this.totalUsers = 0;
        this.totalDownloads = 0;
      } else {
        this.appAnalyticsSummary = data.rows[0];
        this.totalUsers = this.appAnalyticsSummary.activeDevices;
        this.totalDownloads = this.appAnalyticsSummary.newDevices;
      }
      },
        (error) => {
      console.log(error);
    });
  }

  private getDailyStatistics () {
    this._audienceAnalyticsService.getDailyStatistics()
      .subscribe((data) => {
      if (data.rows.length === 0) {
        console.log('Daily statistics are not available at the moment');
        this.usersToday = 0;
        this.downloadsToday = 0;
      } else {
        this.usersToday = data.rows[0].activeDevices;
        this.downloadsToday = data.rows[0].newDevices;
      }
      },
        (error) => {
      console.log(error);
    });
  }

  private getWeeklyStatistics () {
    this._audienceAnalyticsService.getWeeklyStatistics()
      .subscribe((data) => {
      if (data.rows.length === 0) {
        console.log('Weekly statistics are not available at the moment');
      } else {
        this.weeklyAnalytics = data.rows;
      }
      },
        (error) => {
      console.log(error);
    });
  }

  private getCountryStatistics () {
    this._audienceAnalyticsService.getCountryStatistics()
      .subscribe((data) => {
      if (data.rows.length === 0) {
        console.log('Country statistics are not available at the moment');
      } else {
        this.countryAnalytics = [];
        this.populateCountryData(data, this.countryAnalytics);
      }
      },
        (error) => {
      console.log(error);
    });
  }

  public populateCountryData (rawData: any, outputArray: any[]) {
    for (let iterator = 0; iterator < rawData.rows.length; iterator++) {
      const country = rawData.rows[iterator]['country|name'];
      const activeDevices = rawData.rows[iterator]['activeDevices'];
      const newDevices = rawData.rows[iterator]['newDevices'];
      const dateTime = rawData.rows[iterator]['dateTime'];
      outputArray.push({
        'country': country,
        'activeDevices': activeDevices,
        'newDevices': newDevices,
        'dateTime': dateTime
      });
    }
  }
}

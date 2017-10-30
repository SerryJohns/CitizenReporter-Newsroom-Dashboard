import { Component, OnInit } from '@angular/core';
import { AudienceAnalyticsService } from '../../services/audience-analytics.service';
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
  totalUsers: number;
  usersToday: number;

  appAnalyticsSummary: AppAnalyticsSummary;

  constructor(private _audienceAnalyticsService: AudienceAnalyticsService) {
  }

  ngOnInit() {
    this._audienceAnalyticsService.getAppAnalyticsSummary()
      .subscribe((data) => {
      if (data.rows.length === 0) {
        console.log('There is no app summary data');
        this.totalUsers = 0;
      } else {
        this.appAnalyticsSummary = data.rows[0];
        console.log(this.appAnalyticsSummary.newDevices);
        this.totalUsers = this.appAnalyticsSummary.newDevices;
      }
      },
        (error) => {
      console.log(error);
    });

    this._audienceAnalyticsService.getTotalUsersToday()
      .subscribe((data) => {
      if (data.rows.length === 0) {
        console.log('There are no users today');
        this.usersToday = 0;
      } else {
        this.appAnalyticsSummary = data.rows[0];
        console.log(this.appAnalyticsSummary.newDevices);
        this.usersToday = this.appAnalyticsSummary.newDevices;
      }
      },
        (error) => {
      console.log(error);
    });
  }
}


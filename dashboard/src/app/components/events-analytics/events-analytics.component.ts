import {AfterViewInit, Component, OnInit} from '@angular/core';
import { EventsAnalyticsService } from '../../services/events-analytics/events-analytics.service';
import { Paginator } from './../../models/paginator.model';
import { PaginateService } from '../../services/pagination/paginate.service';

declare var $: any;

@Component({
  selector: 'app-events-analytics',
  templateUrl: './events-analytics.component.html',
  styleUrls: ['./events-analytics.component.css'],
  providers: [EventsAnalyticsService, PaginateService]
})
export class EventsAnalyticsComponent implements OnInit, AfterViewInit {

  analyticsSummary: any[] = [];
  paginatedData: any[] = [];
  temporaryPaginatedData: any[] = [];
  weeklyEvents: any[] = [];
  monthlyEvents: any[] = [];
  showPeriod = 'Week';
  showProgressBar = true;
  currentPage: number;
  limit = 6;
  offset = 0;
  pages: number [];
  paginator: Paginator;
  searchString = '';

  constructor(private _eventsAnalyticsService: EventsAnalyticsService, private _paginateService: PaginateService) { }

  ngOnInit() {
    this.getEventsAnalyticsData();
    this.getWeeklyAnalyticsData();
    this.getMonthlyAnalyticsData();
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

  public getEventsAnalyticsData () {
    this._eventsAnalyticsService.getEventsSummary()
      .subscribe((data) => {
      if (data.rows.length === 0) {
        console.log('There is no event data');
      } else {
        this.analyticsSummary = [];
        this.populateEventsData(data, this.analyticsSummary);
        this.showProgressBar = false;
        this.paginator = this._paginateService.paginateData(this.analyticsSummary.length, this.limit, this.offset);
        this.currentPage = this.paginator.currentPage;
        this.pages = this.paginator.pages;
        this.paginatedData = this.analyticsSummary.slice(this.offset, this.limit);
        this.temporaryPaginatedData = this.paginatedData;
        console.log('');
      }
      },
        (error) => {
      console.log(error);
    });
  }

  public getWeeklyAnalyticsData () {
    this._eventsAnalyticsService.getWeeklyEvents()
      .subscribe((data) => {
      if (data.rows.length === 0) {
        console.log('There is no event data');
      } else {
        this.weeklyEvents = [];
        this.populateEventsData(data, this.weeklyEvents);
      }
      },
        (error) => {
      console.log(error);
    });
  }

  public getMonthlyAnalyticsData () {
    this._eventsAnalyticsService.getMonthlyEvents()
      .subscribe((data) => {
      if (data.rows.length === 0) {
        console.log('There is no event data');
      } else {
        this.monthlyEvents = [];
        this.populateEventsData(data, this.monthlyEvents);
      }
      },
        (error) => {
      console.log(error);
    });
  }

  public populateEventsData (rawData: any, outputArray: any[]) {
    for (let iterator = 0; iterator < rawData.rows.length; iterator++) {
      const name = rawData.rows[iterator]['event|name'];
      const occurrences = rawData.rows[iterator]['occurrences'];
      const averageTimePerDevice = rawData.rows[iterator]['averageTimePerDevice'];
      const dateTime = rawData.rows[iterator]['dateTime'];
      const averageTimePerSession = rawData.rows[iterator]['averageTimePerSession'];
      outputArray.push({
        'name': this.formatName(name),
        'occurrences': occurrences,
        'averageTimePerDevice': averageTimePerDevice,
        'dateTime': dateTime,
        'averageTimePerSession': averageTimePerSession
      });
    }
  }

  private formatName(name: string) {
    switch (name) {
        case 'PASSWORD_SIGN_UP':
            name = 'Number of sign ups';
            break;
        case 'LOGIN':
            name = 'Number of log ins';
            break;
        case 'ASSIGNMENT_OPEN':
            name = 'Number of open assignments';
            break;
        case 'CREATE_STORY':
            name = 'Number of stories created';
            break;
        case 'SAVE_STORY':
            name = 'Number of stories saved';
            break;
        case 'AUDIO_UPLOAD':
            name = 'Number of audios uploaded';
            break;
        case 'UPLOAD_STORY':
            name = 'Number of stories uploaded';
            break;
        case 'IMAGE_UPLOAD':
            name = 'Number of images uploaded';
            break;
        default:
            return name;
    }
    return name;
  }

  public togglePeriod(period) {
    if (period === 'M') {
      this.showPeriod = 'Month';
    } else if (period === 'W') {
      this.showPeriod = 'Week';
    } else if (period === 'Y') {
      this.showPeriod = 'Year';
    }
  }

  public loadMore(page) {
    const prevOffset: number = this.offset;
    this.offset = this._paginateService.getOffset(page, this.limit, this.currentPage);
    if (this.offset >= this.analyticsSummary.length) {
      this.offset = prevOffset;
    }
    this.paginatedData = this.analyticsSummary.slice(this.offset, this.offset + this.limit);
    this.temporaryPaginatedData = this.paginatedData;
  }

   public filter () {
    if (this.searchString !== '') {
      this.paginatedData = [];
      this.analyticsSummary.forEach(element => {
        if (element.name.toUpperCase().indexOf(this.searchString.toUpperCase()) >= 0) {
          this.paginatedData.push(element);
       }
      });
    } else {
      this.paginatedData = this.temporaryPaginatedData;
    }
   }
}

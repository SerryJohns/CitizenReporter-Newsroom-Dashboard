import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  height = 200;
  width = 300;
  green = '#3EC556';
  darkColor = '#F7F7F7'
  orange = '#ED684A'

  constructor() {
  }

  ngOnInit() {
  }
}


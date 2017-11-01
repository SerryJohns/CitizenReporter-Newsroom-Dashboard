import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  pageTitle: '';

  constructor(private route: ActivatedRoute) {
    this.pageTitle = route.snapshot.data['title'];
  }

  ngOnInit() {
  }

}

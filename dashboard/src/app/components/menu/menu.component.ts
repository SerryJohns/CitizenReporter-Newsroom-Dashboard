import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Menu } from './../../models/menu.model';
import { dataMenu, notificationMenu, analyticsMenu } from './mock-menus';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('showSideIcons', [
      state('in', style({
        display: 'initial'
      })),
      state('out', style({
        display: 'none'
      })),
      transition('in <=> out', animate('0ms 200ms ease-in-out'))
    ]),
  ]
})

export class MenuComponent implements OnInit {

  constructor(private router: Router) { }
  dataMenu: Menu[];
  analyticsMenu: Menu[];
  notificationMenu: Menu[];
  selectedMenu: String;
  @Input() toggleState: String;

  ngOnInit() {
    this.dataMenu = dataMenu;
    this.analyticsMenu = analyticsMenu;
    this.notificationMenu = notificationMenu;
  }

  onMenuClick(menu: Menu) {
    this.selectedMenu = menu.name;
    this.router.navigate([menu.url]);
  }

}

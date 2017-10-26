import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Menu } from './menu.model';
import { dataMenu, notificationMenu } from './mock-menus';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }
  dataMenu: Menu[];
  notificationMenu: Menu[];
  selectedMenu: String;

  ngOnInit() {
    this.dataMenu = dataMenu;
    this.notificationMenu = notificationMenu;
  }

  onMenuClick(menu: Menu) {
    this.selectedMenu = menu.name;
    this.router.navigate([menu.url]);
  }

}

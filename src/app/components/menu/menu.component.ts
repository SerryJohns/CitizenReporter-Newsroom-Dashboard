import { Component, OnInit } from '@angular/core';
import { Menu } from './menu.model';
import { DATA_MENU, NOTIFICATION_MENU } from './mock-menus';
import { Router } from '@angular/router';

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
    this.dataMenu = DATA_MENU;
    this.notificationMenu = NOTIFICATION_MENU;
  }

  onMenuClick(menu: Menu) {
    this.selectedMenu = menu.name;
    this.router.navigate([menu.url]);
  }

}

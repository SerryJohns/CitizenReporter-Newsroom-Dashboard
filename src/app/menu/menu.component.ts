import { Component, OnInit } from '@angular/core';
import { Menu, DATA_MENU, NOTIFICATION_MENU } from './menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }
  dataMenu: Menu[];
  notifationMenu: Menu[];

  ngOnInit() {
    this.dataMenu = DATA_MENU;
    this.notifationMenu = NOTIFICATION_MENU;
  }

}

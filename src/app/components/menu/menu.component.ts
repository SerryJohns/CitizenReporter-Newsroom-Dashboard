import { Component, OnInit } from '@angular/core';
import { Menu, DATA_MENU, NOTIFICATION_MENU } from './menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }
  dataMenu: Menu[];
  notifationMenu: Menu[];
  selectedMenu: String;

  ngOnInit() {
    this.dataMenu = DATA_MENU;
    this.notifationMenu = NOTIFICATION_MENU;
  }

  onMenuClick(menu: Menu) {
    this.selectedMenu = menu.name;
    this.router.navigate([menu.url]);
  }

}

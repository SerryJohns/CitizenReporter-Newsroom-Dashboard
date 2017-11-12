import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('sideMenuToggle', [
      state('in', style({
        transform: 'translateX(-80%)'
      })),
      state('out', style({
        transform: 'translateX(0)'
      })),
      transition('in <=> out', animate('400ms ease-in-out'))
    ]),
    trigger('toggleIcon', [
      state('in', style({
        transform: 'rotate(180deg)'
      })),
      state('out', style({
        transform: 'rotate(0deg)'
      })),
      transition('* <=> *', animate('400ms ease-in-out'))
    ])
  ]
})

export class AppComponent {
  constructor(private router: Router) { }
  public menuState: String = 'out';

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}

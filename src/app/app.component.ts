import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

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
    ])
  ]
})

export class AppComponent {
  public menuState: String = 'out';
  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}

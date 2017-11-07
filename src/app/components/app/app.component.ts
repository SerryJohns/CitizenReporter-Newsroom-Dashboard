import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

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

export class AppComponent implements OnInit {
  constructor(private router: Router, private _authenticationService: AuthenticationService) { }
  public menuState: String = 'out';
  UserIsAuthorised = false;

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  ngOnInit() {
    this._authenticationService.showDashboardEmitter.subscribe(
      (mode: boolean) => {
        if (mode !== null) {
          this.UserIsAuthorised = mode;
        }
      }
    );
    if (localStorage.getItem('currentUser')) {
        // logged in so show dashboard
        this.UserIsAuthorised = true;
    }
  }
}

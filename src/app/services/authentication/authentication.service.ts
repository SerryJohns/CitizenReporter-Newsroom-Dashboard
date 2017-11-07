import { Injectable, EventEmitter } from '@angular/core';
import { Parse } from 'parse';

import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  public showDashboardEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  private authenticated = false;

  constructor(private router: Router) {}

  logIn(username: String, password: String, success: () => void, error: () => void) {
    Parse.User.logIn(username, password).then(function() {
      localStorage.setItem('currentUser', 'LoggedIn');
      success();
      }, function (e){
      error();
    });
  }

  toggleAuthentication() {
    this.authenticated = true;
    this.showDashboard(true);
  }

  logout() {
    this.authenticated = false;
    this.showDashboard(false);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.authenticated;
  }

  private showDashboard(ifShow: boolean) {
     this.showDashboardEmitter.emit(ifShow);
  }

}

import { Injectable, EventEmitter } from '@angular/core';
import { Parse } from 'parse';

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthenticationService {

  // private _showNavBar = new BehaviorSubject<boolean>(null);
  public showDashboardEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  private authenticated = false;

  constructor(private router: Router) {}

  logIn(username: String, password: String, success: () => void, error: () => void) {
    Parse.User.logIn(username, password).then(function(){
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
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.authenticated;
  }

  private showDashboard(ifShow: boolean) {
     this.showDashboardEmitter.emit(ifShow);
  }

}

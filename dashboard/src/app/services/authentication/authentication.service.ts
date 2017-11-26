import { Injectable, EventEmitter } from '@angular/core';
import { Parse } from 'parse';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  public showDashboardEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  logIn(username: String, password: String, success: () => void, error: () => void) {
    Parse.User.logIn(username, password).then(function(user) {
      const query = new Parse.Query(Parse.Role);
      query.equalTo('name', 'Administrator');
      query.equalTo('users', user);
      return query.find().then(function(roles) {
          const isAdmin = roles.length > 0;
          if (isAdmin) {
            localStorage.setItem('currentUser', 'LoggedIn');
            success();
          } else {
            error();
          }
      });
    }, function(e) {
      error();
    });
  }

  toggleAuthentication() {
    this.showDashboard(true);
  }

  logout() {
    Parse.User.logOut().then(() => {});
    this.showDashboard(false);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  private showDashboard(ifShow: boolean) {
     this.showDashboardEmitter.emit(ifShow);
  }

}

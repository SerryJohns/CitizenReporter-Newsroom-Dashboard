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
      query.equalTo('users', user);
      return query.find().then(function(roles) {
          let isAdmin = false;
          roles.every(element => {
            if (element.get('name') === 'Administrator') {
              isAdmin = true;
              localStorage.setItem('role', 'admin');
              return false;
            } else if (element.get('name') === 'Editor') {
              localStorage.setItem('role', 'editor');
              isAdmin = true;
            }
            return true;
          });
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

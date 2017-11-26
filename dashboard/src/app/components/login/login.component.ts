import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Parse } from 'parse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg: string;
  loading = false;
  state = false;

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      // log out and redirect to login page
      this._authenticationService.logout();
    }
  }

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private _authenticationService: AuthenticationService
  ) {}

  login(event, username, password) {
    this.loading = true;
    event.preventDefault();
    const self = this;
    this.errorMsg = null;
    this._authenticationService.logIn(username, password, function(){
          console.log('User logged in through email');
          // self._authenticationService.toggleAuthentication();
          // self.loading = false;
          // self.redirect();
        }, function(){
          self.errorMsg = 'Wrong username / password combination';
          self.loading = false;
      });

  }

  private redirect(): void {
      this.router.navigate(['/analytics']);
      window.location.reload();
  }

}

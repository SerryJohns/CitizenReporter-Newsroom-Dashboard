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
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  errorMsg: string;
  k = 9;

  ngOnInit() {
  }

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private _authenticationService: AuthenticationService
  ) {}

  login(event, username, password) {
    event.preventDefault();
    const self = this;

    this.errorMsg = null;
    Parse.User.logIn(username, password, {
      success: function(user) {
        console.log('User has been logged in successfully');
        self.redirect();
      },
      error: function(user, error) {
        this.errorMsg = 'Wrong username / password combination';
        console.log(error);
      }
    });

  }

  private redirect(): void {
      this.router.navigate(['/home']);
  }

}

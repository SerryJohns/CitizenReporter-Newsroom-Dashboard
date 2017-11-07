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
    this._authenticationService.logIn(username, password, function(){
          console.log('User logged in through email');
          self._authenticationService.toggleAuthentication();
          self.redirect();
        }, function(){
          self.errorMsg = 'Wrong username / password combination';
      });

  }

  private redirect(): void {
      this.router.navigate(['/home']);
  }

}

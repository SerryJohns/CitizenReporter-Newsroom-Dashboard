import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Parse } from 'parse';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  pageTitle: 'Citizen';

  constructor(private router: Router, private route: ActivatedRoute, private _authenticationService: AuthenticationService) {
    this.pageTitle = route.snapshot.data['title'];
  }

  ngOnInit() {
  }

  isAuth() {
    return this._authenticationService.isAuthenticated();
  }

  onLogout() {
    this._authenticationService.logout();
  }

}

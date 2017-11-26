import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  name: String;
  email: String;
  username: String;
  role: String;
  password: String;
  confirmPassword: String;
  msg: String;
  success: boolean;

  constructor() { }

  ngOnInit() {
    this.success = false;
  }

  private createAccount(): void {
    if (this.password !== this.confirmPassword) {
      this.msg = 'Passwords don\'t match!';
      this.success = false;
      return;
    }
  }

  closeAlert(): void {
    this.msg = null;
  }

}

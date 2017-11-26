import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user.model";

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

    if (this.email === '' || this.username === '' || this.password === '' || this.role === '') {
      this.msg = 'Enter required fields!';
      this.success = false;
      return;
    }
    const nameArr: String[] = this.name.split(' ');
    const user: User = <User> {
      name: this.name,
      email: this.email,
      username: this.username,
      role: this.role,
      password: this.password,
      firstname: nameArr[0],
      lastname: nameArr[1]
    };

  }

  closeAlert(): void {
    this.msg = null;
  }

}

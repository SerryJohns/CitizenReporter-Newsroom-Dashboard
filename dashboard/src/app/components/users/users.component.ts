import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Paginator } from '../../models/paginator.model';
import { PaginateService } from '../../services/pagination/paginate.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ UsersService, PaginateService ]
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser: User;

  limit: number;
  offset: number;
  totalCount: number;
  currentPage: number;
  pages: number [];
  paginator: Paginator;
  searchString: String;

  constructor(
    private usersService: UsersService,
    private paginateService: PaginateService
  ) { }

  ngOnInit() {
    this.limit = 10;
    this.offset = 0;
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = [];
    this.usersService.countUsers().then(
      (count) => {
        this.paginator = this.paginateService.paginateData(count, this.limit, this.offset);
        this.totalCount = count;
        this.currentPage = this.paginator.currentPage;
        this.pages = this.paginator.pages;
        this.usersService.getUsers(this.limit, this.offset)
        .subscribe(
          user => this.users.push(user),
          err => console.log(err)
        );
      },
      (err) => console.log(`Error: ${ err }`)
    );
  }

  clickUser(user: User): void {
    this.selectedUser = user;
  }

  loadMoreUsers(page) {
    const prevOffset: number = this.offset;
    this.offset = this.paginateService.getOffset(page, this.limit, this.currentPage);
    if (this.offset >= this.totalCount) {
      this.offset = prevOffset; // offset shouldn't be greater than the itemCount
    }
    this.loadUsers();
  }

}

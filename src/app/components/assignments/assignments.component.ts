import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { Paginator } from './../stories/paginator.model';
import { PaginateService } from './../../services/pagination/paginate.service';
import { GetAssignmentsService } from '../../services/assignments/get-assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: [ './assignments.component.css', './../stories/stories.component.css' ],
  providers: [ PaginateService, GetAssignmentsService ]
})
export class AssignmentsComponent implements OnInit {
  constructor(
    private paginateService: PaginateService,
    private assignmentsService: GetAssignmentsService
  ) { }

  title: String = 'Assignments';
  assignments: Assignment[] = [];

  limit: number;
  offset: number;
  totalCount: number;
  currentPage: number;
  pages: number [];
  paginator: Paginator;

  ngOnInit() {
    this.limit = 10;
    this.offset = 0;
    this.loadAssignments();
  }

  loadMoreAssignments(page: number): void {

  }

  loadAssignments(): void {
    this.assignments = [];
    this.assignmentsService.countAssignments().then(
      (count) => {
        this.paginator = this.paginateService.paginateData(count, this.limit, this.offset);
        this.totalCount = count;
        this.currentPage = this.paginator.currentPage;
        this.pages = this.paginator.pages;
        this.assignmentsService.getAssignments(this.limit, this.offset)
        .subscribe(
          story => this.assignments.push(story),
          err => console.log(err)
        );
      },
      (err) => console.log(`Error: ${ err }`)
    );
  }

}

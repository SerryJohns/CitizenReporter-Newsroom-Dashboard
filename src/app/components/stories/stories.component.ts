import { Component, OnInit } from '@angular/core';
import { GetStoriesService } from './../../services/stories/get-stories.service';
import { Story } from './story.model';
import { setName } from '../../services/stories/story-utils';
import { Paginator } from './paginator.model';
import { PaginateService } from '../../services/pagination/paginate.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
  providers: [ GetStoriesService, PaginateService ]
})
export class StoriesComponent implements OnInit {

  constructor(
    private storiesService: GetStoriesService,
    private paginateService: PaginateService) { }

  title = 'Stories';
  stories: Story[] = [];
  selectedStory: Story;

  limit: number;
  offset: number;
  totalPages: number;
  totalCount: number;
  currentPage: number;
  pages: number [];
  paginator: Paginator;

  ngOnInit() {
    this.limit = 4;
    this.offset = 0;
    this.loadStories();
  }

  loadStories(): void {
    // first gets the total count of the stories,
    // then queries the data basing on the limit and offest
    // paginates the result
    this.stories = [];
    this.storiesService.countStories().then(
      (count) => {
        this.paginator = this.paginateService.paginateData(count, this.limit, this.offset);
        this.totalCount = count;
        this.totalPages = this.paginator.totalPages;
        this.currentPage = this.paginator.currentPage;
        this.pages = this.paginator.pages;
        this.storiesService.getStories(this.limit, this.offset)
        .subscribe(
          story => this.stories.push(story),
          err => console.log(err)
        );
      },
      (err) => console.log(`Error: ${ err }`)
    );
  }

  clickStory(story: Story): void {
    this.selectedStory = story;
  }

  loadMoreStories(page) {
    const prevOffset: number = this.offset;
    switch (page) {
      case -1:
        this.offset = ((this.currentPage - 2) * this.limit);
        break;
      case 0:
        this.offset = ((this.currentPage) * this.limit);
        break;
      default:
        this.offset = ((page - 1) * this.limit);
        break;
    }
    if (!this.offset || this.offset < 0) {
      this.offset = 0; // avoid negative offsets
    } else if (this.offset >= this.totalCount) {
      this.offset = prevOffset; // offset shouldn't be greater than the itemCount
    }
    this.loadStories();
  }
}

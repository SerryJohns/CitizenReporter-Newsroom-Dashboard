import { Component, OnInit } from '@angular/core';
import { GetStoriesService } from './../../services/stories/get-stories.service';
import { Story } from './story.model';
import { setName } from '../../services/stories/story-utils';
import { Paginator } from './paginator.model';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
  providers: [ GetStoriesService ]
})
export class StoriesComponent implements OnInit {

  constructor(private storiesService: GetStoriesService ) { }
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
    this.limit = 1;
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
        this.paginator = this.paginateData(count, this.limit, this.offset);
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
      this.offset = 0;
    } else if (this.offset >= this.totalCount) {
      this.offset = prevOffset;
    }
    this.loadStories();
  }

  paginateData(totalCount: number, limit: number, offset: number): Paginator {
    const pages: number[] = []; // stores the page numbers of the results
    const totalPages: number = Math.ceil(totalCount / limit);
    const currentPage = this.findPage(totalPages, limit, offset);
    if (currentPage < 1) {
      return;
    }
    // display all pages if the total pages are less or equal to 10
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // adjust pagination numbers for large pages
      for (let startPage = (currentPage - 4),
        i = startPage > 0 ? startPage : 1,
        tempEnd = currentPage + 5,
        endPage = tempEnd <= totalPages ? tempEnd : totalPages;
        i <= endPage; i++) {
        pages.push(i);
      }
    }
    return <Paginator>{
      totalPages: totalPages,
      currentPage: currentPage,
      pages: pages
    };
  }

  findPage(pages: number, limit: number, offset: number): number {
    for (let i = 1; i <= pages; i++) {
      if (offset < (limit * i)) {
        return i;
      }
    }
    return;
  }
}

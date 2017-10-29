import { Component, OnInit } from '@angular/core';
import { GetStoriesService } from './../../services/stories/get-stories.service';
import { Story } from './story.model';
import { setName } from '../../services/stories/story-utils';

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

  nextOffset: number;
  prevOffset: number;
  limit: number;
  offset: number;
  totalPages: number;
  totalCount: number;
  currentPage: number;
  pages: number [];

  ngOnInit() {
    this.limit = 2;
    this.offset = 0;
    this.loadStories();
  }

  loadStories(): void {
    this.stories = [];
    this.storiesService.countStories().then(
      (count) => {
        this.totalCount = count;
        this.paginateData(count, this.limit, this.offset);
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
    switch (page) {
      case -1:
        this.offset = this.prevOffset;
        break;
      case 0:
        this.offset = this.nextOffset;
        break;
      default:
        const myOffset = ((page - 1) * this.limit);
        this.offset = myOffset > 1 ? myOffset : 0;
        break;
    }
    console.log(this.offset);
    this.loadStories();
  }

  paginateData(totalCount: number, limit: number, offset: number): void {
    let newStart: number;
    let nextStart: number;
    let prevStart: number;
    const totalPages: number = Math.ceil(totalCount / limit);
    const currentPage = this.findPage(totalPages, limit, offset);
    if (currentPage < 1) {
      return;
    }

    if (currentPage < totalPages) {
      newStart = (currentPage * limit) + 1;
      nextStart = newStart <= totalCount ? newStart : totalCount;
    }

    if (currentPage > 1) {
      newStart = offset - limit;
      prevStart = newStart > 1 ? newStart : 0;
    }

    this.pages = [];
    for (let i = 1; i <= totalPages; i++) {
      this.pages.push(i);
    }
    this.nextOffset = nextStart - 1;
    this.prevOffset = prevStart - 1;
    this.totalPages = totalPages;
    this.totalCount = totalCount;
    this.currentPage = currentPage;
    console.log(nextStart, prevStart, totalPages, totalCount, currentPage);
  }

  findPage(pages: number, limit: number, value: number): number {
    for (let i = 1; i <= pages; i++) {
      if (value <= (limit * i)) {
        return i;
      }
    }
    return;
  }
}

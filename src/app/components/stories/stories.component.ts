import { Component, OnInit } from '@angular/core';
import { GetStoriesService } from './../../services/stories/get-stories.service';
import { Story, StoryMedia } from './../../models/story.model';
import { setName } from '../../services/stories/story-utils';
import { Paginator } from './../../models/paginator.model';
import { PaginateService } from '../../services/pagination/paginate.service';
import { StoryMediaService } from '../../services/stories/story-media.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
  providers: [ GetStoriesService, PaginateService, StoryMediaService ]
})
export class StoriesComponent implements OnInit {
  constructor(
    private storiesService: GetStoriesService,
    private paginateService: PaginateService,
    private storyMediaService: StoryMediaService
  ) { }

  title = 'Stories';
  stories: Story[] = [];
  selectedStory: Story;
  mediaFiles: StoryMedia = new StoryMedia();

  limit: number;
  offset: number;
  totalCount: number;
  currentPage: number;
  pages: number [];
  paginator: Paginator;

  ngOnInit() {
    // show 10 stories per page
    this.limit = 10;
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
    // fetches the story media files from the parse server
    const result: StoryMedia = <StoryMedia>({ image: [], audio: [], video: [] });
    this.selectedStory = story;
    this.storyMediaService.getMediaFiles(story.id).subscribe(
      (url) => {
        const ext = url.substr(url.lastIndexOf('.') + 1);
        switch (ext) {
          case 'jpg':
            result.image.push(url);
            break;
          case 'wav':
            result.audio.push(url);
            break;
          case 'mp4':
            result.video.push(url);
            break;
        }
      },
      (err) => console.log(err),
      () => this.mediaFiles = result
    );
  }

  loadMoreStories(page) {
    const prevOffset: number = this.offset;
    this.offset = this.paginateService.getOffset(page, this.limit, this.currentPage);
    if (this.offset >= this.totalCount) {
      this.offset = prevOffset; // offset shouldn't be greater than the itemCount
    }
    this.loadStories();
  }

}

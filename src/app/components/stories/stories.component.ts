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
  title = 'Assignments';
  stories: Story[] = [];
  selectedStory: Story;

  ngOnInit() {
    this.loadStories();
  }

  loadStories(): void {
    this.storiesService.getStories()
    .subscribe(
      story => {
        this.stories.push(story);
      },
      err => console.log(err),
      () => console.log('complete')
    );
    console.log(this.stories);
  }

  clickStory(story: Story): void {
    this.selectedStory = story;
  }

}

import { Component, OnInit } from '@angular/core';
import { GetStoriesService } from './../../services/stories/get-stories.service';
import { Story } from './story.model';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
  providers: [ GetStoriesService ]
})
export class StoriesComponent implements OnInit {

  constructor(private storiesService: GetStoriesService ) { }
  stories: Story[];

  ngOnInit() {
    this.loadStories();
  }

  loadStories(): void {
    this.stories = this.storiesService.getStories();
    console.log(this.stories);
  }

}

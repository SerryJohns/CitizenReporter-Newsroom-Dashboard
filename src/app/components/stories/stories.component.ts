import { Component, OnInit } from '@angular/core';
import { GetStoriesService } from './../../services/stories/get-stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
  providers: [ GetStoriesService ]
})
export class StoriesComponent implements OnInit {

  constructor(private storiesService: GetStoriesService ) { }

  ngOnInit() {
    this.storiesService.getStories();
  }

  loadStories(): void {
    this.storiesService.getStories();
  }

}

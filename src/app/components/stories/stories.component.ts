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
    // this.storiesService.getStories().then(function(story){
    //   console.log(story);
    // });
    // this.storiesService.getStories().subscribe(
    //   x => console.log(x),
    //   e => console.log(e),
    //   () => console.log('complete')
    // );

    this.storiesService.getStories()
    .forEach(v => console.log(v))
    .then(() => console.log('complete'))
    .catch(e => console.log(e));
  }

}
